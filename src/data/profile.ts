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
  /** Logo path in public folder (e.g. /logos/cea.png). Fallback: imageURL if absent */
  logoUrl?: string
  imageURL: string
  description: string
  achievements: string[]
  /** Technical tags for quick scanning */
  tags?: string[]
  /** Domain icon: 'database' | 'security' | 'cloud' | 'research' */
  domain?: 'database' | 'security' | 'cloud' | 'research'
}

export interface SkillItem {
  skill_name: string
  Image: string
  width: number
  height: number
}

export interface EducationItem {
  id: number
  degree: string
  school?: string
  field?: string
  location: string
  date: string
  /** Logo path in public folder (e.g. /logos/school.png) */
  logoUrl?: string
  /** Compétences acquises — affichées en tags ou liste courte */
  skills?: string[]
  /** Affiche un badge "en cours" */
  inProgress?: boolean
}

export interface ProfileData {
  name: string
  title: string
  /** Base URL of the site for SEO (canonical, openGraph, jsonLd) */
  siteUrl: string
  /** About section: 4 short phrases (positionnement, parcours, focus technique, objectif) */
  bio: [string, string, string, string]
  /** About section: 4 blocs visuels (Who I am, Focus, Environment, Goal) */
  aboutBlocks: { title: string; content: string }[]
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
    downloadLabel: string
  }
  education: EducationItem[]
  projects: ProjectItem[]
  experiences: ExperienceItem[]
  skills: SkillItem[]
  /** Soft skills (compétences relationnelles / comportementales) */
  softSkills: string[]
  /** SEO: keywords for footer and meta */
  keywords: string[]
  /** Notes d'ingénierie — mini articles / retours d'expérience */
  engineeringNotes?: EngineeringNoteItem[]
  /** Veille & ressources — liens externes + note personnelle */
  resources?: ResourceItem[]
}

export interface EngineeringNoteItem {
  title: string
  date: string
  tags: string[]
  href?: string
  excerpt?: string
}

export interface ResourceItem {
  title: string
  url: string
  note: string
  type?: 'article' | 'tool' | 'repo'
}

