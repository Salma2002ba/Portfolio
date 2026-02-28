# Déploiement Cloud AWS (Terraform MVP)

Ce document décrit l’infrastructure AWS minimale pour exécuter l’image conteneurisée en public : ECS Fargate + ALB (HTTP 80), ECR, VPC, CloudWatch. Pas de secrets dans le repo ; OIDC prévu plus tard.

---

## 1. Architecture (schéma texte)

```
                    Internet
                        │
                        ▼
              ┌─────────────────┐
              │   ALB (port 80)  │  ← Security group: 0.0.0.0/0:80
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  Target Group   │  ← Health check /, port 80
              └────────┬────────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
  ┌──────────────┐            ┌──────────────┐
  │ Public       │            │ Public       │
  │ Subnet AZ-a  │            │ Subnet AZ-b  │
  └──────┬───────┘            └──────┬───────┘
         │                            │
         ▼                            ▼
  ┌──────────────────────────────────────────┐
  │  ECS Fargate Service (1 task)             │
  │  - Task def: placeholder nginx:alpine:80  │
  │  - assign_public_ip = true                │
  │  - Security group: container_port from ALB│
  └──────────────────────────────────────────┘
         │
         ▼
  ┌──────────────┐     ┌──────────────┐
  │ ECR repo    │     │ CloudWatch   │
  │ (app image)  │     │ /ecs/portfolio│
  └──────────────┘     └──────────────┘
```

- **Région** : eu-west-1  
- **Ressources** : VPC, 2 subnets publics, IGW, ALB, target group, listener HTTP 80, ECS cluster, task definition (image placeholder), ECS service, ECR repository, CloudWatch log group, IAM roles, alarme optionnelle (HealthyHostCount).

---

## 2. Prérequis

