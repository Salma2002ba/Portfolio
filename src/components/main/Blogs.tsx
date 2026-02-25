'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaBook,
  FaCopy,
  FaExternalLinkAlt,
  FaPen,
  FaThumbtack,
  FaToolbox,
} from 'react-icons/fa'
import { profile } from '@/data/profile'
import type { EngineeringNoteItem, ResourceItem } from '@/data/profile'

const RESOURCE_TYPE_LABELS: Record<string, string> = {
  article: 'Article',
  tool: 'Outil',
  repo: 'Repo',
}

const resourceTypeIcons: Record<string, typeof FaBook> = {
  article: FaBook,
  tool: FaToolbox,
  repo: FaExternalLinkAlt,
}

const TAB_NOTES = 'notes'
const TAB_RESOURCES = 'resources'
type TabId = typeof TAB_NOTES | typeof TAB_RESOURCES

function getNoteTags(notes: EngineeringNoteItem[]): string[] {
  const set = new Set<string>()
  notes.forEach((n) => n.tags.forEach((t) => set.add(t)))
  return Array.from(set).sort()
}

function getResourceTypeTags(): string[] {
  return ['article', 'tool', 'repo']
}

function filterNotes(
  notes: EngineeringNoteItem[],
  query: string,
  selectedTags: Set<string>
): EngineeringNoteItem[] {
  const q = query.trim().toLowerCase()
  return notes
    .filter((note) => {
      const matchSearch =
        !q ||
        note.title.toLowerCase().includes(q) ||
        (note.excerpt ?? '').toLowerCase().includes(q) ||
        note.tags.some((t) => t.toLowerCase().includes(q))
      const matchTags =
        selectedTags.size === 0 || note.tags.some((t) => selectedTags.has(t))
      return matchSearch && matchTags
    })
    .sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1))
}

function filterResources(
  resources: ResourceItem[],
  query: string,
  selectedTags: Set<string>
): ResourceItem[] {
  const q = query.trim().toLowerCase()
  return resources
    .filter((res) => {
      const matchSearch =
        !q ||
        res.title.toLowerCase().includes(q) ||
        res.note.toLowerCase().includes(q) ||
        (res.type && res.type.toLowerCase().includes(q))
      const matchTags =
        selectedTags.size === 0 ||
        (res.type && selectedTags.has(res.type))
      return matchSearch && matchTags
    })
    .sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1))
}

