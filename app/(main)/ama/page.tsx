import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

import { RichLink } from '~/components/links/RichLink'
import { Container } from '~/components/ui/Container'

import AlipayQR from './alipay-qr.png'
import WechatQR from './wechat-qr.png'

const title = 'AMA 一对一咨询'
const description =
  'Talljack 提供一对一的咨询服务（Ask Me Anything）。我有前端开发、职场工作、英语学习/交流、内容创作等经验，可以为你解答相关的问题。'

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
  },
}

export default function AskMeAnythingPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Ask Me Anything / 一对一咨询
        </h1>
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>{description}</Balancer>
        </p>
      </header>

      <article className="prose dark:prose-invert">
        <h2>咨询内容</h2>
        <p>我可以为你解答以下相关的问题：</p>
        <ul>
          <li>
            <b>前端/全栈开发</b>
            ：工作难找，或是寻求职场建议？或是提升自己的工程水平？亦或是人生规划？
          </li>
          <li>
            <b>英语技能</b>：
            英语能力不足，想提高自己的英语水平？可以跟我学习英语
          </li>
        </ul>

        <h2>定价</h2>
        <p>我的一对一咨询的价格为：</p>
        <ul>
          <li>
            <strong>¥30 - 30分钟</strong>
          </li>
          <li>
            <strong>¥60 - 60分钟</strong>
          </li>
        </ul>

        <p className="flex justify-center items-center md:block md:justify-start">
          <span className="inline-flex flex-col items-center">
            <Image src={AlipayQR} alt="" className="w-44 dark:brightness-90" />
            <span className="mt-1 text-sm font-medium">支付宝二维码</span>
          </span>
          <span className="inline-flex flex-col items-center ml-4">
            <Image src={WechatQR} alt="" className="w-44 dark:brightness-90" />
            <span className="mt-1 text-sm font-medium">微信二维码</span>
          </span>
        </p>
        <p>
          一旦你完成支付，通过{' '}
          <RichLink
            href="https://cal.com/talljack/ask-me-anything"
            target="_blank"
          >
            这个链接
          </RichLink>
          来跟我预约一个合适你的时间。
        </p>

      </article>
    </Container>
  )
}
