'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaGraduationCap } from 'react-icons/fa'
import { profile } from '@/data/profile'
import { publicUrl } from '@/lib/utils'
import { useState } from 'react'
import { Timeline as TimelineComponent } from '@/components/ui/timeline'

function EducationElement({ item }: { item: (typeof profile.education)[number] }) {
  const [logoError, setLogoError] = useState(false)
  const showLogo = item.logoUrl && !logoError

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg bg-muted/80 border border-border flex items-center justify-center overflow-hidden p-2">
          {showLogo ? (
            <Image
              key={item.logoUrl}
              src={publicUrl(item.logoUrl!)}
              alt=""
              width={112}
              height={112}
              className="object-contain w-full h-full"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="flex items-center justify-center text-primary/80" aria-hidden>
              <FaGraduationCap className="w-9 h-9 sm:w-10 sm:h-10" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{item.degree}</h3>
            {item.inProgress && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary border border-secondary/40">
                en cours
              </span>
            )}
          </div>
          {item.field && (
            <p className="text-sm text-muted-foreground">{item.field}</p>
          )}
          {item.school && (
            <p className="text-sm text-muted-foreground font-medium">{item.school}</p>
          )}
          <p className="text-sm text-muted-foreground">{item.location} • {item.date}</p>
        </div>
      </div>

      {item.skills && item.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="inline-block px-2 py-0.5 rounded-md text-xs bg-muted/80 text-muted-foreground border border-border"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Education() {
  const timelineContent = profile.education.map((item) => ({
    title: item.date,
    content: <EducationElement key={item.id} item={item} />,
  }))

  return (
    <section
      id="education"
      className="relative py-14 text-foreground overflow-hidden"
      aria-labelledby="education-heading"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-16 right-1/4 w-52 h-52 bg-primary/[0.05] rounded-full blur-[100px]" />
        <div className="absolute bottom-32 left-10 w-40 h-40 bg-accent/[0.05] rounded-full blur-[80px]" />
        <div className="absolute top-1/2 right-10 w-28 h-28 bg-secondary/[0.04] rounded-3xl blur-[70px] -rotate-12" />
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
          <h2
            id="education-heading"
            className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-2"
          >
            Formation
          </h2>
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
