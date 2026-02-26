import { MetadataRoute } from 'next'
import { profile } from '@/data/profile'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/admin/'],
    },
    sitemap: `${profile.siteUrl}/sitemap.xml`,
  }
}