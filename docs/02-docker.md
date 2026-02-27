# 2. Docker

**Status :** ✅ fait

---

## But

Image de production légère, build séparé du runtime, contexte de build propre. Prêt pour CI (build d’image) et déploiement (registry → ECS ou autre).

---

## Concepts clés

- **Multi-stage** : deps → builder → runner. Seul le résultat du build (standalone + static + public) est dans l’image finale.
- **Standalone** : Next génère `.next/standalone` (server.js + node_modules minimal). Réduit fortement la taille.
- **DOCKER_BUILD=1** : évite d’exécuter `setupDevPlatform()` (workerd) dans `next.config.ts` pendant le build.
- **Runner** : utilisateur non-root `nextjs`, port 3000, `HOSTNAME=0.0.0.0`.

---

## Fichiers créés

| Fichier | Rôle |
|---------|------|
| `Dockerfile` | 3 stages : deps (npm ci), builder (npm run build), runner (node server.js) |
| `.dockerignore` | Exclut node_modules, .next, .git, tests, .env, docs, etc. |
| `next.config.ts` | `output: 'standalone'` si pas GitHub Pages ; skip Cloudflare si `DOCKER_BUILD=1` |
| `DOCKER.md` | Doc détaillée Docker (objectifs, stages, usage, CI/CD) |

---

## Commandes

```bash
# Build
docker build -t portfolio:latest .

# Run
docker run -p 3000:3000 portfolio:latest

# Avec env (exemple)
docker run -p 3000:3000 --env-file .env.production portfolio:latest
```

---

## Checklist

- [x] `docker build -t portfolio:latest .` réussit
- [x] `docker run -p 3000:3000 portfolio:latest` → app sur http://localhost:3000
- [x] Image basée sur `node:20-alpine` (runner)
- [x] Pas d’exécution en root dans le conteneur (user nextjs)
- [x] `.dockerignore` réduit le contexte (pas de node_modules, .git, .env)

---

## Troubleshooting

| Problème | Piste |
|----------|--------|
| `spawn workerd ENOENT` au build | Définir `ENV DOCKER_BUILD=1` dans le stage builder du Dockerfile et skip setup Cloudflare dans `next.config.ts` (voir [01-code.md](01-code.md)). |
| Connexion refusée depuis l’hôte | Vérifier `-p 3000:3000` et que le serveur écoute sur `0.0.0.0` (déjà fait via `HOSTNAME=0.0.0.0`). |
| Build lent / contexte lourd | Vérifier `.dockerignore` (node_modules, .next, .git exclus). |
