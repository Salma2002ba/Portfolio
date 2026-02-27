import { cn, slugify } from '@/lib/utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toContain('a')
    expect(cn('a', 'b')).toContain('b')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toContain('base')
    expect(cn('base', false && 'hidden', 'visible')).toContain('visible')
    expect(cn('base', false && 'hidden', 'visible')).not.toContain('hidden')
  })

  it('merges tailwind classes correctly', () => {
    const result = cn('p-2', 'p-4')
    expect(result).toBe('p-4')
  })
})

describe('slugify', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('strips non-alphanumeric characters', () => {
    expect(slugify('Test & Demo!')).toBe('test-demo')
  })

  it('collapses multiple hyphens and trims', () => {
    expect(slugify('  a   b  ')).toBe('a-b')
  })

  it('returns empty string for only special chars', () => {
    expect(slugify('!!!')).toBe('')
  })
})
