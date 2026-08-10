# Build context must be the monorepo root (not apps/api) — this image needs
# packages/shared and packages/database to build @lucida/api. On Railway/Render,
# set Root Directory to the repo root and Dockerfile Path to apps/api/Dockerfile.
FROM node:20-slim AS base
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/database/package.json packages/database/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm --filter @lucida/database db:generate
RUN pnpm turbo run build --filter=@lucida/api...

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /app /app
EXPOSE 4000
# prisma migrate deploy is idempotent — safe to run on every boot.
CMD ["sh", "-c", "pnpm --filter @lucida/database exec prisma migrate deploy && node apps/api/dist/main.js"]