function Chip({
  label,
  count,
  selected,
  onClick,
}: {
  label: string
  count: number
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium
        transition-all duration-200 ease-out
        ${
          selected
            ? 'bg-primary/15 text-primary border border-primary/30 shadow-sm'
            : 'bg-muted/60 text-muted-foreground border border-transparent hover:bg-muted hover:text-foreground'
        }
      `}
    >
      <span>{label}</span>
      <span className="text-xs opacity-80">({count})</span>
    </button>
  )
}

function NoteCard({
  note,
  index,
  isExpanded,
  onToggle,
}: {
  note: EngineeringNoteItem
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const link = note.href ?? '#'
  const handleCopy = () => {
    const url = note.href ? `${window.location.origin}${note.href}` : window.location.href
    navigator.clipboard.writeText(url)
  }

  return (
    <motion.article
      layout
      initial={false}
      className="blogs-card group relative rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 transition-all duration-300 ease-out hover:border-primary/25 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {note.pinned && (
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary" title="Épinglé">
                <FaThumbtack className="h-3 w-3" />
              </span>
            )}
            <h4 className="font-semibold text-foreground">{note.title}</h4>
            <span className="text-xs text-muted-foreground">{note.date}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-0.5 rounded-md text-xs bg-primary/10 text-primary border border-primary/15"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleCopy()
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
            title="Copier le lien"
          >
            <FaCopy className="h-3.5 w-3.5" />
          </button>
          {note.href && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-primary hover:bg-primary/10 transition-colors duration-200"
              title="Ouvrir"
            >
              <FaExternalLinkAlt className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && note.excerpt && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="mt-3 pt-3 border-t border-border/80 text-sm text-muted-foreground leading-relaxed">
              {note.excerpt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

function ResourceCard({
  res,
  index,
  isExpanded,
  onToggle,
}: {
  res: ResourceItem
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const Icon = res.type ? resourceTypeIcons[res.type] : FaExternalLinkAlt
  const typeLabel = res.type ? RESOURCE_TYPE_LABELS[res.type] ?? res.type : 'Lien'

  const handleCopy = () => {
    navigator.clipboard.writeText(res.url)
  }

  return (
    <motion.article
      layout
      initial={false}
      className="blogs-card group relative rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 transition-all duration-300 ease-out hover:border-accent/25 hover:bg-card/80 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5 cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {res.pinned && (
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 text-accent" title="Épinglé">
                  <FaThumbtack className="h-3 w-3" />
                </span>
              )}
              <h4 className="font-semibold text-foreground">{res.title}</h4>
              <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-md bg-muted/80">
                {typeLabel}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleCopy()
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
            title="Copier le lien"
          >
            <FaCopy className="h-3.5 w-3.5" />
          </button>
          <a
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 text-primary px-3 py-1.5 text-sm font-medium hover:bg-primary/20 transition-colors duration-200"
            title="Ouvrir dans un nouvel onglet"
          >
            <span className="hidden sm:inline">Ouvrir</span>
            <FaExternalLinkAlt className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="mt-3 pt-3 border-t border-border/80 text-sm text-muted-foreground leading-relaxed italic">
              {res.note}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export function BlogsSection() {
  const notes = profile.engineeringNotes ?? []
  const resources = profile.resources ?? []

  const [activeTab, setActiveTab] = useState<TabId>(TAB_NOTES)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const noteTags = useMemo(() => getNoteTags(notes), [notes])
  const resourceTags = getResourceTypeTags()

  const filteredNotes = useMemo(
    () => filterNotes(notes, searchQuery, selectedTags),
    [notes, searchQuery, selectedTags]
  )
  const filteredResources = useMemo(
    () => filterResources(resources, searchQuery, selectedTags),
    [resources, searchQuery, selectedTags]
  )

  const tags = activeTab === TAB_NOTES ? noteTags : resourceTags
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    if (activeTab === TAB_NOTES) {
      tags.forEach((t) => {
        counts[t] = notes.filter((n) => n.tags.includes(t)).length
      })
    } else {
      tags.forEach((t) => {
        counts[t] = resources.filter((r) => r.type === t).length
      })
    }
    return counts
  }, [activeTab, tags, notes, resources])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTags(new Set())
  }

  const hasActiveFilters = searchQuery.trim() !== '' || selectedTags.size > 0

  return (
    <section
      id="blogs"
      className="relative w-full py-16 sm:py-20 bg-background overflow-hidden"
      aria-labelledby="blogs-heading"
    >
      <div className="cyberpunk-diagonals absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-32 right-1/4 w-48 h-48 bg-primary/[0.05] rounded-full blur-[95px]" />
        <div className="absolute bottom-40 left-16 w-40 h-40 bg-accent/[0.05] rounded-full blur-[80px]" />
        <div className="absolute top-1/2 right-10 w-32 h-32 bg-secondary/[0.04] rounded-3xl blur-[70px] -rotate-6" />
        <div className="absolute inset-0 bg-grid-section" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            id="blogs-heading"
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-3"
          >
            Blogs & veille
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Sélection de ressources que j&apos;utilise en DevOps / DevSecOps / Supply chain.
          </p>
        </motion.header>

        {/* Tabs */}
        <motion.div
          className="flex rounded-xl bg-muted/40 p-1 border border-border mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            onClick={() => {
              setActiveTab(TAB_NOTES)
              setSelectedTags(new Set())
              setExpandedId(null)
            }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 ${
              activeTab === TAB_NOTES
                ? 'bg-card text-foreground shadow-sm border border-border'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <FaPen className="h-4 w-4" />
            Notes d&apos;ingénierie
            <span className="text-xs opacity-80">({notes.length})</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab(TAB_RESOURCES)
              setSelectedTags(new Set())
              setExpandedId(null)
            }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 ${
              activeTab === TAB_RESOURCES
                ? 'bg-card text-foreground shadow-sm border border-border'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <FaExternalLinkAlt className="h-4 w-4" />
            Veille & ressources
            <span className="text-xs opacity-80">({resources.length})</span>
          </button>
        </motion.div>

        {/* Search + chips */}
        <motion.div
          className="space-y-4 mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher…"
              className="w-full rounded-xl border border-border bg-card/60 py-3 pl-4 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-200"
              aria-label="Recherche"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={activeTab === TAB_RESOURCES ? RESOURCE_TYPE_LABELS[tag] ?? tag : tag}
                count={tagCounts[tag] ?? 0}
                selected={selectedTags.has(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors duration-200"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </motion.div>

        {/* List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <AnimatePresence mode="wait">
            {activeTab === TAB_NOTES ? (
              <motion.div
                key="notes"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {filteredNotes.length === 0 ? (
                  <p className="text-center text-muted-foreground py-12 text-sm">
                    Aucune note ne correspond aux filtres.
                  </p>
                ) : (
                  filteredNotes.map((note, i) => {
                    const itemId = `note-${note.title}-${note.date}`
                    return (
                      <NoteCard
                        key={itemId}
                        note={note}
                        index={i}
                        isExpanded={expandedId === itemId}
                        onToggle={() => setExpandedId((id) => (id === itemId ? null : itemId))}
                      />
                    )
                  })
                )}
              </motion.div>
            ) : (
              <motion.div
                key="resources"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {filteredResources.length === 0 ? (
                  <p className="text-center text-muted-foreground py-12 text-sm">
                    Aucune ressource ne correspond aux filtres.
                  </p>
                ) : (
                  filteredResources.map((res, i) => {
                    const itemId = `res-${res.url}`
                    return (
                      <ResourceCard
                        key={itemId}
                        res={res}
                        index={i}
                        isExpanded={expandedId === itemId}
                        onToggle={() => setExpandedId((id) => (id === itemId ? null : itemId))}
                      />
                    )
                  })
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
