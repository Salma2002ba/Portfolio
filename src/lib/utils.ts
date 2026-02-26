import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Base path for static export (e.g. GitHub Pages: /Portfolio). Empty when served at root. */
const basePath = typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_BASE_PATH ?? '') : ''

/**
 * Public URL for assets in the public folder.
 * Use for img src, link href, PDF file, etc. so they work with basePath (e.g. GitHub Pages).
 */
export function publicUrl(path: string): string {
  if (!path || path.startsWith('http')) return path
  return basePath ? `${basePath}${path.startsWith('/') ? path : `/${path}`}` : path
}