- **AWS CLI** : configuré avec des identifiants ayant les droits nécessaires (VPC, EC2, ECS, ECR, IAM, CloudWatch). Pas de secrets dans le repo ; utiliser `aws configure` ou variables d’environnement. Installation : `winget install Amazon.AWSCLI`.
- **Terraform** : >= 1.0. Deux options :
  - **Option A** : installer sur la machine : `winget install Hashicorp.Terraform` ou [terraform.io/downloads](https://www.terraform.io/downloads). Puis ouvrir un **nouveau** terminal pour que le PATH soit à jour.
  - **Option B** : un binaire Terraform peut être placé dans `infra/terraform/bin/terraform.exe` (le dossier `bin/` est dans `.gitignore`). Vous pouvez aussi utiliser le script `run.ps1` : `.\run.ps1 init`, `.\run.ps1 plan`, etc.

---

## 2b. AWS Learner Lab / Academy

Les comptes **AWS Academy Learner Lab** utilisent un rôle IAM avec des permissions très limitées. Ce stack Terraform a besoin de créer des ressources (VPC, IAM, ECS, ECR, CloudWatch, ALB, etc.) ; le rôle `voclabs` **n’autorise en général pas** ces actions.

**Erreurs typiques au `terraform apply` :**
- `ec2:CreateVpc` — création de VPC
- `iam:CreateRole` — rôles ECS execution / task
- `ecs:CreateCluster` — cluster ECS
- `ecr:CreateRepository` — repository ECR
- `logs:CreateLogGroup` — log group CloudWatch

**Options :**
1. **Compte AWS « classique »** (ex. [Free Tier](https://aws.amazon.com/free/)) : vous contrôlez les utilisateurs IAM et pouvez attribuer les droits nécessaires (PowerUser ou politique dédiée). C’est l’option recommandée pour faire tourner ce Terraform de bout en bout.
2. **Demander des droits étendus** : si vous dépendez d’un lab Academy, l’instructeur ou l’admin peut éventuellement étendre les permissions du rôle (ajout des actions listées dans la section 7 « Fichiers Terraform » et services associés). Ce n’est pas toujours possible selon les règles du lab.
3. **Rester en local / CI** : vous pouvez continuer à utiliser `terraform plan` pour valider le code, et déployer l’app via Docker en local ou via la CI (build, push GHCR) sans appliquer ce Terraform sur AWS.

La liste détaillée des actions IAM nécessaires pour ce stack figure en section 7 (fichiers Terraform) et dans la doc AWS (EC2/VPC, ECS, ECR, IAM, CloudWatch, ELB).

---

## 3. Commandes

Toutes les commandes sont à exécuter depuis `infra/terraform/`. La **première fois**, `terraform init` peut prendre 1 à 2 minutes (téléchargement du provider AWS).

**Avec Terraform dans le PATH :**
```bash
cd infra/terraform

# Initialiser (télécharge le provider AWS)
terraform init

# Vérifier le plan (aucune ressource créée)
terraform plan

# Créer l’infra (confirmer par yes)
terraform apply

# Afficher les sorties (URL ALB, ECR)
terraform output
```

**Avec le binaire local (bin/terraform.exe) ou le script :**
```powershell
cd infra/terraform
.\run.ps1 init
.\run.ps1 plan
.\run.ps1 apply
.\run.ps1 output
```

**Détruire l’infra** (éviter les coûts en dev) :

```bash
terraform destroy
```

---

## 4. Vérification

- **Ouvrir l’URL de l’app** : après `terraform apply`, exécuter `terraform output alb_url` et ouvrir l’URL dans un navigateur. Avec l’image placeholder (nginx:alpine), la page par défaut nginx s’affiche.
- **Logs CloudWatch** : dans la console AWS → CloudWatch → Log groups → `/ecs/portfolio`. Les logs des tâches ECS y sont envoyés.
- **Alarme** : une alarme CloudWatch (optionnelle) est créée sur le nombre de cibles saines (HealthyHostCount < 1). À consulter dans CloudWatch → Alarms.

---

## 5. Coûts et nettoyage

- **Coûts** : Fargate (vCPU + mémoire), ALB, données, ECR (stockage). Quelques euros par jour en dev avec 1 task.
- **Nettoyage** : `terraform destroy` supprime toutes les ressources gérées par ce Terraform. Vérifier qu’aucune image ECR importante n’est la seule copie avant de détruire.

---

## 6. TODO (prochaines étapes)

- **HTTPS** : ajouter ACM (certificat) + listener HTTPS (443) et optionnellement redirection HTTP → HTTPS ; Route53 si nom de domaine.
- **OIDC GitHub → AWS** : configurer l’OIDC pour que la CI/CD pousse vers ECR et déploie sur ECS sans clés AWS dans le repo.
- **Pipeline push ECR + deploy ECS** : workflow qui build l’image, push vers ECR, met à jour la task definition / service ECS (force new deployment ou nouvelle révision).
- **Backend Terraform** : déplacer le state vers S3 + DynamoDB (lock) pour travail en équipe.

---

## 7. Fichiers Terraform (référence)

| Fichier              | Contenu |
|----------------------|--------|
| `provider.tf`        | Provider AWS, `required_version`, `default_tags` (Project, ManagedBy, Env). |
| `variables.tf`       | aws_region, app_name, env, container_port, desired_count, cpu, memory. |
| `vpc.tf`             | VPC, 2 subnets publics, IGW, route table. |
| `security_groups.tf` | alb_sg (80 ouvert), ecs_tasks_sg (trafic depuis ALB). |
| `alb.tf`             | ALB, target group, listener HTTP 80. |
| `ecr.tf`             | ECR repository, scanOnPush=true. |
| `iam.tf`             | ECS task execution role, task role (minimal). |
| `cloudwatch.tf`       | Log group `/ecs/<app_name>`, rétention 7 jours. |
| `ecs.tf`             | ECS cluster, task definition (placeholder nginx:80), ECS service Fargate. |
| `alarms.tf`          | Alarme optionnelle HealthyHostCount. |
| `outputs.tf`         | alb_dns_name, alb_url, ecr_repository_url. |

Variables par défaut : `aws_region=eu-west-1`, `app_name=portfolio`, `env=dev`, `container_port=80` (placeholder nginx). Pour une app sur le port 3000, passer `-var="container_port=3000"` et mettre à jour l’image dans la task definition vers l’image ECR de l’app.
