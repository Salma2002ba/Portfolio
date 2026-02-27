# 6. Infrastructure (Terraform)

**Status :** 🧭 next

---

## But

Définir l’infra AWS en IaC : VPC (optionnel selon usage), ECR, ECS (cluster, task definition, service), load balancer, sécurité (groupes, IAM). Reproductible et versionnable.

---

## Concepts clés

- **Terraform** : state (backend S3 + DynamoDB recommandé), modules ou ressources flat.
- **ECR** : repository pour l’image portfolio.
- **ECS** : cluster Fargate, task definition (CPU/mémoire, image ECR, port 3000), service avec ALB.
- **Réseau** : sous-réseaux privés/publics, NAT si besoin.

---

## Fichiers à créer

| Fichier | Rôle |
|---------|------|
| `terraform/` (ou `infra/`) | Répertoire racine Terraform |
| `backend.tf` ou `main.tf` | Backend S3 + DynamoDB (optionnel en local au début) |
| ECR, ECS, réseau, IAM | Modules ou fichiers par domaine |

---

## Checklist (à valider après implémentation)

- [ ] `terraform init` et `terraform plan` exécutables.
- [ ] ECR repo créé.
- [ ] ECS cluster + task definition + service définis ; image = ECR.

---

## Troubleshooting

| Problème | Piste |
|----------|--------|
| State lock | Backend S3 + DynamoDB ; vérifier droits IAM. |
| ECS ne pull pas l’image | Vérifier IAM task role + execution role ; politique ECR pull. |
