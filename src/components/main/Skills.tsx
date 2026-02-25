'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Skill, skills } from '@/constants'
import SkillDataProvider from '../sub/SkillDataProvider'

const uniqueSkills: Skill[] = Array.from(
  skills
    .reduce((map, skill) => {
      if (!map.has(skill.skill_name)) {
        map.set(skill.skill_name, { ...skill, width: 40, height: 40 })
      }
      return map
    }, new Map<string, Skill>())
    .values(),
)

const Skills = () => {
  const [showAll, setShowAll] = useState(false)
  const [maxItemsToShow, setMaxItemsToShow] = useState(12) // Default value

  useEffect(() => {
    // This function will run only on the client side
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth > 768) {
          setMaxItemsToShow(12)
        } else if (window.innerWidth <= 768 && window.innerWidth > 425) {
          setMaxItemsToShow(8)
        } else {
          setMaxItemsToShow(6)
        }
      }
    }

    // Set initial value
    handleResize()

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const skillsToShow = showAll ? uniqueSkills : uniqueSkills.slice(0, maxItemsToShow)

  return (
    <section
      id="competences"
      className="relative flex flex-col items-center justify-center gap-8 py-14 px-4 sm:px-8 min-h-[500px] overflow-hidden"
      aria-labelledby="competences-heading"
    >
      {/* Animated Background Elements */}
      <div className="cyberpunk-diagonals absolute inset-0 -z-10 pointer-events-none">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-lg rotate-45 animate-bounce" />
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-primary/15 rounded-full animate-ping" />
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-secondary/10 rounded-lg rotate-12 float-animation" />
        {/* Cyberpunk : formes animées en dark */}
        <div className="absolute top-1/4 right-16 w-28 h-28 bg-primary/20 rounded-full blur-[65px] opacity-0 dark:opacity-100 cyberpunk-float-slow" aria-hidden />
        <div className="absolute bottom-1/3 left-20 w-32 h-32 bg-accent/15 rounded-full blur-[75px] opacity-0 dark:opacity-100 cyberpunk-pulse-glow" aria-hidden />
        <div className="absolute top-1/2 right-1/4 w-14 h-14 bg-secondary/25 rounded-lg blur-[45px] opacity-0 dark:opacity-100 cyberpunk-drift" aria-hidden />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-section" />
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-gradient-to-l from-secondary/15 via-primary/10 to-transparent rounded-full blur-2xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl relative z-10"
      >
        <h2
          id="competences-heading"
          title="Compétences"
          className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-2"
        >
          Compétences techniques
        </h2>

      </motion.div>

      {/* Compétences techniques */}
      <div className="w-full max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {skillsToShow.map((skill, index) => (
            <motion.div
              key={skill.skill_name}
              title={skill.skill_name}
              className="group relative flex flex-col items-center p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/20 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-xl"
              role="listitem"
              aria-label={skill.skill_name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-primary/20 via-accent/10 to-transparent blur-sm"></div>
              
              <div className="relative flex flex-col items-center gap-3 z-10">
                <SkillDataProvider
                  src={skill.Image}
                  width={32}
                  height={32}
                  index={index}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-xs font-medium text-foreground text-center leading-tight line-clamp-2">
                  {skill.skill_name}
                </span>
              </div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show All / Show Less Button */}
        {uniqueSkills.length > maxItemsToShow && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <button
              title={showAll ? 'Afficher moins de compétences' : 'Afficher toutes les compétences'}
              onClick={() => setShowAll(!showAll)}
              className="group relative overflow-hidden bg-gradient-to-r from-secondary via-accent to-primary hover:from-accent hover:to-secondary text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative z-10">
                {showAll ? 'Voir moins' : `Tout afficher (${uniqueSkills.length})`}
              </div>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </motion.div>
        )}

        
      </div>
    </section>
  )
}

export default Skills