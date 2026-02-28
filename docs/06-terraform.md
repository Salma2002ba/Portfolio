# 6. Infrastructure (Terraform)

**Status :** ✅ MVP en place — infra minimale eu-west-1 (VPC, ALB, ECS Fargate, ECR, CloudWatch). Détails dans [CLOUD_AWS.md](CLOUD_AWS.md).

---

## But

Définir l’infra AWS en IaC : VPC, ALB, ECS Fargate, ECR, CloudWatch. Reproductible, taguée (Project, ManagedBy, Env), prête pour déploiement d’image (placeholder puis ECR).

---

## Concepts clés

- **Région** : eu-west-1.
- **Réseau** : VPC, 2 subnets publics, IGW, route table.
- **ALB** : HTTP 80, target group, health check.
- **ECS** : cluster Fargate, task definition (image placeholder nginx:80), service avec assign_public_ip, relié au target group.
- **ECR** : repository pour l’image app (scanOnPush=true).
- **CloudWatch** : log group `/ecs/<app_name>`, rétention 7 j ; alarme optionnelle HealthyHostCount.

---

## Fichiers (infra/terraform/)

| Fichier | Rôle |
|---------|------|
| `provider.tf` | AWS provider, required_version, default_tags. |
| `variables.tf` | aws_region, app_name, env, container_port, desired_count, cpu, memory. |
| `vpc.tf` | VPC, 2 subnets publics, IGW, route table. |
| `security_groups.tf` | alb_sg (80), ecs_tasks_sg (depuis ALB). |
| `alb.tf` | ALB, target group, listener 80. |
| `ecr.tf` | ECR repository. |
| `iam.tf` | ECS execution role, task role. |
| `cloudwatch.tf` | Log group. |
| `ecs.tf` | Cluster, task definition, service. |
| `alarms.tf` | Alarme HealthyHostCount. |
| `outputs.tf` | alb_dns_name, alb_url, ecr_repository_url. |

---

## Checklist

- [x] `terraform init` et `terraform plan` exécutables (depuis infra/terraform/).
- [x] ECR repo créé.
- [x] ECS cluster + task definition (placeholder) + service Fargate ; ALB + outputs.
- [x] Doc déploiement : [CLOUD_AWS.md](CLOUD_AWS.md). Vue d’ensemble pipeline : [ARCHITECTURE.md](ARCHITECTURE.md).

---

## Troubleshooting

| Problème | Piste |
|----------|--------|
| **Learner Lab : 403 / AccessDenied** au `apply` | Le rôle Academy n’a pas les droits (VPC, IAM, ECS, ECR, logs). Voir [CLOUD_AWS.md § 2b](CLOUD_AWS.md) — utiliser un compte AWS classique (Free Tier) ou demander des permissions étendues. |
| State lock | Backend S3 + DynamoDB (à ajouter) ; vérifier droits IAM. |
| ECS ne pull pas l’image | Vérifier execution role (AmazonECSTaskExecutionRolePolicy) ; politique ECR. |
| Alarme dimensions | Vérifier LoadBalancer / TargetGroup ARN suffix si l’alarme ne s’évalue pas. |
