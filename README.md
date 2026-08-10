# Lúcida

Monorepo del producto Lúcida — agenda, notas clínicas cifradas E2E, cobros y facturación
para profesionales de salud mental en LATAM. Ver el documento de arquitectura completo
para el detalle de decisiones de diseño; este README cubre solo el setup local.

Alcance funcional: 12 épicas / 57 Historias de Usuario en Jira (proyecto KAN,
`LúcidaMente`). Ver `Lucida_Historias_de_Usuario_Completas.docx` para el detalle
completo por HU con criterios de aceptación.

Estado actual del código: Configuración profesional (perfil, consultorios, horarios,
tipos de sesión, plantilla de notas, recordatorios, facturación — entry points),
Agenda con vistas día/semana/mes y navegación, y el alta de turnos. Pendiente: ficha
integral de pacientes, notas de sesión (texto y pizarrón), cobros, notificaciones,
dashboard con datos reales, rol Asistente y el backoffice interno (Épica 12).

## Estructura

```
apps/
  web/          Next.js (App Router) + TS + Tailwind — frontend + Auth.js
  api/          NestJS — API, valida JWT emitido por apps/web
packages/
  database/     Esquema Prisma (Postgres) + cliente compartido
  shared/       Schemas Zod compartidos entre web y api
docker-compose.yml   Postgres local
```

## 1. Requisitos

- **Node.js 20 LTS** (hay un `.nvmrc` en la raíz)
- **pnpm** (vía Corepack, incluido con Node ≥ 16.9)
- **Docker** (para levantar Postgres local) — opcional si ya tenés un Postgres corriendo

Este entorno no tenía Node instalado. Para instalarlo en Windows:

```bash
winget install OpenJS.NodeJS.LTS
```

Después, habilitá pnpm con Corepack (ya viene con Node):

```bash
corepack enable
corepack prepare pnpm@9.7.0 --activate
```

Verificá:

```bash
node -v
pnpm -v
```

## 2. Instalar dependencias

Desde la raíz del monorepo:

```bash
pnpm install
```

`postinstall` corre `prisma generate` automáticamente. `packages/database` y
`packages/shared` se compilan a `dist/` antes de levantar las apps (`pnpm dev` y
`pnpm build` ya disparan ese build vía Turborepo) — si algo no resuelve
`@lucida/database` o `@lucida/shared`, corré `pnpm build` una vez a mano.

## 3. Base de datos

Levantar Postgres local:

```bash
docker compose up -d postgres
```

Copiar las variables de entorno de ejemplo:

```bash
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
```

Generar un `AUTH_SECRET` y pegarlo en **ambos** `.env` (tiene que ser idéntico en
`apps/web` y `apps/api` — es lo que permite a la API validar los JWT que emite el
frontend, ver `apps/web/src/lib/api-client.ts`):

```bash
npx auth secret
```

Correr las migraciones y el seed de `country_config` (Argentina, Chile, Uruguay,
México, Colombia, Perú — sección 11 del documento de arquitectura):

```bash
pnpm db:migrate
pnpm --filter @lucida/database db:seed
```

## 4. Credenciales OAuth (Google / Microsoft)

La app no maneja contraseñas — el login es solo "Continuar con Google" / "Continuar
con Microsoft". Hace falta crear credenciales OAuth y completar en `apps/web/.env`:

- **Google**: [Google Cloud Console](https://console.cloud.google.com/apis/credentials) →
  crear credencial OAuth 2.0 → tipo "Web application" → redirect URI
  `http://localhost:3000/api/auth/callback/google` → `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`.
- **Microsoft**: [Azure Portal](https://portal.azure.com) → App registrations → redirect URI
  `http://localhost:3000/api/auth/callback/microsoft-entra-id` →
  `AUTH_MICROSOFT_ID` / `AUTH_MICROSOFT_SECRET` / `AUTH_MICROSOFT_ISSUER`.

## 5. Levantar todo

```bash
pnpm dev
```

- Frontend: http://localhost:3000
- API: http://localhost:4000

## 6. Otros comandos útiles

```bash
pnpm --filter @lucida/database db:studio   # explorar la base con Prisma Studio
pnpm lint
pnpm type-check
pnpm build
```

## 7. Próximos pasos (roadmap)

Ver sección 10 del documento de arquitectura:

1. ~~Fase 1 — Núcleo~~ (en progreso)
2. Fase 2 — Sync con Google Calendar / Outlook, notificaciones por email (Resend)
3. Fase 3 — Notas clínicas cifradas E2E (libsodium, Argon2id)
4. Fase 4 — Cobros (MercadoPago) y facturación (AFIP / SII / adaptador interno)
5. Fase 5 — Rol Asistente con permisos granulares (el modelo `Permiso` ya existe en
   el esquema de Prisma desde Fase 1, listo para activarse)

## 8. Dominio e infraestructura

- Dominio: `lucida-app.com` (Cloudflare)
- Infraestructura objetivo: GCP (Cloud Run, Cloud SQL, Memorystore, Secret Manager) —
  ver sección 7 del documento de arquitectura. No configurada todavía en este repo.
