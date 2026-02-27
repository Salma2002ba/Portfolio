# 4. Security (DevSecOps)

**Status :** ✅ fait — workflow Security (Trivy, Syft, hardening, smoke), SARIF, SBOM, doc et politique.

---

## Pourquoi

- **Supply chain** : dépendances (npm, OS) et image Docker peuvent contenir des CVE connues ; une faille dans une lib ou une couche base peut compromettre l’app.
- **Objectif** : détecter les vulnérabilités et les mauvaises configurations **avant** déploiement, avoir une trace (SBOM) et une politique claire (blocage CRITICAL/HIGH, pas de GPL, non-root, HEALTHCHECK).

---

## Ce que protège le pipeline

| Contrôle | Rôle |
|----------|------|
| **Trivy image** | CVE sur packages OS (Alpine) et libs (npm) dans l’image. Fail si CRITICAL ou HIGH. |
| **Trivy config** | Mauvaise config Dockerfile (user root, secrets, etc.). |
| **SBOM (Syft)** | Inventaire reproductible des paquets (SPDX). Artifact + top 10 dans le summary. |
| **Licence GPL** | Politique : refus des licences GPL/AGPL/LGPL dans le SBOM (fail du job). |
| **Hardening** | Vérification que l’image ne tourne pas en root, qu’un HEALTHCHECK est défini, affichage de la taille d’image. |
| **Smoke** | S’exécute **après** tous les contrôles ; pas de run container sans scan préalable. |

---

## Ce que ça ne protège pas

- **Code applicatif** : pas de scan SAST (type CodeQL) dans cette étape ; le lint/typecheck reste en CI.
- **Secrets** : pas de détection de secrets dans le code (à ajouter via trufflehog ou GitGuardian si besoin).
- **Dépendances à la volée** : uniquement ce qui est présent dans l’image buildée (npm install au build).
- **Runtime** : pas de détection d’intrusion en prod ; le pipeline est pré-déploiement.

---

## Exemple réel de CVE détectable

- **CVE-2024-XXXX** (exemple type) : vulnérabilité dans une lib npm ou dans une couche Alpine (ex. libssl). Trivy compare les versions installées avec les bases NVD/GHSA ; si la version est vulnérable et le severity CRITICAL ou HIGH, le job **échoue** et le rapport apparaît dans l’onglet Security (SARIF) et dans le résumé du run.

---

## Politique d’acceptation des vulnérabilités

- **CRITICAL / HIGH** : **bloquant**. Le job Security échoue ; pas de smoke ni promotion tant que non traité (mise à jour de dépendance ou de l’image de base, ou exclusion documentée).
- **MEDIUM / LOW** : **non bloquants** dans le workflow actuel ; visibles dans le rapport Trivy (table + JSON) et dans l’onglet Security. À traiter en backlog selon criticité métier.
- **Exclusions** : possibles via fichier de config Trivy (ex. `trivy.yaml` avec `vulnerability.ignore`) pour faux positifs ou CVE acceptés par décision documentée. À utiliser avec parcimonie.

---

## Fichiers

| Fichier | Rôle |
|---------|------|
| `.github/workflows/security.yml` | Build image (buildx + cache GHA), Trivy vuln + config, SARIF upload, Syft SBOM, top 10, check GPL, hardening (user, HEALTHCHECK, taille), smoke, summary. |
| `Dockerfile` | `USER nextjs`, `HEALTHCHECK` avec curl, image Alpine minimale. |
| `docs/04-security.md` | Ce document. |

---

## Checklist de validation

- [x] Workflow Security déclenché sur push/PR (main).
- [x] Build image avec Docker Buildx + cache GHA.
- [x] Trivy image : vulnérabilités OS + library ; exit 1 si CRITICAL/HIGH.
- [x] Trivy config : scan du repo (Dockerfile).
- [x] SARIF uploadé vers GitHub Security tab (category: trivy-image).
- [x] SBOM SPDX JSON en artifact ; top 10 paquets dans le summary.
- [x] Échec si licence GPL/AGPL/LGPL détectée dans le SBOM.
- [x] Vérifications hardening : utilisateur non-root, HEALTHCHECK présent, taille image dans le summary.
- [x] Smoke test exécuté uniquement après succès des étapes de sécurité.
- [x] Job summary lisible dans l’onglet Actions.

---

## Troubleshooting

| Problème | Piste |
|----------|--------|
| Job fail sur Trivy (CRITICAL/HIGH) | Consulter le rapport dans le summary et l’onglet Security. Mettre à jour la dépendance ou l’image de base ; ou ajouter une exclusion documentée dans une config Trivy. |
| SARIF non affiché dans Security | Vérifier que Code Security est activé pour le repo et que le token a la permission `security-events: write`. |
| SBOM : champs manquants (licence, paquets) | Le format SPDX de Syft peut varier ; adapter les `jq` dans le workflow si la structure change (packages, licenseConcluded, etc.). |
| GPL détecté à tort | Affiner le `jq` (ex. exclure certains identifiants de licence) ou assouplir la politique et documenter. |
| Image tourne en root | Vérifier que le Dockerfile contient bien `USER nextjs` (ou équivalent) dans le stage final. |
| HEALTHCHECK manquant | Ajouter un `HEALTHCHECK` dans le Dockerfile (voir [02-docker.md](02-docker.md)). |

---

## Commandes locales pour reproduire

Prérequis : Docker, [Trivy](https://github.com/aquasecurity/trivy#installation), [Syft](https://github.com/anchore/syft#installation).

```bash
# Build image
docker build -t portfolio:latest .

# Vulnérabilités (échoue si CRITICAL/HIGH)
trivy image --exit-code 1 --severity CRITICAL,HIGH --format table portfolio:latest

# Rapport JSON
trivy image --format json --output trivy-results.json portfolio:latest

# SARIF (pour import manuel ou script)
trivy image --format sarif --output trivy-results.sarif portfolio:latest

# Config (Dockerfile / fichiers)
trivy config --exit-code 1 --format table .

# SBOM SPDX
syft portfolio:latest -o spdx-json=sbom.spdx.json

# Vérifier utilisateur et HEALTHCHECK
docker inspect --format '{{.Config.User}}' portfolio:latest
docker inspect --format '{{.Config.Healthcheck}}' portfolio:latest

# Taille image (octets)
docker image inspect --format '{{.Size}}' portfolio:latest
```

---

## Badge Security (README)

Pour afficher le statut du workflow Security dans le README :

```markdown
[![Security](https://github.com/<owner>/<repo>/actions/workflows/security.yml/badge.svg)](https://github.com/<owner>/<repo>/actions/workflows/security.yml)
```

Remplacer `<owner>` et `<repo>` par l’organisation et le nom du dépôt.
