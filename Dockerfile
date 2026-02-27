# =============================================================================
# Stage 1: Dépendances
# Installe uniquement les dépendances (cache exploitable par Docker)
# =============================================================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# =============================================================================
# Stage 2: Build
# Compile l'application Next.js (output standalone pour image légère)
# =============================================================================
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build sans variables GitHub Pages pour obtenir le mode standalone.
# DOCKER_BUILD=1 évite que @cloudflare/next-on-pages lance workerd (absent dans l'image).
ENV NEXT_TELEMETRY_DISABLED=1
ENV GITHUB_PAGES=
ENV DOCKER_BUILD=1
RUN npm run build

# =============================================================================
# Stage 3: Runner (image de production)
# Image minimale avec uniquement le runtime nécessaire
# =============================================================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copie du build standalone (server.js + .next minimal + node_modules réduits)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
