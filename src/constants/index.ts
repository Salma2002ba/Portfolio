/**
 * Skills and socials - sourced from profile for single source of truth.
 * Edit src/data/profile.ts to change skills.
 */
import { profile } from '@/data/profile'

export type Skill = (typeof profile.skills)[number]
export const skills = profile.skills

export const Socials = [
  { name: 'GitHub', src: '/github-142-svgrepo-com.svg', link: profile.links.github },
  { name: 'LinkedIn', src: '/icons.svg', link: profile.links.linkedin },
]
