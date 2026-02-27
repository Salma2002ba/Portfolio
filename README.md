# Portfolio

[![CI](https://github.com/Salma2002ba/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Salma2002ba/Portfolio/actions/workflows/ci.yml)
[![Security](https://github.com/Salma2002ba/Portfolio/actions/workflows/security.yml/badge.svg)](https://github.com/Salma2002ba/Portfolio/actions/workflows/security.yml)

Next.js 15 + TypeScript + Tailwind. Contenu éditable dans `src/data/profile.ts`.

```bash
npm install
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

**Déploiement :** https://salma2002ba.github.io/Portfolio/

**Security (local)** — scan image et SBOM : voir [docs/04-security.md](docs/04-security.md). Exemple :
```bash
docker build -t portfolio:latest .
trivy image --exit-code 1 --severity CRITICAL,HIGH portfolio:latest
syft portfolio:latest -o spdx-json=sbom.spdx.json
```