export const profile: ProfileData = {
  name: 'Salma BABA',
  title: 'Ingénieure Cloud & DevOps',
  siteUrl: 'https://salma-baba.vercel.app',
  bio: [
    'Étudiante en école d\'ingénieur en informatique à Polytech Marseille, en alternance au CEA Cadarache, je me spécialise progressivement en Cloud et DevOps.',
    'Mon parcours se déroule en environnement industriel, sur des enjeux données et infrastructure.',
    'Je m\'intéresse au CI/CD, à l\'Infrastructure as Code et à la conteneurisation ; j\'ai effectué une mission de recherche DevSecOps à l\'Université de Montréal.',
    'Objectif : un poste d\'Ingénieure Cloud / DevOps en sortie d\'études.',
  ],
  aboutBlocks: [
    {
      title: 'Who I am',
      content: 'Étudiante en école d\'ingénieur informatique à Polytech Marseille — alternance au CEA Cadarache',
    },
    {
      title: 'Focus',
      content: 'Cloud, DevOps, CI/CD, Infrastructure as Code, conteneurisation',
    },
    {
      title: 'Environment',
      content: 'Expérience en environnement industriel, enjeux données et infrastructure, mission DevSecOps à Montréal',
    },
    {
      title: 'Goal',
      content: 'Objectif : poste Ingénieure Cloud / DevOps orienté production et plateforme',
    },
  ],
  links: {
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in',
    email: 'salma2002ba@gmail.com',
    devto: '',
  },
  contact: {
    email: 'salma2002ba@gmail.com',
    phone: '+33 7 69 88 56 40',
    location: 'Marseille, France (ouverte Nice / Sophia Antipolis)',
  },
  resume: {
    filePath: '/resume.pdf',
    sectionTitle: 'Mon CV',
    downloadLabel: 'Télécharger le CV',
  },
  education: [
    {
      id: 1,
      degree: 'Baccalauréat scientifique',
      field: 'Filière des sciences mathématiques',
      location: 'Meknès, Maroc',
      date: '2020',
    },
    {
      id: 2,
      degree: 'Licence Mathématiques & Informatique',
      school: 'Aix-Marseille Université',
      location: 'Marseille, France',
      date: '2020 → 2023',
      // logo AMU non disponible — affichage icône university
      skills: [
        'algorithmique et programmation',
        'structures de données',
        'bases de données',
        'systèmes et réseaux',
        'mathématiques appliquées à l\'informatique',
        'logique et modélisation',
      ],
    },
    {
      id: 3,
      degree: 'Diplôme d\'ingénieur informatique',
      school: 'Polytech Marseille',
      location: 'Marseille, France — alternance CEA Cadarache',
      date: '2023 → 2026',
      logoUrl: '/logos/polytech-marseille.png',
      inProgress: true,
      skills: [
        'développement logiciel en environnement industriel',
        'architecture applicative',
        'cloud et DevOps fundamentals',
        'CI/CD et automatisation',
        'Infrastructure as Code',
        'conteneurisation',
        'sécurité des chaînes logicielles (DevSecOps)',
      ],
    },
  ],
  projects: [
    {
      title: 'Application de gestion de données industrielles',
      description: 'Conception et refactoring d\'une application .NET/WPF en architecture MVVM. Contexte industriel : données sensibles, conformité et licences. Pilotage technique, évolutions fonctionnelles et maintenance applicative.',
      imageURL: '/main.svg',
      github: 'https://github.com',
      tags: ['C#', '.NET', 'WPF', 'SQL', 'MVVM'],
    },
    {
      title: 'Plateforme Cloud DevOps',
      description: 'Chaîne CI/CD pour une application conteneurisée : Docker, orchestration Kubernetes, déploiement sur AWS avec infrastructure as Code (Terraform).',
      imageURL: '/globe.svg',
      github: 'https://github.com',
      tags: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'CI/CD'],
    },
    {
      title: 'Recherche DevSecOps – Chaînes d\'approvisionnement logicielles',
      description: 'Recherche en cybersécurité : sécurisation des software supply chains et diversité logicielle. Intégration dans des workflows DevSecOps (pipelines CI/CD, gestion des dépendances, artefacts et builds sécurisés).',
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
      logoUrl: '/logos/cea.png',
      imageURL: '/globe.svg',
      description: 'Pilotage du développement et de la modernisation d’un système applicatif industriel orienté données. Conception d’une application WPF en C#/.NET 8 connectée à une base SQLite, avec un focus sur la robustesse, la pérennité et l’évolution de l’architecture.',

achievements: [
  'Conception et développement d’une application industrielle WPF (C#/.NET 8, MVVM) pour la gestion et la traçabilité de données sensibles',
  'Refonte et modernisation de l’architecture des bases de données (modélisation, intégrité, optimisation, migration vers architecture unifiée)',
  'Interfaçage matériel avec équipements de mesure (communication série RS-232, acquisition et validation de données en temps réel)',
  'Analyse fonctionnelle et recueil des besoins auprès d’utilisateurs non techniques, vulgarisation des contraintes techniques',
  'Résolution de problématiques complexes (diagnostic, investigation technique, lecture et interprétation de documentations industrielles)',
  'Automatisation de workflows métiers et amélioration continue des processus internes',
  'Refactoring et amélioration de la maintenabilité du code (architecture, séparation des responsabilités, fiabilité)'
],
      tags: [
        'C#',
        '.NET 8',
        'WPF',
        'XAML',
        'MVVM',
        'Entity Framework Core',
        'LINQ',
        'SQL',
        'SQLite',
        'PostgreSQL',
        'SGBD',
        'Modélisation de données',
        'Architecture logicielle',
        'Refactoring',
        'Modernisation applicative',
      
        'Interfaçage matériel',
        'Communication série',
        'RS-232',
        'SerialPort',
        'Protocoles de communication',
        'Acquisition de données',
        'Instrumentation',
        'Intégration industrielle',
      
        'Git',
        'GitLab',
        'Documentation technique',
        'Analyse des besoins',
        'Relation client',
        'Vulgarisation technique',
        'Support utilisateurs',
        'Amélioration continue',
      
        'Résolution de problèmes',
        'Diagnostic',
        'Investigation technique'
      ],
      domain: 'database',
    },
    {
      id: 2,
      type: 'work',
      title: 'Stagiaire en cybersécurité - Mobilité internationale',
      company: 'Université de Montréal',
      location: 'Montréal, Québec, Canada',
      date: 'Mai 2025 - Août 2025',
      logoUrl: '/logos/udem.png',
      imageURL: '/globe.svg',
      description: 'Recherche en cybersécurité sur la sécurisation des chaînes d’approvisionnement logicielles via la transformation et la diversification des pipelines de build (software supply chain security).',

achievements: [
  'Analyse des risques liés aux pipelines CI/CD (attaque type SolarWinds) et étude des mécanismes de compromission des artefacts',
  'Exploration de la diversité logicielle appliquée aux systèmes Java : comparaison Maven vs Gradle sur projets open source (MyBatis, PDFBox, GraphHopper)',
  'Migration manuelle de pom.xml vers build.gradle.kts en garantissant l’équivalence fonctionnelle des builds',
  'Analyse approfondie des artefacts générés : structure JAR, bytecode, métadonnées, SBOM, reproductibilité et vérifiabilité',
  'Identification et correction des sources de non-déterminisme (timestamps, ordre des fichiers, MANIFEST, targetCompatibility)',
  'Intégration d’outils d’audit et d’analyse : diffoscope, Syft, Grype, jnorm',
  'Expérimentation de leviers de diversification : JDK matrix (17/21/25-ea), profils de build, obfuscation, Testcontainers',
  'Réflexion sur reproductibilité vs vérifiabilité comme mécanismes de sécurisation des pipelines'
],
      tags: [
        'Cybersecurity',
        'Software Supply Chain Security',
        'DevSecOps',
        'Build Pipeline Security',
        'Software Diversity',
        'Reproducible Builds',
        'Build Verifiability',
      
        'Java',
        'Maven',
        'Gradle',
        'Gradle Kotlin DSL',
        'CI/CD',
        'GitHub Actions',
      
        'SBOM',
        'Syft',
        'Grype',
        'diffoscope',
        'jnorm',
      
        'Artifact Analysis',
        'Bytecode Analysis',
        'JAR Analysis',
        'Dependency Management',
      
        'Testcontainers',
        'Containerization',
        'JDK Matrix',
      
        'Migration Maven to Gradle',
        'Secure Build Engineering',
        'Trusting Trust',
        'Research',
        'Security Research'
      ],
      domain: 'security',
    },
  ],
  skills: [
    // DevOps & Cloud
    { skill_name: 'Docker', Image: '/docker.svg', width: 70, height: 70 },
    { skill_name: 'Kubernetes', Image: '/kubernetes.svg', width: 70, height: 70 },
    { skill_name: 'Helm', Image: '/helm.svg', width: 70, height: 70 },
    { skill_name: 'Terraform', Image: '/terraform.svg', width: 70, height: 70 },
    { skill_name: 'AWS', Image: '/aws.svg', width: 70, height: 70 },
  
    // CI/CD
    { skill_name: 'GitHub Actions', Image: '/githubactions.svg', width: 80, height: 80 },
    { skill_name: 'GitLab CI', Image: '/gitlab.svg', width: 80, height: 80 },
    { skill_name: 'CI/CD', Image: '/cicd.svg', width: 80, height: 80 },
  
    // Systems
    { skill_name: 'Linux', Image: '/linux.svg', width: 70, height: 70 },
    { skill_name: 'Git', Image: '/git.svg', width: 70, height: 70 },
    { skill_name: 'Bash', Image: '/bash.svg', width: 70, height: 70 },
  
    // Software Engineering
    { skill_name: 'C# / .NET', Image: '/dotnet.svg', width: 70, height: 70 },
    { skill_name: 'WPF / MVVM', Image: '/wpf.svg', width: 70, height: 70 },
    { skill_name: 'Entity Framework Core', Image: '/efcore.svg', width: 70, height: 70 },
    { skill_name: 'SQL & Data Modeling', Image: '/sql.svg', width: 70, height: 70 },
  
    // Java Build & DevSecOps (ton différenciateur)
    { skill_name: 'Maven', Image: '/maven.svg', width: 70, height: 70 },
    { skill_name: 'Gradle', Image: '/gradle.svg', width: 70, height: 70 },
    { skill_name: 'DevSecOps', Image: '/security.svg', width: 70, height: 70 },
    { skill_name: 'Software Supply Chain', Image: '/shield.svg', width: 70, height: 70 },
    { skill_name: 'SBOM (Syft)', Image: '/sbom.svg', width: 70, height: 70 },
    { skill_name: 'Artifact Analysis', Image: '/jar.svg', width: 70, height: 70 }
  ],
  softSkills: [
    'Travail en équipe',
    'Communication',
    'Résolution de problèmes',
    'Adaptabilité',
    'Gestion du temps',
    'Esprit d\'analyse',
  ],
  keywords: [
    'Salma BABA',
    'Ingénieure Cloud DevOps',
    'portfolio',
    'DevOps',
    'Cloud',
    'CI/CD',
    'Infrastructure as Code',
    'Terraform',
    'Docker',
    'Kubernetes',
    'AWS',
    'Marseille',
    'DevSecOps',
  ],
  engineeringNotes: [
    { title: 'Retour d’expérience CI/CD en environnement industriel', date: '2024', tags: ['CI/CD', 'DevOps', 'Industrie'], excerpt: 'Mise en place de pipelines et bonnes pratiques.' },
    { title: 'Apprentissages DevSecOps — supply chain', date: '2025', tags: ['DevSecOps', 'Recherche'], href: '#', excerpt: 'Sécurisation des chaînes d’approvisionnement logicielles.' },
  ],
  resources: [
    { title: 'Documentation Terraform best practices', url: 'https://developer.hashicorp.com/terraform', note: 'Référence pour structurer des modules IaC.', type: 'article' },
    { title: 'SLSA — Supply-chain Levels for Software Artifacts', url: 'https://slsa.dev', note: 'Framework utile pour la maturité DevSecOps.', type: 'article' },
    { title: 'Awesome DevOps', url: 'https://github.com/awesome-devops', note: 'Curated list pour découvrir outils et pratiques.', type: 'repo' },
  ],
}
