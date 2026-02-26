'use client'

import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import Image from 'next/image'
import { Timeline as TimelineComponent } from '@/components/ui/timeline'
import { FaCloud, FaDatabase, FaFlask, FaShieldAlt } from 'react-icons/fa'
import { profile } from '@/data/profile'
import { publicUrl } from '@/lib/utils'

export interface TimelineItem {
  id: number
  type: 'work' | 'project'
  title: string
  company: string
  location: string
  date: string
  logoUrl?: string
  imageURL: string
  description: string
  achievements: string[]
  tags?: string[]
  domain?: 'database' | 'security' | 'cloud' | 'research'
}

const domainIcons = {
  database: FaDatabase,
  security: FaShieldAlt,
  cloud: FaCloud,
  research: FaFlask,
}

export const timelineData: TimelineItem[] = profile.experiences.map((exp) => ({
  id: exp.id,
  type: exp.type,
  title: exp.title,
  company: exp.company,
  location: exp.location,
  date: exp.date,
  logoUrl: exp.logoUrl,
  imageURL: exp.imageURL,
  description: exp.description,
  achievements: exp.achievements,
  tags: exp.tags,
  domain: exp.domain,
}))

export const TimelineElement: FC<{ item: TimelineItem; index: number }> = ({ item, index }) => {
  const [logoError, setLogoError] = useState(false)
  const logoSrc = item.logoUrl && !logoError ? item.logoUrl : item.imageURL
  const DomainIcon = item.domain ? domainIcons[item.domain] : null

  return (
    <div className="space-y-4" key={index}>
      <div className="flex items-center gap-3 sm:gap-4">
        {item.type === 'work' && (
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg bg-muted/80 border border-border flex items-center justify-center overflow-hidden p-2">
            <Image
              key={logoSrc}
              src={publicUrl(logoSrc)}
              alt=""
              width={112}
              height={112}
              className="object-contain w-full h-full"
              onError={() => setLogoError(true)}
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 title={item.title} className="text-lg font-semibold text-foreground">{item.title}</h3>
            {DomainIcon && (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-primary/80" title={item.domain} aria-hidden>
                <DomainIcon className="h-4 w-4" />
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {item.company} • {item.location}
          </p>
          <p className="text-sm text-muted-foreground">{item.date}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{item.description}</p>

      <ul className="list-disc pl-5 space-y-1 text-sm text-foreground">
        {item.achievements.map((ach) => (
          <li key={ach}>{ach}</li>
        ))}
      </ul>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-0.5 rounded-md text-xs bg-muted/80 text-muted-foreground border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {item.type === 'project' && (
        <div className="w-full mt-4">
          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-md bg-background">
            <Image
              src={publicUrl(item.imageURL)}
              alt={`${item.title} Architecture`}
              className="object-contain"
              loading="lazy"
              fill
            />
          </div>
        </div>
      )}
    </div>
  )
}

const Timeline: FC = () => {
  const timelineContent = timelineData.map((item) => ({
    title: item.date,
    content: <TimelineElement key={item.id} item={item} index={item.id} />,
  }))

  return (
    <section id="experience" className="relative py-14 text-foreground transition-colors overflow-hidden">
      {/* Background — blobs décoratifs, cohérents avec le reste du site */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-24 left-1/4 w-44 h-44 bg-accent/[0.05] rounded-full blur-[90px]" />
        <div className="absolute bottom-1/4 right-20 w-56 h-56 bg-primary/[0.05] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-10 w-36 h-36 bg-secondary/[0.05] rounded-3xl blur-[75px] rotate-12" />
        <div className="absolute inset-0 bg-grid-section" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 title="Expériences" className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-2">
            Expériences
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expérience industrielle, recherche DevSecOps et projets Cloud/DevOps à impact.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full"
        >
          <TimelineComponent data={timelineContent} />
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline
