export const seo = {
  title: 'Talljack | 全栈开发者',
  description:
    '我叫 Talljack，全栈开发者，致力于成为独立开发者，开发更优秀的软件',
  url: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://yugangcao.com'
      : 'http://localhost:3000'
  ),
} as const
