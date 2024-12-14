import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        destination: '/home',
        permanent: true,
        source: '/',
      },
    ]
  },
  async rewrites() {
    return {
      afterFiles: [],
      beforeFiles: [],
      fallback: [
        {
          destination: '/not-found',
          source: '/:path*',
        },
      ],
    }
  },
}

export default nextConfig
