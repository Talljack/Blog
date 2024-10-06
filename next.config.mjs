import { get } from '@vercel/edge-config'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./env.mjs'))

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    remotePatterns: [
      {
        hostname: 'web-hub-seven.vercel.app',
      },
      {
        hostname: 'img.buymeacoffee.com',
      },
      {
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  async redirects() {
    try {
      return (await get('redirects')) ?? []
    } catch {
      return []
    }
  },
  experimental: {
    taint: true,
  },

  rewrites() {
    return [
      {
        source: '/feed',
        destination: '/feed.xml',
      },
      {
        source: '/rss',
        destination: '/feed.xml',
      },
      {
        source: '/rss.xml',
        destination: '/feed.xml',
      },
    ]
  }
}

export default nextConfig
