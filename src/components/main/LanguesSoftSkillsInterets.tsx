'use client'

import { motion } from 'framer-motion'
import { FaGlobe, FaHeart, FaUsers } from 'react-icons/fa'
import { profile } from '@/data/profile'

const languages = profile.languages ?? [
  { language: 'Français', level: 'courant' },
  { language: 'Anglais', level: 'professionnel' },
  { language: 'Arabe', level: 'Langue maternelle' },
]
const softSkills = profile.softSkills ?? [
  'Pilotage de projet',
  'Autonomie',
  'Analyse systémique',
  'Résolution de problèmes complexes',
  'Adaptabilité',
  'Rigueur',  
  'Communication technique',
]
const interests = profile.interests ?? [
  'Running',
  'Cyclisme',
  'Crochet',
  'Danse',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export default function LanguesSoftSkillsInterets() {
  return (
    <section
      id="langues-soft-skills-interets"
      className="relative flex flex-col items-center justify-center gap-8 py-14 px-4 sm:px-8 overflow-hidden"
      aria-labelledby="langues-soft-heading"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-16 right-1/4 w-40 h-40 bg-primary/[0.06] rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-32 left-10 w-32 h-32 bg-accent/[0.05] rounded-full blur-[70px] float-animation" />
        <div className="absolute inset-0 bg-grid-section" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl relative z-10"
      >
        <h2
          id="langues-soft-heading"
          className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-2"
        >
          Au-delà du code
        </h2>
        <p className="text-lg text-muted-foreground font-medium">
          Langues, soft skills et centres d&apos;intérêt.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-5xl relative z-10"
      >
        <div className="beyond-code-card grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 overflow-hidden bg-card/50 backdrop-blur-sm">
          {/* Colonne Langues */}
          <motion.div
            className="beyond-code-column group relative flex flex-col p-8 bg-card/60 backdrop-blur-sm border-b md:border-b-0 md:border-r border-border hover:bg-card/75"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center gap-4 mb-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary group-hover:bg-primary/20 transition-colors duration-400 ease-out">
                <FaGlobe className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-foreground">Langues</h3>
            </div>
            <motion.ul
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {languages.map((item, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="beyond-code-item px-5 py-3.5 bg-muted/40 border border-border hover:border-primary/25 hover:bg-primary/5 text-foreground/90 hover:text-foreground"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium">{item.language}</span>
                  <span className="text-muted-foreground"> — </span>
                  <span className="text-muted-foreground">{item.level}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Colonne Soft Skills */}
          <motion.div
            className="beyond-code-column group relative flex flex-col p-8 bg-card/60 backdrop-blur-sm border-b md:border-b-0 md:border-r border-border hover:bg-card/75"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out bg-gradient-to-t from-accent/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center gap-4 mb-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent group-hover:bg-accent/20 transition-colors duration-400 ease-out">
                <FaUsers className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-foreground">Soft Skills</h3>
            </div>
            <motion.ul
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {softSkills.map((skill, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="beyond-code-item px-5 py-3.5 bg-muted/40 border border-border hover:border-accent/25 hover:bg-accent/5 text-foreground/90 hover:text-foreground font-medium"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {skill}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Colonne Centres d'intérêt */}
          <motion.div
            className="beyond-code-column group relative flex flex-col p-8 bg-card/60 backdrop-blur-sm hover:bg-card/75"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out bg-gradient-to-t from-secondary/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center gap-4 mb-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/15 text-secondary group-hover:bg-secondary/20 transition-colors duration-400 ease-out">
                <FaHeart className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-foreground">Centres d&apos;intérêt</h3>
            </div>
            <motion.ul
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {interests.map((item, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="beyond-code-item px-5 py-3.5 bg-muted/40 border border-border hover:border-secondary/25 hover:bg-secondary/5 text-foreground/90 hover:text-foreground font-medium"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
