# Architecture pipeline et déploiement

Vision courte du pipeline DevOps/Cloud et des deux phases de registry/déploiement.

---

## Pipeline global

```
  Code  →  CI  →  Docker  →  Security  →  Registry  →  IaC  →  Deploy  →  Monitor
   ✅       ✅       ✅         ✅           ✅         ✅        ✅         ✅
```

| Étape      | Rôle |
|------------|------|
| **Code**   | Next.js, GitHub Pages (export statique), scripts. |
| **CI**     | Lint, tests (Jest), build Next ; pas de build Docker dans la CI. |
| **Docker** | Dockerfile multi-stage, image standalone ; build utilisé par Security et Registry. |
| **Security** | Build image, Trivy (vuln + config), SBOM Syft, hardening, smoke ; blocage CRITICAL/HIGH. |
| **Registry** | Push de l’image : **phase 1** GHCR (push sur main), **phase 2** ECR (après mise en place OIDC / pipeline). |
| **IaC**    | Terraform (infra/terraform) : VPC, ALB, ECS Fargate, ECR, CloudWatch. |
| **Deploy** | ECS exécute l’image (placeholder puis image ECR de l’app) ; ALB expose le trafic. |
| **Monitor** | CloudWatch Logs (MVP) + alarme simple (HealthyHostCount). |

---

## Phase 1 : GHCR (actuelle)

- **Workflow** : Push to GHCR sur push `main` : build de l’image, push vers `ghcr.io/<owner>/<repo>` avec tags `latest` et SHA.
- **Usage** : Image disponible pour pull manuel, démo, ou déploiement externe. Pas encore de déploiement AWS automatique à partir de GHCR.

---

## Phase 2 : ECR + ECS (cible)

- **Infra (Terraform)** : ECR repository créé ; ECS cluster, task definition, service Fargate, ALB déjà en place avec une image placeholder (nginx).
- **À venir** :  
  - Pipeline (ex. GitHub Actions) qui build l’image, push vers **ECR** (après config OIDC ou credentials), met à jour la task definition ECS avec la nouvelle image et force un déploiement.  
  - Remplacement du placeholder par l’image ECR du portfolio (port 3000 ou 80 selon config).
- **Sécurité** : Pas de secrets AWS dans le repo ; OIDC GitHub → AWS prévu pour l’authentification du workflow.

---

## Résumé

- **Aujourd’hui** : Code → CI → Docker → Security → push GHCR ; Terraform déploie une infra AWS minimale (ALB + ECS + ECR + logs) avec une image placeholder.
- **Ensuite** : Push ECR depuis la CI/CD (OIDC), déploiement ECS automatique, puis HTTPS (ACM + Route53) et renforcement du monitoring.
