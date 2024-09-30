import { Ratelimit } from '@upstash/ratelimit'
import { eq } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { render } from '@react-email/components'
import { emailConfig } from '~/config/email'
import { db } from '~/db'
import { subscribers } from '~/db/schema'
import { currentUser } from '@clerk/nextjs/server'
import ConfirmSubscriptionEmail from '~/emails/ConfirmSubscription'
import { env } from '~/env.mjs'
import { url } from '~/lib'
import { resend } from '~/lib/mail'
import { redis } from '~/lib/redis'

const newsletterFormSchema = z.object({
  email: z.string().email().min(1),
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, '10 s'),
  analytics: true,
})

export async function POST(req: NextRequest) {
  if (env.NODE_ENV === 'production') {
    const { success } = await ratelimit.limit('subscribe_' + (req.ip ?? ''))
    if (!success)
      return NextResponse.error()
  }
  const user = await currentUser()
  try {
    const { data } = await req.json()
    const parsed = newsletterFormSchema.parse(data)

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parsed.email))
      return NextResponse.json({ status: 'error', message: 'Invalid email format' }, { status: 400 })

    const [subscriber] = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, parsed.email))

    if (subscriber) {
      if (subscriber.subscribedAt) {
        return NextResponse.json({ status: 'info', message: 'You are already subscribed' })
      }
      else {
        // 重新发送确认邮件
        const token = subscriber.token
        const confirmationLink = url(`confirm/${token}`).href
        await sendConfirmationEmail(parsed.email, user?.fullName ?? user?.firstName + ' ' + user?.lastName, confirmationLink, env.SITE_NOTIFICATION_EMAIL_TO as string)
        return NextResponse.json({ status: 'success', message: 'Confirmation email resent' })
      }
    }
    const token = crypto.randomUUID()
    const confirmationLink = url(`confirm/${token}`).href

    await db.insert(subscribers).values({
      email: parsed.email,
      token,
    })
    await sendConfirmationEmail(parsed.email, user?.fullName ?? user?.firstName + ' ' + user?.lastName, confirmationLink, env.SITE_NOTIFICATION_EMAIL_TO as string)

    return NextResponse.json({ status: 'success', message: 'Confirmation email sent' })
  }
  catch (error) {
    console.error('[Newsletter]', error)

    return NextResponse.error()
  }
}

async function sendConfirmationEmail(email: string, name: string, link: string, replyTo: string) {
  const emailHtml = render(ConfirmSubscriptionEmail({ link, recipientName: name }))

  await resend.emails.send({
    from: emailConfig.from,
    to: email,
    subject: 'Confirm your subscription to WebHub updates',
    html: await emailHtml,
    text: `Hello ${name},\n\nPlease confirm your subscription to WebHub updates by visiting this link: ${link}\n\nIf you didn't request this, you can safely ignore this email.`,
    replyTo,
    headers: {
      'List-Unsubscribe': `<${url('unsubscribe').href}>`,
    },
  })
}
