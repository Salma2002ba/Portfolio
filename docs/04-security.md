# 4. Security

**Status :** 🧭 next

---

## But

Scanner l’image Docker (Trivy), produire un SBOM (Syft), et appliquer des policies (ex. pas de CVEs critiques) pour bloquer la promotion si nécessaire.

---

## Concepts clés

- **Trivy** : scan vulnérabilités (OS + dépendances) sur l’image.
- **Syft** : génération SBOM (Software Bill of Materials) pour traçabilité.
- **Policies** : seuils (ex. FAIL si CRITICAL) ; intégration dans la CI ou étape dédiée.

---

## Fichiers à créer

| Fichier | Rôle |
|---------|------|
| `.github/workflows/ci.yml` (ou `security.yml`) | Étape Trivy image + optionnel Syft ; sortie SBOM en artifact |
| (Optionnel) `trivy.yaml` / policy | Seuils et exclusions |

---

## Commandes

```bash
docker build -t portfolio:latest .
trivy image --exit-code 1 --severity CRITICAL,HIGH portfolio:latest
syft portfolio:latest -o syft.json
```

---

## Checklist (à valider après implémentation)

- [ ] Trivy exécuté sur l’image buildée en CI.
- [ ] Build échoue ou warning si CRITICAL (selon policy).
- [ ] SBOM généré (Syft) et stocké en artifact (optionnel).

---

## Troubleshooting

| Problème | Piste |
|----------|--------|
| Trop de faux positifs | Exclure des CVE ou packages dans trivy config ; durcir progressivement. |
| SBOM trop volumineux | Exclure couches inutiles ou limiter le format (syft -o spdx-json). |
