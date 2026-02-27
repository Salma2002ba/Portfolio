import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

// Dev only (skip in GitHub Pages build et lors du build Docker / CI)
if (
  process.env.GITHUB_PAGES !== 'true' &&
  process.env.DOCKER_BUILD !== '1'
) {
  setupDevPlatform().catch(console.error)
}

import type { NextConfig } from 'next'

const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const basePath = process.env.BASE_PATH ?? ''

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath || '',
    /** Full site URL for GitHub Pages (e.g. https://user.github.io/Portfolio). Set in workflow. */
    NEXT_PUBLIC_SITE_URL: process.env.SITE_URL || '',
  },
  ...(isGitHubPages && {
    output: 'export',
    basePath: basePath || undefined,
    assetPrefix: basePath ? `${basePath}/` : undefined,
    images: { unoptimized: true },
  }),
  // Standalone output for Docker/production (réduit la taille de l'image)
  ...(!isGitHubPages && { output: 'standalone' }),
  webpack: (config) => {
    return config
  },
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  trailingSlash: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ]
  },
  eslint: {
    // ⚠️ This makes build succeed even if lint errors exist
    ignoreDuringBuilds: true,
  },
   typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

export default nextConfig
