import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

import { Projects } from '~/app/(main)/projects/Projects'
import alipaySponsor from '~/assets/sponsors/alipay.jpg'
import wechatSponsor from '~/assets/sponsors/wechat.jpg'
import { SocialLink } from '~/components/links/SocialLink'
import { Container } from '~/components/ui/Container'

const title = '我的赞助'
const description = '如果大家喜欢我的项目或是开源项目对你有所帮助，可以的话就请我喝杯咖啡吧！'
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
} satisfies Metadata

const sponsorsImages = {
    'Alipay': alipaySponsor,
    'Wechat': wechatSponsor,
}

export default function SponsorsPage() {
  return (
    <Container>
      <div className="mt-16 sm:mt-20">
        <p>
          <Balancer>
            我是 Talljack，前端开发工程师，探求独立开发者中，热爱开源，代码之外也在学习其他技能。
            如果大家喜欢我的项目或是开源项目对你有所帮助，可以的话就请我喝杯咖啡吧!
          </Balancer>
        </p>
      <div
        className="mt-6 flex gap-6"
      >
        <SocialLink
          href="https://yugangcao.com/twitter"
          aria-label="我的推特"
          platform="twitter"
        />
        <SocialLink
          href="https://yugangcao.com/youtube"
          aria-label="我的 YouTube"
          platform="youtube"
        />
        <SocialLink
          href="https://yugangcao.com/bilibili"
          aria-label="我的 Bilibili"
          platform="bilibili"
        />
        <SocialLink
          href="https://yugangcao.com/github"
          aria-label="我的 GitHub"
          platform="github"
        />
        <SocialLink
          href="https://yugangcao.com/tg"
          aria-label="我的 Telegram"
          platform="telegram"
        />
        <SocialLink href="/feed.xml" platform="rss" aria-label="RSS 订阅" />
        <SocialLink
          href="mailto:yugang.cao12@gmail.com"
          aria-label="我的邮箱"
          platform="mail"
        />
      </div>
      </div>
      <div className="mt-16 sm:mt-20">
        <Projects />
      </div>
      <div className='flex center items-end gap-4 mt-16 sm:mt-20'>
        { Object.keys(sponsorsImages).map(sponsorKey => {
          return (
            <div key={sponsorKey} className='flex flex-wrap w-[300px] justify-center'>
                <Image
                    width={300}
                    height={450}
                    src={sponsorsImages[sponsorKey as keyof typeof sponsorsImages]}
                    alt={sponsorKey}
                    priority
                    fetchPriority="high"
                    unoptimized
                    className="pointer-events-none select-none"
                />
                <span className='bold mt-4'>{sponsorKey}</span>
            </div>
        )
        }) }
        <a href="https://www.buymeacoffee.com/Talljack">
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=Talljack&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
        </a>
      </div>
    </Container>
  )
}
