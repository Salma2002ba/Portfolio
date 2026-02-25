'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FaCloud,
  FaDownload,
  FaGraduationCap,
  FaIndustry,
  FaRocket,
  FaSearch,
} from 'react-icons/fa'
import { profile } from '@/data/profile'

const aboutPoints = [
  {
    icon: FaGraduationCap,
    text: 'École d’ingénieur informatique - Polytech Marseille',
  },
  {
    icon: FaIndustry,
    text: 'Alternance CEA Cadarache - environnement industriel, données & infrastructure',
  },
  {
    icon: FaCloud,
    text: 'Spécialisation Cloud, DevOps, CI/CD, IaC, conteneurisation',
  },
  {
    icon: FaSearch,
    text: 'Stage de recherche DevSecOps - Université de Montréal',
  },
  {
    icon: FaRocket,
    text: 'Objectif : Ingénieure DevOps/Cloud en sortie d’études',
  },
]

function highlightKeywords(str: string) {
  const keywords = ['Cloud', 'DevOps', 'CI/CD', 'IaC', 'DevSecOps']
  let result = str
  keywords.forEach((kw) => {
    result = result.replace(
      new RegExp(`(${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
      '<span class="text-primary font-semibold">$1</span>'
    )
  })
  return result
}

export default function About() {
  return (
    <section
      id="about"
      className="relative flex flex-col items-center justify-center gap-8 py-14 px-4 sm:px-8 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 right-10 w-40 h-40 bg-primary/[0.06] rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-32 left-1/4 w-32 h-32 bg-accent/[0.05] rounded-full blur-[70px] float-animation" />
        <div className="absolute top-1/2 right-16 w-28 h-28 bg-secondary/[0.04] rounded-3xl blur-[60px] -rotate-12 animate-pulse" />
        <div className="absolute top-24 left-1/3 w-36 h-36 bg-accent/[0.04] rounded-full blur-[90px] float-animation" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/[0.05] rounded-lg blur-[50px] rotate-45 animate-bounce" />
        <div className="absolute inset-0 bg-grid-section" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl relative z-10"
      >
        <h2
          id="about-heading"
          className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-6"
        >
          À propos
        </h2>

        <ul className="space-y-1 text-left" aria-label="Parcours">
          {aboutPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3 py-2.5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <point.icon className="h-4 w-4" />
              </span>
              <span
                className="text-base text-muted-foreground leading-snug"
                dangerouslySetInnerHTML={{
                  __html: highlightKeywords(point.text),
                }}
              />
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href={profile.resume.filePath}
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-300"
          >
            <FaDownload className="w-4 h-4" />
            {profile.resume.downloadLabel}
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
