# Docker — Portfolio

Ce document décrit la Dockerisation du projet Portfolio (Next.js 15) : choix techniques, structure du Dockerfile, utilisation et intégration CI/CD.

---

## 1. Objectifs de la Dockerisation

| Objectif | Réalisation |
|----------|-------------|
| **Image légère** | Image finale basée sur `node:20-alpine` et build Next.js en mode `standalone` (uniquement le nécessaire pour exécuter le serveur). |
| **Build séparé du runtime** | Dockerfile multi-stage : une étape pour les deps, une pour le build, une pour l’exécution. Seul le résultat du build est copié dans l’image finale. |
| **Contexte de build propre** | `.dockerignore` exclut `node_modules`, `.next`, `.git`, tests, env, etc., pour des builds plus rapides et reproductibles. |
| **Port correct** | Application exposée sur le port **3000** (défaut Next.js), avec `HOSTNAME=0.0.0.0` pour écouter sur toutes les interfaces. |
| **Prêt CI/CD** | Image nommable et versionnable, utilisable telle quelle dans un pipeline (build → push registry → déploiement). |

---

## 2. Architecture du Dockerfile (multi-stage)

Le Dockerfile comporte **3 étapes** ; seules les artefacts utiles passent à l’étape suivante.

### Stage 1 : `deps`

- **Rôle** : installer les dépendances Node (production + dev pour le build).
- **Base** : `node:20-alpine`.
- **Sortie** : répertoire `node_modules` (mis en cache par Docker si `package.json` / `package-lock.json` ne changent pas).
- **Intérêt** : en ne copiant que `package.json` et `package-lock.json`, le cache de la couche `npm ci` est réutilisé tant que les deps ne changent pas.

### Stage 2 : `builder`

- **Rôle** : compiler l’application Next.js.
- **Entrée** : `node_modules` du stage `deps` + tout le code source (filtré par `.dockerignore`).
- **Commande** : `npm run build` → génère `.next/standalone` et `.next/static`.
- **Important** : la variable `GITHUB_PAGES` n’est pas définie (ou vide), donc Next utilise `output: 'standalone'` (configuré dans `next.config.ts`). Le mode `standalone` produit un binaire autonome avec un `node_modules` minimal, ce qui réduit fortement la taille de l’image finale.

### Stage 3 : `runner`

- **Rôle** : image d’exécution minimale.
- **Base** : à nouveau `node:20-alpine` (sans les outils de build).
- **Contenu copié** :
  - `public/` → assets statiques.
  - `.next/standalone/` → serveur Next (dont `server.js` et un `node_modules` réduit).
  - `.next/static/` → assets compilés (CSS, JS, etc.).
- **Sécurité** : utilisateur non-root `nextjs` (uid 1001) pour lancer le processus.
- **Port** : `EXPOSE 3000` ; le serveur écoute sur `0.0.0.0:3000` grâce à `HOSTNAME=0.0.0.0`.

Résultat : l’image finale ne contient ni outil de build, ni dépendances de dev, ni code source inutile — uniquement ce qu’il faut pour exécuter `node server.js`.

---

## 3. Fichier `.dockerignore`

Il limite ce qui est envoyé au contexte Docker (équivalent de `.gitignore` pour le build).

**Exclusions principales :**

- **`node_modules`** : réinstallés dans le conteneur ; éviter de les copier accélère le build et évite des conflits.
- **`.next`**, **`out`**, **`dist`** : artefacts de build locaux, inutiles dans l’image.
- **`.git`** : pas nécessaire en production et réduit la taille du contexte.
- **Fichiers d’environnement** : `.env`, `.env.*` (sauf exemples si besoin) pour ne pas embarquer de secrets.
- **Tests, couverture, configs de test** : pas nécessaires pour le build de production.
- **Documentation / scripts** : `*.md` (sauf `README.md` si vous le souhaitez), `docs`, scripts locaux (ex. `fix-commit-author.bat`).
- **Outils Cloudflare** : `.wrangler`, `.dev.vars` pour ne pas mélanger d’autres déploiements avec le build Docker.

