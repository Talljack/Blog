export const emailConfig = {
  from: 'yugang.cao12@gmail.com',
  baseUrl:
    process.env.VERCEL_ENV === 'production'
      ? `https://yugangcao.com`
      : 'http://localhost:3000',
}
