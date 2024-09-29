export const emailConfig = {
  from: 'Talljack <newsletter@yugangcao.com>',
  baseUrl:
    process.env.VERCEL_ENV === 'production'
      ? `https://yugangcao.com`
      : 'http://localhost:3000',
}
