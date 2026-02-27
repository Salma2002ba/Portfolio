import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>Label</Badge>)
    expect(screen.getByText('Label')).toBeInTheDocument()
  })

  it('applies variant via class', () => {
    const { container } = render(<Badge variant="destructive">Error</Badge>)
    const badge = container.querySelector('[data-slot="badge"]')
    expect(badge).toHaveClass('bg-destructive')
  })

  it('renders as span by default', () => {
    render(<Badge>Test</Badge>)
    const el = screen.getByText('Test')
    expect(el.tagName).toBe('SPAN')
  })
})
