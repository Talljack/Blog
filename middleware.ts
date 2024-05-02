import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { get } from '@vercel/edge-config'
import { type NextRequest, NextResponse } from 'next/server'

import { kvKeys } from '~/config/kv'
import { env } from '~/env.mjs'
import countries from '~/lib/countries.json'
import { getIP } from '~/lib/ip'
import { redis } from '~/lib/redis'

export const config = {
  matcher: ['/((?!_next|studio|.*\\..*).*)'],
}

async function beforeAuthMiddleware(req: NextRequest) {
  const { geo, nextUrl } = req

  const blockedIPs = await get<string[]>('blocked_ips')
  const ip = getIP(req)
  const isApi = nextUrl.pathname.startsWith('/api/')

  if (blockedIPs?.includes(ip)) {
    if (isApi) {
      return NextResponse.json(
        { error: 'You have been blocked.' },
        { status: 403 }
      )
    }

    nextUrl.pathname = '/blocked'
    return NextResponse.rewrite(nextUrl)
  }

  if (nextUrl.pathname === '/blocked') {
    nextUrl.pathname = '/'
    return NextResponse.redirect(nextUrl)
  }

  if (geo && !isApi && env.VERCEL_ENV === 'production') {
    const country = geo.country
    const city = geo.city

    const countryInfo = countries.find((x) => x.cca2 === country)
    if (countryInfo) {
      const flag = countryInfo.flag
      await redis.set(kvKeys.currentVisitor, { country, city, flag })
    }
  }

  return NextResponse.next()
}

const isPublicRoutes = createRouteMatcher([
    '/',
    '/api(.*)',
    '/blog(.*)',
    '/studio(.*)',
    '/confirm(.*)',
    '/projects',
    '/guestbook',
    '/newsletters(.*)',
    '/interview',
    '/about',
    '/rss',
    '/feed',
    '/ama',
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoutes(req)) {
    return beforeAuthMiddleware(req)
  }
})
