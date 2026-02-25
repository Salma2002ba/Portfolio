'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Skill, skills } from '@/constants'
import SkillDataProvider from '../sub/SkillDataProvider'
import { profile } from '@/data/profile'

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
      <div className="absolute inset-0 -z-10">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-primary/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-secondary/10 rounded-lg rotate-12 float-animation"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-section"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-gradient-to-l from-secondary/15 via-primary/10 to-transparent rounded-full blur-2xl"></div>
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
          Compétences
        </h2>
        <p className="text-lg text-muted-foreground font-medium">
          Compétences techniques et soft skills au service de vos projets.
        </p>
      </motion.div>

      {/* Compétences techniques */}
      <div className="w-full max-w-6xl relative z-10">
        <h3 className="text-xl font-semibold text-foreground mb-2 text-center">Compétences techniques</h3>
        <p className="text-sm text-muted-foreground text-center mb-6">DevOps, cloud, CI/CD, conteneurisation, IaC</p>
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

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center text-base text-muted-foreground"
        >
          …et bien d'autres technologies que j'explore et maîtrise au quotidien.
        </motion.p>

        {/* Soft skills */}
        {profile.softSkills?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 pt-8 border-t border-border"
          >
            <h3 className="text-xl font-semibold text-foreground mb-2 text-center">Soft skills</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">Compétences relationnelles et comportementales</p>
            <div className="flex flex-wrap justify-center gap-3">
              {profile.softSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-primary/10 text-foreground text-sm font-medium border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Skills