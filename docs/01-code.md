# 1. Code

**Status :** ✅ fait

---

## But

Avoir une base applicative stable (Next.js 15), avec un build reproductible et un premier déploiement automatique (GitHub Pages). Le code doit supporter deux modes : **export statique** (Pages) et **standalone** (Docker/prod).

---

## Concepts clés

- **Next.js 15** : App Router (`src/app`), React 19.
- **Dual output** : `next.config.ts` choisit `output: 'export'` si `GITHUB_PAGES=true`, sinon `output: 'standalone'` (Docker).
- **Cloudflare** : `@cloudflare/next-on-pages` utilisé en dev ; désactivé en build Pages (env) et en build Docker (`DOCKER_BUILD=1`).
- **GitHub Pages** : déploiement sur push `main` via workflow ; basePath = `/${{ repo.name }}`.

---

## Fichiers concernés

| Fichier | Rôle |
|---------|------|
| `package.json` | Scripts `dev`, `build`, `start`, `lint` ; `pages:build` / `deploy` pour Cloudflare |
| `next.config.ts` | Env (BASE_PATH, SITE_URL), output export/standalone, désactivation setup Cloudflare si `GITHUB_PAGES` ou `DOCKER_BUILD` |
| `.github/workflows/deploy-pages.yml` | Build statique (GITHUB_PAGES, move API routes), upload artifact, deploy-pages |

---

## Commandes utiles

```bash
npm ci
npm run lint
npm run build          # mode standalone (sans GITHUB_PAGES)
npm run start          # serveur Next (après build)
# GitHub Pages : GITHUB_PAGES=true BASE_PATH=/Portfolio npm run build → sortie dans out/
```

---

## Checklist

- [x] `npm ci` puis `npm run build` réussissent en local (sans `GITHUB_PAGES`)
- [x] `npm run lint` exécutable (même si erreurs ignorées en build via config)
- [x] Push sur `main` déclenche le workflow et déploie sur GitHub Pages
- [x] `next.config.ts` : standalone si pas GitHub Pages, export si `GITHUB_PAGES=true`

---

## Troubleshooting

| Problème | Piste |
|----------|--------|
| Build échoue avec workerd ENOENT | Vérifier que `DOCKER_BUILD=1` est défini en build Docker (voir [02-docker.md](02-docker.md)). |
| Pages : liens ou assets cassés | Vérifier `BASE_PATH` et `assetPrefix` dans le workflow et `next.config.ts`. |
| API routes en export | L’export statique ne supporte pas les API routes ; le workflow déplace `src/app/api` avant build puis le restaure. |
