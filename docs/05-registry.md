# 5. Registry

**Status :** ✅ GHCR en place — push sur push main ; ECR plus tard.

---

## But

Pousser l’image Docker vers un registry : **GHCR** (GitHub Container Registry) en place ; **ECR** (AWS) prévu plus tard pour le déploiement ECS.

---

## Concepts clés

- **GHCR** : `ghcr.io/<owner>/<repo>:tag`. Auth via `GITHUB_TOKEN` (permission `packages: write`).
- **ECR** : `<account>.dkr.ecr.<region>.amazonaws.com/<repo>:tag`. Auth via AWS credentials (OIDC ou clés) — à mettre en place plus tard.
- **Tagging** : `latest` + SHA du commit (`${{ github.sha }}`).

---

## Fichier créé (GHCR)

| Fichier | Rôle |
|---------|------|
| `.github/workflows/push-ghcr.yml` | Déclenché sur **push** vers `main`. Build avec `docker/build-push-action`, login avec `docker/login-action` (GITHUB_TOKEN), push vers `ghcr.io/<owner>/<repo>` avec tags `latest` et `<sha>`. Cache GHA. |

---

## Détail du workflow Push to GHCR

- **Déclenchement** : `on.push.branches: [main]`.
- **Permissions** : `contents: read`, `packages: write`.
- **Étapes** : Checkout → Set up Buildx → Login GHCR (`ghcr.io`, `github.actor`, `secrets.GITHUB_TOKEN`) → Image ref en minuscules (exigence GHCR) → Build and push avec tags `latest` et `github.sha`, cache `type=gha`.
- **Nom de l’image** : `ghcr.io/<owner>/<repo>` (owner et repo en minuscules).

---

## Commandes (GHCR, local)

```bash
# Login (avec PAT ou GITHUB_TOKEN)
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Tag et push manuels (après build local)
docker build -t ghcr.io/<owner>/<repo>:latest .
docker push ghcr.io/<owner>/<repo>:latest
```

---

## Checklist

- [x] Workflow déclenché sur push sur `main`.
- [x] Image poussée sur GHCR : `ghcr.io/<owner>/<repo>:latest` et `ghcr.io/<owner>/<repo>:<sha>`.
- [x] Utilisation de `docker/login-action` et `docker/build-push-action` ; `GITHUB_TOKEN` ; permission `packages: write`.
- [ ] ECR : à mettre en place plus tard (IaC + workflow).

---

## Troubleshooting

| Problème | Piste |
|----------|--------|
| 403 sur push GHCR | Permissions du `GITHUB_TOKEN` (write packages) ; visibilité du package. |
| ECR login failed | Vérifier région, politique OIDC (trust relationship), rôle IAM. |