Un contexte plus petit = builds plus rapides et reproductibles.

---

## 4. Modification dans `next.config.ts`

Pour que le build Docker produise un binaire autonome :

- En **non-GitHub-Pages** (cas Docker), on active :  
  `output: 'standalone'`.
- En **GitHub Pages** (`GITHUB_PAGES === 'true'`), la config conserve `output: 'export'` (et basePath, etc.) pour le déploiement statique.

Ainsi, un même dépôt peut servir à la fois au déploiement GitHub Pages et au déploiement Docker sans changer de config manuellement.

Lors du build Docker, la variable **`DOCKER_BUILD=1`** est définie dans le Dockerfile. Elle permet de ne pas exécuter `setupDevPlatform()` de `@cloudflare/next-on-pages` (qui nécessite le binaire `workerd` de Wrangler, absent dans l’image Alpine). Le build Next.js s’effectue donc sans outil Cloudflare, ce qui est correct pour une image standalone déployée sur un autre environnement.

---

## 5. Utilisation locale

### Build de l’image

```bash
docker build -t portfolio:latest .
```

Pour une version datée (pratique pour CI/CD) :

```bash
docker build -t portfolio:$(date +%Y%m%d-%H%M) .
```

### Lancer le conteneur

```bash
docker run -p 3000:3000 portfolio:latest
```

L’application est accessible sur **http://localhost:3000**.

### Variables d’environnement (optionnel)

Si l’app utilise des variables (ex. Supabase, Resend) :

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://mon-site.com \
  -e SUPABASE_URL=... \
  -e SUPABASE_ANON_KEY=... \
  portfolio:latest
```

Ou via un fichier :

```bash
docker run -p 3000:3000 --env-file .env.production portfolio:latest
```

---

## 6. Intégration CI/CD (idées)

L’image est conçue pour être construite une fois puis poussée vers un registry et déployée.

**Exemple générique :**

1. **Build** : `docker build -t registry.example.com/portfolio:${CI_COMMIT_SHA} .`
2. **Push** : `docker push registry.example.com/portfolio:${CI_COMMIT_SHA}`
3. **Déploiement** : selon la plateforme (Kubernetes, ECS, Cloud Run, Docker Swarm, etc.) — utiliser la même image et exposer le port 3000 (ou mapper 80/443 vers 3000).

**Bonnes pratiques :**

- Tagger les images avec le SHA de commit ou un numéro de version pour traçabilité.
- Ne jamais builder en tant que root en production (déjà géré avec l’utilisateur `nextjs`).
- Injecter les secrets (clés API, URLs) via variables d’environnement ou un secret manager, pas dans l’image.

---

## 7. Résumé des fichiers concernés

| Fichier | Rôle |
|---------|------|
| `Dockerfile` | Build multi-stage (deps → builder → runner), image finale sur port 3000. |
| `.dockerignore` | Réduit le contexte de build et évite d’embarquer du superflu. |
| `next.config.ts` | Ajout de `output: 'standalone'` lorsque `GITHUB_PAGES` n’est pas défini (Docker / production classique). |
| `DOCKER.md` | Ce document : explication de la Dockerisation et mode d’emploi. |

---

## 8. Dépannage rapide

- **Le build échoue sur `npm run build`** : vérifier que le projet build correctement en local (`npm run build`). Les erreurs TypeScript/ESLint peuvent être ignorées en build si c’est configuré dans `next.config.ts`.
- **Erreur "Cannot find module" au runtime** : s’assurer que `output: 'standalone'` est bien actif pour le build Docker (pas de `GITHUB_PAGES=true` pendant le `docker build`).
- **Connexion refusée depuis l’hôte** : le conteneur doit écouter sur `0.0.0.0` (déjà géré par `HOSTNAME=0.0.0.0`) et le port mappé avec `-p 3000:3000`.

Une fois ces points vérifiés, l’image est prête pour un déploiement en production (CI/CD, cloud ou on-premise).
