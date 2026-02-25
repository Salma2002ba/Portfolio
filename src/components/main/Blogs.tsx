'use client'

import { motion } from 'framer-motion'
import { FaBook, FaExternalLinkAlt, FaPen, FaToolbox } from 'react-icons/fa'
import { profile } from '@/data/profile'

const resourceTypeIcons = {
  article: FaBook,
  tool: FaToolbox,
  repo: FaExternalLinkAlt,
}

export function BlogsSection() {
  const notes = profile.engineeringNotes ?? []
  const resources = profile.resources ?? []

  return (
    <section id="blogs" className="relative w-full py-14 bg-background overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-32 right-1/4 w-48 h-48 bg-primary/[0.05] rounded-full blur-[95px]" />
        <div className="absolute bottom-40 left-16 w-40 h-40 bg-accent/[0.05] rounded-full blur-[80px]" />
        <div className="absolute top-1/2 right-10 w-32 h-32 bg-secondary/[0.04] rounded-3xl blur-[70px] -rotate-6" />
        <div className="absolute inset-0 bg-grid-section" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-2">
            Blogs & veille
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Notes d’ingénierie et ressources utiles — DevOps, DevSecOps, Cloud.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* 1) Notes d'ingénierie */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            aria-labelledby="notes-heading"
          >
            <h3
              id="notes-heading"
              className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FaPen className="h-4 w-4" />
              </span>
              Notes d’ingénierie
            </h3>
            <ul className="space-y-3">
              {notes.length === 0 ? (
                <li className="text-sm text-muted-foreground">Aucune note pour l’instant.</li>
              ) : (
                notes.map((note, i) => (
                  <li key={i}>
                    <a
                      href={note.href ?? '#'}
                      target={note.href ? '_blank' : undefined}
                      rel={note.href ? 'noopener noreferrer' : undefined}
                      className="block rounded-xl border border-border bg-card/60 hover:border-primary/30 hover:bg-card/80 p-4 transition-colors"
                    >
                      <div className="flex flex-wrap items-center gap-2 gap-y-1">
                        <span className="font-medium text-foreground">{note.title}</span>
                        <span className="text-xs text-muted-foreground">{note.date}</span>
                      </div>
                      {note.excerpt && (
                        <p className="mt-1 text-sm text-muted-foreground">{note.excerpt}</p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-0.5 rounded-md text-xs bg-primary/10 text-primary border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </a>
                  </li>
                ))
              )}
            </ul>
          </motion.section>

          {/* 2) Veille & ressources */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            aria-labelledby="resources-heading"
          >
            <h3
              id="resources-heading"
              className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <FaExternalLinkAlt className="h-4 w-4" />
              </span>
              Veille & ressources
            </h3>
            <ul className="space-y-3">
              {resources.length === 0 ? (
                <li className="text-sm text-muted-foreground">Aucune ressource pour l’instant.</li>
              ) : (
                resources.map((res, i) => {
                  const Icon = res.type ? resourceTypeIcons[res.type] : FaExternalLinkAlt
                  return (
                    <li key={i}>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-border bg-card/60 hover:border-accent/30 hover:bg-card/80 p-4 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-accent">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="font-medium text-foreground">{res.title}</span>
                            <p className="mt-0.5 text-sm text-muted-foreground italic">
                              {res.note}
                            </p>
                          </div>
                          <FaExternalLinkAlt className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        </div>
                      </a>
                    </li>
                  )
                })
              )}
            </ul>
          </motion.section>
        </div>
      </div>
    </section>
  )
}
