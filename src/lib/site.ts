import { profile } from '@/data/profile'

/** Base URL of the site (for canonical, OG, sitemap). Use when building for GitHub Pages. */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || profile.siteUrl
}
