# 8. Monitoring

**Status :** 🧭 next

---

## But

Observer l’application en production : logs (CloudWatch Logs), métriques (CPU, mémoire, requêtes), alertes (seuils, erreurs 5xx, indisponibilité).

---

## Concepts clés

- **CloudWatch Logs** : logs des tâches ECS (stdout/stderr) ; log group par service/task.
- **Métriques** : ECS envoie CPU/mémoire vers CloudWatch ; ALB : requêtes, latence, codes HTTP.
- **Alerting** : alarmes sur métriques (ex. CPU > 80 %, 5xx > 0) ; SNS → email ou Slack.

---

## Fichiers à créer

| Fichier | Rôle |
|---------|------|
| Terraform | Log groups, métriques (si custom), alarmes CloudWatch, SNS topic |
| (Optionnel) Dashboard CloudWatch | Terraform ou manuel |

---

## Checklist (à valider après implémentation)

- [ ] Logs ECS visibles dans CloudWatch.
- [ ] Alarmes configurées (au moins une : ex. UnHealthyHostCount ou 5xx).
- [ ] Notification (email/Slack) testée.

---

## Troubleshooting

| Problème | Piste |
|----------|--------|
| Pas de logs | Vérifier IAM execution role (logs:CreateLogStream, PutLogEvents) ; driver logging ECS. |
| Trop d’alarmes | Ajuster seuils et périodes ; éviter alarmes sur métriques à zéro au démarrage. |
