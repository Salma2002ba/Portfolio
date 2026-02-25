'use client'

import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { profile } from '@/data/profile'

const Footer = () => (
  <footer className="relative w-full px-4 py-8 mt-12 bg-background border-t border-border overflow-hidden">
    {/* Motifs décoratifs en bas de page */}
    <div className="cyberpunk-diagonals absolute inset-0 -z-10 pointer-events-none">
      <div className="absolute bottom-0 left-0 w-64 h-48 bg-primary/[0.05] rounded-full blur-[100px] float-animation" />
      <div className="absolute bottom-4 right-1/4 w-40 h-40 bg-accent/[0.05] rounded-full blur-[80px] animate-pulse" />
      <div className="absolute bottom-8 right-0 w-32 h-32 bg-secondary/[0.04] rounded-3xl blur-[60px] rotate-12" />
      {/* Cyberpunk : blobs animés en dark */}
      <div className="absolute bottom-12 left-1/4 w-36 h-36 bg-primary/15 rounded-full blur-[80px] opacity-0 dark:opacity-100 cyberpunk-glow-breath" aria-hidden />
      <div className="absolute top-4 right-20 w-24 h-24 bg-accent/15 rounded-full blur-[60px] opacity-0 dark:opacity-100 cyberpunk-float-slow" aria-hidden />
      <div className="absolute bottom-16 right-1/3 w-20 h-20 bg-secondary/20 rounded-lg blur-[50px] opacity-0 dark:opacity-100 cyberpunk-drift" aria-hidden />
      <div className="absolute inset-0 opacity-60 bg-grid-footer" aria-hidden />
    </div>
    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/60 via-accent/60 to-secondary/60" aria-hidden />
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center relative z-10">
      <span className="text-xs text-muted-foreground/80">
        © 2026 {profile.name} — All rights reserved
      </span>
      <span className="hidden sm:inline text-muted-foreground/50">·</span>
      <div className="flex items-center gap-3">
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground/60 hover:text-primary transition-colors"
          aria-label="GitHub"
        >
          <FaGithub className="w-4 h-4" />
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground/60 hover:text-primary transition-colors"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-4 h-4" />
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
