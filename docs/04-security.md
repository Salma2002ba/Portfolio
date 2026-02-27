# 4. Security (DevSecOps)

**Status :** ✅ fait et documenté — étape Security considérée terminée pour l’instant ; reprise possible plus tard (exclusions, SAST, etc.). Aucun ajout prévu côté outillage pour l’instant.

---

## 1. Pourquoi cette étape

- **Menace supply chain** : les dépendances (npm, OS) et l’image Docker peuvent contenir des CVE connues ; une faille dans une lib ou une couche de base peut compromettre l’application.
- **Objectif** : détecter vulnérabilités et mauvaises configurations **avant** déploiement, avoir une trace (SBOM) et une politique claire (blocage CRITICAL/HIGH, pas de GPL, non-root, HEALTHCHECK).

---

## 2. Ce que fait le pipeline (détail)

Le workflow **Security** (`.github/workflows/security.yml`) s’exécute sur **push** et **pull_request** vers `main`. Un seul job **security** enchaîne les étapes suivantes.

### 2.1 Build de l’image

- **Set up Docker Buildx** : utilisation de buildx pour le cache.
- **Build** : `docker/build-push-action` avec `push: false`, `load: true`, tag `portfolio:security`. Cache GHA (`cache-from` / `cache-to` type=gha) pour accélérer les runs suivants.

### 2.2 Trivy — vulnérabilités

- **Scan** : image `portfolio:security`, types `os` + `library` (Alpine + npm).
- **Sévérités** : `CRITICAL,HIGH` uniquement.
- **Comportement** : `exit-code: 1` → le job échoue si au moins une vulnérabilité CRITICAL ou HIGH est trouvée.
- **Sorties** : rapport table dans `trivy-vuln.txt`, repris dans le Job summary GitHub Actions.
- **SARIF** : export `trivy-results.sarif` puis upload vers l’onglet **Security** du dépôt (category: trivy-image) pour affichage des alertes.
- **JSON** : export `trivy-results.json` pour analyse ou archivage.

### 2.3 Trivy — config

- **Scan** : `scan-type: config`, cible le repo (`.`), donc le Dockerfile et fichiers de config.
- **Rôle** : détecter des mauvaises pratiques (ex. user root, secrets, instructions déconseillées).
- **Comportement** : `exit-code: 1` → le job échoue si une règle config échoue.

### 2.4 SBOM (Syft)

- **Génération** : Syft produit un SBOM au format **SPDX JSON** (`sbom.spdx.json`).
- **Artifact** : le fichier est uploadé en artifact du run (nom : `sbom-spdx`).
- **Résumé** : les 10 premiers paquets (nom @ version) sont affichés dans le Job summary.
- **Licences** : un step vérifie l’absence de licence GPL/AGPL/LGPL dans le SBOM ; si une est détectée, le job échoue (politique : refus GPL).

### 2.5 Hardening

- **Utilisateur** : `docker inspect Config.User` → échec si vide (image configurée pour tourner en root).
- **HEALTHCHECK** : `docker inspect Config.Healthcheck` → échec si absent.
- **Taille** : taille de l’image en octets convertie en MB et affichée dans le Job summary.

### 2.6 Smoke test

- **Condition** : s’exécute après les étapes ci-dessus (si une étape échoue, les suivantes peuvent être skippées selon l’ordre d’exécution).
- **Action** : `docker run` du conteneur, attente 10 s, `curl` sur `http://localhost:3000`, vérification du code 200, puis arrêt et suppression du conteneur.

### 2.7 Job summary

- Un tableau récapitulatif (Trivy vuln, Trivy config, SBOM/GPL, non-root, HEALTHCHECK, Smoke) est écrit dans `GITHUB_STEP_SUMMARY` pour une lecture rapide dans l’onglet Actions.

---

## 3. Comprendre les résultats Trivy (vulnérabilités)

Lorsque le job Security **échoue** sur l’étape Trivy vuln, le rapport distingue deux origines possibles.

### 3.1 Vulnérabilités de l’application (ton code / tes deps)

- **Chemin typique** : `app/node_modules/...` (ex. `app/node_modules/next/package.json`).
- **Origine** : dépendances installées via `npm ci` / `package.json` (ex. Next.js, React).
- **Action** : mettre à jour la dépendance concernée vers une version patchée (voir les “Fixed Version” dans le rapport Trivy). Exemple : si Next.js est en cause, faire `npm update next` ou modifier la version dans `package.json` puis relancer le workflow.

### 3.2 Vulnérabilités de l’image de base (hors package.json)

- **Chemins typiques** : `usr/local/lib/node_modules/npm/...`, `opt/yarn-v1.22.22/...`.
- **Origine** : npm / yarn **fournis dans l’image** `node:20-alpine` (outils du runtime Node, pas tes dépendances métier).
- **Action** : tu ne les corriges pas via `package.json`. Options : changer d’image de base (ex. image minimale sans npm), attendre une mise à jour de l’image Node, ou documenter et exclure ces CVE dans une config Trivy (fichier d’exclusion) si la politique le permet.

### 3.3 Exemple concret (run réel)

- **Next.js 15.3.3** (`app/node_modules/next/package.json`) :
  - **CVE-2025-55182** (CRITICAL) : RCE via React Server Components (désérialisation).
  - **GHSA-h25m-26qc-wcjf**, **GHSA-mwv6-3258-q52c** (HIGH) : DoS / deserialization.
