# Docs DevOps / Cloud — Portfolio

**Status global :** ✅ Code, Docker, CI, Security (terminé et documenté) → Registry → IaC → Deploy → Monitor

Documentation progressive « au fil de l'avancement ». Chaque chapitre reflète l'état réel du repo.

---

## Sommaire

| # | Chapitre | Fichier | Description |
|---|----------|---------|-------------|
| 1 | Code | [01-code.md](01-code.md) | Stack, scripts, déploiement GitHub Pages |
| 2 | Docker | [02-docker.md](02-docker.md) | Dockerfile multi-stage, .dockerignore, usage |
| 3 | CI | [03-ci.md](03-ci.md) | Lint, tests, build, docker build, smoke |
| 4 | Security | [04-security.md](04-security.md) | Trivy, SBOM Syft, hardening, politique ; **étape terminée et documentée** |
| 5 | Registry | [05-registry.md](05-registry.md) | GHCR puis ECR |
| 6 | Infrastructure | [06-terraform.md](06-terraform.md) | Terraform (réseau, ECR, ECS…) |
| 7 | Deploy AWS | [07-deploy-aws.md](07-deploy-aws.md) | ECS Fargate, tâches, services |
| 8 | Monitoring | [08-monitoring.md](08-monitoring.md) | CloudWatch, alerting |

---

## Roadmap

```
Code → Docker → CI → Security → Registry → IaC (Terraform) → Deploy AWS (ECS) → Monitoring
  ✅      ✅      ✅       ✅         ⏳           ⏳               ⏳              ⏳
```

**Prochaine étape :** Registry (GHCR puis ECR). Voir [05-registry.md](05-registry.md).  
Security : aucune évolution prévue pour l’instant ; reprise possible plus tard (exclusions, SAST, etc.). Détails dans [04-security.md](04-security.md).

---

## Conventions

- **Status** en tête de chaque doc : `✅ fait` | `⏳ en cours` | `🧭 next`
- **Pourquoi** : objectif et contexte de l’étape
- **Comment** : fichiers créés, commandes, checkpoints
- **Checklist** : critères de validation avant de passer à la suite
- **Troubleshooting** : erreurs fréquentes et correctifs
- Pas de blabla théorique : uniquement ce qui est utilisé ou prévu dans le repo
