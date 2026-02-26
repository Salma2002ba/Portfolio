'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaGithub, FaLinkedin, FaRocket } from 'react-icons/fa'
import { FC, useState, useEffect } from 'react'
import { NavbarButton } from '../ui/resizable-navbar'
import { TrackableContact } from '@/components/analytics/TrackableElement'
import { useAnalyticsContext } from '@/components/analytics/AnalyticsProvider'
import { profile } from '@/data/profile'
import { publicUrl } from '@/lib/utils'

const HeroContent: FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { trackClick } = useAnalyticsContext()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  function smoothScrollTo(element: HTMLElement, duration = 1000) {
    const start = window.scrollY
    const end = element.getBoundingClientRect().top + start
    const distance = end - start
    const startTime = performance.now()

    function scroll(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)

      window.scrollTo(0, start + distance * ease)

      if (elapsed < duration) {
        requestAnimationFrame(scroll)
      }
    }

    requestAnimationFrame(scroll)
  }

  const handleConnectClick = (e: React.MouseEvent<HTMLElement>) => {
    // Track the click
    // trackClick(e, 'hero-connect-button', 'Let\'s Connect')

    const contactSection = document.getElementById('contact')
    if (contactSection) {
      smoothScrollTo(contactSection, 1500)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative z-10 flex flex-col items-center justify-center text-center gap-6 px-4 sm:px-8 lg:px-16 w-full max-w-6xl mx-auto pt-16 sm:pt-20 lg:pt-24"
    >
      {/* Interactive Cursor Follower */}
      <div
        className="fixed pointer-events-none z-0 w-6 h-6 bg-primary/20 rounded-full blur-sm transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      />



      {/* Main Content Area — avatar bien grand + nom avec palette (bleu → rose) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6">
          {/* Avatar cercle parfait, visage centré, bordure gradient */}
          <div className="relative flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full p-[4px] bg-gradient-to-r from-primary via-accent to-primary shadow-lg ring-2 ring-primary/30 ring-offset-2 ring-offset-background [border-radius:9999px]">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-muted aspect-square [border-radius:9999px]">
              <Image
                src={publicUrl('/avatar.png')}
                alt=""
                width={192}
                height={192}
                className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
                priority
                sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
              />
            </div>
          </div>
          <h1
            title={profile.name}
            className="hero-name-glow text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          >
            {profile.name}
          </h1>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-bounce" aria-hidden />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent/30 rounded-full animate-pulse" aria-hidden />
        </div>

        {/* Role with Modern Design */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-card/40 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-2xl">
            <h2 title={profile.title} className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3">
              {profile.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center gap-4 mt-6 mb-10"
      >
        <NavbarButton
          
          variant="primary"
          className="group relative overflow-hidden bg-gradient-to-r from-primary via-accent to-secondary hover:from-accent hover:via-secondary hover:to-primary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={handleConnectClick}
        >
          <div className="flex items-center gap-3">
            <FaRocket className="w-5 h-5 group-hover:animate-bounce" />
            Échangeons
            <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
          </div>
          <div title="Échangeons – Aller à la section contact" className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </NavbarButton>

        <div className="flex items-center gap-3">
          <TrackableContact method="github">
            <NavbarButton
              title="Visiter mon profil GitHub"
              variant="secondary"
              className="group bg-card/60 backdrop-blur-sm border-primary/30 hover:border-primary/60 hover:bg-primary/10 px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              href={profile.links.github}
            >
              <FaGithub className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </NavbarButton>
          </TrackableContact>

          <TrackableContact method="linkedin" title="Visiter mon profil LinkedIn">
            <NavbarButton
              title="Visiter mon profil LinkedIn"
              variant="secondary"
              className="group bg-card/60 backdrop-blur-sm border-accent/30 hover:border-accent/60 hover:bg-accent/10 px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              href={profile.links.linkedin}
            >
              <FaLinkedin  title="Visiter mon profil LinkedIn" className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </NavbarButton>
          </TrackableContact>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        variants={itemVariants}
        className="mt-2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm font-medium">Défiler pour explorer</span>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HeroContent
