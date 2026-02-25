'use client'

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  NavbarLogo,
  Navbar as NavbarWrapper,
} from '@/components/ui/resizable-navbar'
import { ThemeToggle } from '@/hooks/use-toogle'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaBlog, FaBriefcase, FaCode, FaEnvelope, FaGraduationCap, FaProjectDiagram, FaUser } from 'react-icons/fa'
import { Button } from '../ui/button'
import { TrackableElement, TrackableContact } from '@/components/analytics/TrackableElement'
import { useAnalyticsContext } from '@/components/analytics/AnalyticsProvider'

/** Barre gradient sous le header — même animation que NavBody (width, y) */
function NavBarGradientBar({ visible }: { visible?: boolean }) {
  return (
    <motion.div
      className="mx-auto hidden w-full max-w-7xl justify-center self-start lg:flex"
      style={{ minWidth: '200px' }}
      animate={{
        width: visible ? '40%' : '100%',
        y: visible ? 20 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 50,
      }}
    >
      <div
        className="h-0.5 w-full rounded-full bg-gradient-to-r from-primary via-accent to-primary/80 shadow-sm"
        aria-hidden
      />
    </motion.div>
  )
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { trackClick } = useAnalyticsContext()

  const navItems = [
    { name: 'À propos', link: '#about', icon: <FaUser /> },
    { name: 'Formation', link: '#education', icon: <FaGraduationCap /> },
    { name: 'Expérience', link: '#experience', icon: <FaBriefcase /> },
    { name: 'Compétences', link: '#competences', icon: <FaCode /> },
    { name: 'Projets', link: '#projects', icon: <FaProjectDiagram /> },
    { name: 'Blog', link: '#blogs', icon: <FaBlog /> },
  ]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <NavbarWrapper className="flex flex-col items-center justify-between gap-4 px-4 py-2">
        <NavBody>
          <NavbarLogo isScrolled={isScrolled} />

          <NavItems items={navItems} isScrolled={isScrolled} />

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <TrackableContact method="navbar-contact">
              <Button
                title="Me contacter"
                variant="default"
                className="rounded-full z-50"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <FaEnvelope />
              </Button>
            </TrackableContact>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo isScrolled={isScrolled} />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item) => (
              <TrackableElement 
                key={`mobile-link-${item.name}`}
                elementId={`mobile-nav-${item.name.toLowerCase()}`}
                elementText={`Nav mobile : ${item.name}`}
              >
                <Link
                  href={item.link}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    document
                      .getElementById(item.link.slice(1))
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="relative text-muted-foreground hover:text-primary flex gap-2 items-center"
                >
                  {item.icon} <span>{item.name}</span>
                </Link>
              </TrackableElement>
            ))}
            <div className="flex w-full flex-col gap-4">
              <ThemeToggle />
              <TrackableContact method="mobile-navbar-contact">
                <Button
                  title="Me contacter"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  variant="default"
                  className="w-full rounded-full"
                >
                  <FaEnvelope />
                </Button>
              </TrackableContact>
            </div>
          </MobileNavMenu>
        </MobileNav>
        <NavBarGradientBar />
      </NavbarWrapper>
    </div>
  )
}