- **Paquets dans l’image de base** (npm) : cross-spawn, glob, minimatch, tar, etc. — chemins sous `usr/local/lib/node_modules/npm/...`.

**Conclusion opérationnelle** : priorité 1 = mettre à jour Next.js vers une version patchée (ex. 15.3.6 / 15.3.9 selon les avis). Ensuite, traiter ou exclure les vulnérabilités de l’image de base selon la politique (voir section 5).

---

## 4. Ce que le pipeline ne couvre pas (volontairement pour l’instant)

- **SAST** : pas de scan de code type CodeQL dans cette étape ; le lint/typecheck reste en CI.
- **Secrets** : pas de détection de secrets dans le code (trufflehog, GitGuardian, etc.).
- **Dépendances à la volée** : uniquement ce qui est présent dans l’image buildée.
- **Runtime** : pas de détection d’intrusion en production ; le pipeline est pré-déploiement.

---

## 5. Politique d’acceptation des vulnérabilités

- **CRITICAL / HIGH** : **bloquants**. Le job Security échoue ; pas de smoke ni promotion tant que non traité (mise à jour de dépendance ou image de base, ou exclusion documentée).
- **MEDIUM / LOW** : non bloquants dans le workflow actuel ; visibles dans le rapport Trivy et l’onglet Security ; à traiter en backlog selon criticité.
- **Exclusions** : possibles via un fichier de config Trivy (ex. `trivy.yaml` avec `vulnerability.ignore`) pour faux positifs ou CVE acceptés par décision documentée. À utiliser avec parcimonie. Pour l’instant aucune exclusion n’est en place ; reprise possible plus tard.

---

## 6. Fichiers concernés

| Fichier | Rôle |
|---------|------|
| `.github/workflows/security.yml` | Workflow unique : build image (buildx + cache GHA), Trivy vuln + config, SARIF, Syft SBOM, top 10, check GPL, hardening (user, HEALTHCHECK, taille), smoke, Job summary. |
| `Dockerfile` | Stage runner : `USER nextjs`, `HEALTHCHECK` (curl sur :3000), image Alpine ; curl installé pour le healthcheck. |
| `docs/04-security.md` | Ce document. |

---

## 7. Checklist de validation (état actuel)

- [x] Workflow Security déclenché sur push/PR (main).
- [x] Build image avec Docker Buildx + cache GHA.
- [x] Trivy image : vulnérabilités OS + library ; exit 1 si CRITICAL/HIGH.
- [x] Trivy config : scan du repo (Dockerfile).
- [x] SARIF uploadé vers GitHub Security (category: trivy-image).
- [x] SBOM SPDX JSON en artifact ; top 10 paquets dans le summary.
- [x] Échec si licence GPL/AGPL/LGPL détectée dans le SBOM.
- [x] Hardening : utilisateur non-root, HEALTHCHECK présent, taille image dans le summary.
- [x] Smoke test après les contrôles.
- [x] Job summary lisible dans l’onglet Actions.
- [x] Documentation à jour (ce fichier) ; étape Security considérée terminée pour l’instant.

---

## 8. Troubleshooting

| Problème | Piste |
|----------|--------|
| Job fail sur Trivy (CRITICAL/HIGH) | Consulter le rapport dans le Job summary et l’onglet Security. Distinguer vulns **app** (`app/node_modules/...`) vs **base image** (`usr/local/lib/node_modules/npm/...`). Mettre à jour la dépendance (ex. Next.js) ou l’image de base ; ou ajouter une exclusion documentée dans une config Trivy. |
| Trivy config ❌ | Ouvrir les logs de l’étape « Trivy — config » pour voir la règle en échec ; corriger le Dockerfile ou documenter une exclusion. |
| SARIF non affiché dans Security | Vérifier que Code Security est activé pour le repo et que le workflow a la permission `security-events: write`. |
| SBOM : champs manquants (licence, paquets) | Le format SPDX de Syft peut varier ; adapter les `jq` dans le workflow si la structure change. |
| GPL détecté à tort | Affiner le `jq` (ex. exclure certains identifiants de licence) ou assouplir la politique et documenter. |
| Image tourne en root | Vérifier que le Dockerfile contient bien `USER nextjs` (ou équivalent) dans le stage final. |
| HEALTHCHECK manquant | Ajouter un `HEALTHCHECK` dans le Dockerfile (voir [02-docker.md](02-docker.md)). |

---

## 9. Commandes locales pour reproduire

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

## 10. Badge Security (README)

Le README peut afficher le statut du workflow Security avec :

```markdown
[![Security](https://github.com/<owner>/<repo>/actions/workflows/security.yml/badge.svg)](https://github.com/<owner>/<repo>/actions/workflows/security.yml)
```

Remplacer `<owner>` et `<repo>` par l’organisation et le nom du dépôt.

---

## 11. Suite éventuelle (plus tard)

Reprise possible plus tard sans changer cette doc : exclusions Trivy (CVE image de base), SAST (CodeQL), détection de secrets, politique MEDIUM/LOW, etc. Pour l’instant l’étape Security est **clôturée** côté mise en place et documentation.
