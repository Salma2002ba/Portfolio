/**
 * Configuration centralisée du contenu personnel du portfolio.
 * Modifier uniquement ce fichier pour personnaliser tout le contenu visible et SEO.
 */

export interface ProjectItem {
  title: string
  description: string
  imageURL: string
  github: string
  tags: string[]
  blog?: string
  live?: string
  video?: string
}

export interface ProfileLinks {
  github: string
  linkedin: string
  email: string
  /** Optional: Dev.to username for blog section (leave empty to show no articles) */
  devto?: string
}

export interface ExperienceItem {
  id: number
  type: 'work' | 'project'
  title: string
  company: string
  location: string
  date: string
  imageURL: string
  description: string
  achievements: string[]
}

export interface SkillItem {
  skill_name: string
  Image: string
  width: number
  height: number
}

export interface ProfileData {
  name: string
  title: string
  /** Base URL of the site for SEO (canonical, openGraph, jsonLd) */
  siteUrl: string
  bio: [string, string, string]
  links: ProfileLinks
  contact: {
    email: string
    phone: string
    location: string
  }
  resume: {
    /** PDF path in public folder (e.g. /resume.pdf) */
    filePath: string
    sectionTitle: string
    sectionDescription: string
    downloadLabel: string
  }
  projects: ProjectItem[]
  experiences: ExperienceItem[]
  skills: SkillItem[]
  /** SEO: keywords for footer and meta */
  keywords: string[]
}

export const profile: ProfileData = {
  name: 'Salma BABA',
  title: 'Cloud DevOps Engineer',
  siteUrl: 'https://salma-baba.vercel.app',
  bio: [
    'Cloud DevOps Engineer with industrial experience at CEA Cadarache and a DevSecOps research internship in Montreal.',
    'Focused on CI/CD automation, Infrastructure as Code and secure software supply chains.',
    'Seeking a Cloud/DevOps role in a production-oriented team.',
  ],
  links: {
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in',
    email: 'salma2002ba@gmail.com',
    devto: '',
  },
  contact: {
    email: 'salma2002ba@gmail.com',
    phone: '+33 6 98 85 64 00',
    location: 'Marseille, France (ouverte Nice / Sophia Antipolis)',
  },
  resume: {
    filePath: '/resume.pdf',
    sectionTitle: 'Mon CV',
    sectionDescription: 'Consultez mes qualifications et mon parcours en ingénierie Cloud & DevOps.',
    downloadLabel: 'Télécharger le CV',
  },
  projects: [
    {
      title: 'Industrial Data Application',
      description: 'Conception et refactoring d\'une application de gestion de données en .NET / WPF avec architecture MVVM. Environnement industriel contraint : données sensibles, conformité et licences logicielles. Pilotage technique : analyse des besoins, évolutions fonctionnelles et maintenance applicative.',
      imageURL: '/main.svg',
      github: 'https://github.com',
      tags: ['C#', '.NET', 'WPF', 'SQL', 'MVVM'],
    },
    {
      title: 'DevOps Cloud Platform',
      description: 'Mise en place d\'une chaîne CI/CD pour une application conteneurisée. Conteneurisation avec Docker, orchestration avec Kubernetes. Déploiement cloud sur AWS avec infrastructure décrite en Terraform.',
      imageURL: '/globe.svg',
      github: 'https://github.com',
      tags: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'CI/CD'],
    },
    {
      title: 'DevSecOps Supply Chain Research',
      description: 'Recherche en cybersécurité sur la sécurisation des software supply chains (diversité logicielle). Intégration des concepts dans des workflows DevSecOps : pipelines CI/CD, gestion des dépendances, sécurisation des artefacts et builds sécurisés.',
      imageURL: '/webhook.svg',
      github: 'https://github.com',
      tags: ['DevSecOps', 'Supply Chain Security', 'CI/CD', 'Artefact Signing'],
    },
  ],
  experiences: [
    {
      id: 1,
      type: 'work',
      title: 'Ingénieure bases de données (Apprentie)',
      company: 'CEA Cadarache',
      location: 'Cadarache, France',
      date: 'Oct. 2023 - Aujourd\'hui',
      imageURL: '/globe.svg',
      description: 'Pilotage du développement et de la modernisation des bases de données, avec un focus sur la pérennité et l\'efficacité. Développement d\'une application WPF en C#/.NET pour la gestion de données, connectée à une base SQLite.',
      achievements: [
        'Développement applicatif industriel et modernisation de l\'architecture des bases de données',
        'Application WPF C#/.NET avec interface graphique pour la gestion de données (SQLite)',
        'Analyse des besoins, proposition d\'améliorations fonctionnelles et techniques',
        'Automatisation des workflows et regard neuf sur l\'architecture applicative',
      ],
    },
    {
      id: 2,
      type: 'work',
      title: 'Stagiaire en cybersécurité - Mobilité internationale',
      company: 'Université de Montréal',
      location: 'Montréal, Québec, Canada',
      date: 'Mai 2025 - Août 2025',
      imageURL: '/globe.svg',
      description: 'Stage de recherche en cybersécurité sur la sécurisation des software supply chains via la diversité logicielle.',
      achievements: [
        'Recherche DevSecOps : sécurisation des chaînes d\'approvisionnement logicielles',
        'Intégration dans des workflows DevSecOps : pipelines CI/CD, gestion des dépendances',
        'Sécurisation des artefacts et intégrité des builds',
      ],
    },
  ],
  skills: [
    { skill_name: 'Docker', Image: '/globe.svg', width: 70, height: 70 },
    { skill_name: 'Kubernetes', Image: '/helm.svg', width: 70, height: 70 },
    { skill_name: 'Terraform', Image: '/ansible.svg', width: 80, height: 80 },
    { skill_name: 'AWS', Image: '/azure.svg', width: 70, height: 70 },
    { skill_name: 'GitHub Actions', Image: '/githubactions.svg', width: 80, height: 80 },
    { skill_name: 'GitLab CI', Image: '/githubactions.svg', width: 80, height: 80 },
    { skill_name: 'Linux', Image: '/linux.svg', width: 70, height: 70 },
    { skill_name: 'Git', Image: '/git.svg', width: 70, height: 70 },
    { skill_name: 'Bash', Image: '/bash.svg', width: 70, height: 70 },
    { skill_name: 'CI/CD', Image: '/githubactions.svg', width: 80, height: 80 },
  ],
  keywords: [
    'Salma BABA',
    'Cloud DevOps Engineer',
    'portfolio',
    'DevOps',
    'Cloud',
    'CI/CD',
    'Terraform',
    'Docker',
    'Kubernetes',
    'AWS',
    'Marseille',
    'Ingénieur informatique',
  ],
}
