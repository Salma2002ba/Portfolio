# Salma BABA – Portfolio Cloud DevOps

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

> Projet portfolio personnel Cloud DevOps : présentation de mon parcours, compétences et projets (CEA Cadarache, Université de Montréal, CI/CD, IaC, DevSecOps). Design, animations et structure conservés ; contenu centralisé dans un seul fichier de données.

## Contenu

- **Profil** : Cloud DevOps Engineer, expérience industrielle (CEA Cadarache) et recherche DevSecOps (Montréal)
- **Sections** : Hero, Compétences, CV (preview + téléchargement), Parcours (timeline), Projets, Blog (optionnel), Contact
- **CV** : intégré au site (aperçu PDF + lien de téléchargement)

## Données en un seul fichier

Tout le contenu éditable (nom, titre, bio, liens, contact, projets, expériences, compétences, SEO) est centralisé dans :

**`src/data/profile.ts`**

Modifier uniquement ce fichier pour adapter le portfolio sans toucher au design ni aux composants.

## Lancer le projet

### Prérequis

- Node.js 18+
- npm

### Installation et démarrage

```bash
git clone <votre-repo>
cd Portfolio
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Intégration du CV

Le site affiche et propose en téléchargement le PDF défini dans `profile.resume.filePath` (par défaut `/resume.pdf`).

Pour utiliser votre CV comme PDF du site :

1. Copier votre CV dans le dossier `public` sous le nom `resume.pdf` :
   ```bash
   cp Resources/CV_BABA_Salma.pdf public/resume.pdf
   ```
   (sous Windows : `copy Resources\CV_BABA_Salma.pdf public\resume.pdf`)

2. Ou remplacer directement le fichier `public/resume.pdf` par votre CV.

Les libellés de la section CV (titre, description, bouton de téléchargement) se configurent dans `profile.resume` dans `src/data/profile.ts`.

### Build production

```bash
npm run build
npm start
```

## Stack technique

- **Frontend** : Next.js (App Router), TypeScript, Tailwind CSS
- **UI** : Radix UI, composants type ShadCN, Framer Motion
- **Contenu** : un seul fichier de config (`src/data/profile.ts`)

Aucune modification du design, des animations ou de la structure des pages ; uniquement le contenu est personnalisable via le profil.

## Structure utile

```
src/
├── data/
│   └── profile.ts          # Contenu centralisé (à modifier pour personnaliser)
├── app/
│   ├── layout.tsx          # Metadata & JSON-LD depuis profile
│   ├── page.tsx            # Page d’accueil
│   ├── devops-engineer/    # Page DevOps / Cloud
│   ├── cloud-engineer/     # Page Cloud Engineer
│   └── blog/                # Article(s) blog
├── components/
│   ├── main/               # Sections (Hero, Skills, Resume, Timeline, Projects, Blogs, Contact)
│   ├── sub/
│   └── ui/
public/
└── resume.pdf              # CV (preview + téléchargement)
```

## Contact

**Salma BABA** – Cloud DevOps Engineer  

- Email : [salma2002ba@gmail.com](mailto:salma2002ba@gmail.com)  
- Localisation : Marseille, France (ouverte Nice / Sophia Antipolis)

Remplacer les placeholders GitHub et LinkedIn dans `src/data/profile.ts` par vos liens réels.

---

Ce portfolio est un projet personnel Cloud DevOps ; le design et les fonctionnalités front sont conservés à l’identique.
