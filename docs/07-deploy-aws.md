# 7. Deploy AWS (ECS)

**Status :** 🧭 next

---

## But

Déployer l’application sur AWS via **ECS Fargate** : tâche(s) qui exécutent l’image ECR, service avec équilibreur (ALB), scaling, santé sur le port 3000.

---

## Concepts clés

- **ECS Fargate** : pas de gestion de serveurs ; CPU/mémoire définis dans la task definition.
- **Service** : maintient N tâches en cours, redémarre si échec, peut faire rolling update.
- **ALB** : route le trafic vers le target group (port 3000) ; health check sur `/` ou `/api/health`.

---

## Fichiers à créer

| Fichier | Rôle |
|---------|------|
| Terraform (voir [06-terraform.md](06-terraform.md)) | Task definition, service ECS, ALB, target group, listener |
| (Optionnel) `.github/workflows/deploy.yml` | Déclenchement `terraform apply` ou mise à jour du service (force new deployment) |

---

## Commandes

```bash
# Après Terraform
terraform apply -auto-approve

# Mise à jour image (ex. nouveau tag)
aws ecs update-service --cluster <name> --service <name> --force-new-deployment
```

---

## Checklist (à valider après implémentation)

- [ ] Service ECS en cours d’exécution ; tâches healthy.
- [ ] ALB renvoie 200 sur le health check.
- [ ] Accès public (ou interne) à l’URL de l’ALB sur le port 80/443.

---

## Troubleshooting

| Problème | Piste |
|----------|--------|
| Tasks en STOPPED | Vérifier logs ECS ; souvent image pull (ECR auth) ou exit code (crash app). |
| Health check failed | Vérifier chemin et port (3000) ; délai/interval au démarrage Next. |
