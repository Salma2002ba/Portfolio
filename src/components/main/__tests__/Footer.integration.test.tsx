import { render, screen } from '@testing-library/react'
import Footer from '@/components/main/Footer'
import { profile } from '@/data/profile'

describe('Footer (integration)', () => {
  it('renders section with copyright and social links', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByText(new RegExp(profile.name))).toBeInTheDocument()
  })

  it('GitHub link points to profile url', () => {
    render(<Footer />)
    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toHaveAttribute('href', profile.links.github)
    expect(githubLink).toHaveAttribute('target', '_blank')
  })

  it('LinkedIn link points to profile url', () => {
    render(<Footer />)
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedinLink).toHaveAttribute('href', profile.links.linkedin)
  })
})
