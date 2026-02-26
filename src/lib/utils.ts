import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Base path for static export (e.g. GitHub Pages: /Portfolio). Empty when served at root.
 * In the browser, fallback: detect from window.location when env is missing (e.g. old cache).
 */
function getBasePath(): string {
  if (typeof window === 'undefined') {
    return (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_BASE_PATH) || ''
  }
  const fromEnv = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_BASE_PATH : ''
  if (fromEnv) return fromEnv
  const pathname = window.location.pathname
  const firstSegment = pathname.match(/^\/([^/]+)/)?.[1]
  if (firstSegment && !['_next', 'api', 'blog', 'cloud-engineer', 'devops-engineer', 'analytics'].includes(firstSegment)) {
    return `/${firstSegment}`
  }
  return ''
}

/**
 * Public URL for assets in the public folder.
 * Use for img src, link href, PDF file, etc. so they work with basePath (e.g. GitHub Pages).
 */
export function publicUrl(path: string): string {
  if (!path || path.startsWith('http')) return path
  const base = getBasePath()
  const normalized = path.startsWith('/') ? path : `/${path}`
  return base ? `${base}${normalized}` : normalized
}
