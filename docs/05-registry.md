# 5. Registry

**Status :** 🧭 next

---

## But

Pousser l’image Docker buildée en CI vers un registry : d’abord **GHCR** (GitHub Container Registry), puis **ECR** (AWS) pour le déploiement ECS.

---

## Concepts clés

- **GHCR** : `ghcr.io/<owner>/<repo>:tag`. Auth via `GITHUB_TOKEN` ou PAT.
- **ECR** : `<account>.dkr.ecr.<region>.amazonaws.com/<repo>:tag`. Auth via AWS credentials (OIDC ou clés).
- **Tagging** : `latest`, `sha-<commit>`, ou version sémantique.

---

## Fichiers à créer

| Fichier | Rôle |
|---------|------|
| `.github/workflows/ci.yml` ou `push-image.yml` | Après build + security : login registry, tag, push |
| (Plus tard) Terraform / AWS | Création du repo ECR, policies |

---

## Commandes (GHCR)

```bash
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
docker tag portfolio:latest ghcr.io/<owner>/portfolio:latest
docker push ghcr.io/<owner>/portfolio:latest
```

---

## Checklist (à valider après implémentation)

- [ ] Image poussée sur GHCR sur push main (ou tag).
- [ ] ECR repo créé (IaC) ; workflow pousse vers ECR pour déploiement AWS.

---

## Troubleshooting

| Problème | Piste |
|----------|--------|
| 403 sur push GHCR | Permissions du `GITHUB_TOKEN` (write packages) ; visibilité du package. |
| ECR login failed | Vérifier région, politique OIDC (trust relationship), rôle IAM. |
