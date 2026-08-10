-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('PROFESIONAL', 'ASISTENTE');

-- CreateEnum
CREATE TYPE "ProveedorOAuth" AS ENUM ('GOOGLE', 'MICROSOFT');

-- CreateEnum
CREATE TYPE "RecursoPermiso" AS ENUM ('AGENDA', 'PACIENTES', 'COBROS', 'CONFIGURACION', 'INFORMACION_CLINICA');

-- CreateEnum
CREATE TYPE "EstadoCertificadoFiscal" AS ENUM ('PENDIENTE', 'CARGADO', 'VENCIDO');

-- CreateEnum
CREATE TYPE "DiaSemana" AS ENUM ('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO');

-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('EFECTIVO', 'TRANSFERENCIA', 'MERCADO_PAGO', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoSesion" AS ENUM ('PROGRAMADA', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA', 'AUSENTE');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "rol" "Rol" NOT NULL DEFAULT 'PROFESIONAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cuentas_oauth" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "proveedor" "ProveedorOAuth" NOT NULL,
    "proveedorCuentaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cuentas_oauth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permisos" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "recurso" "RecursoPermiso" NOT NULL,
    "puedeVer" BOOLEAN NOT NULL DEFAULT false,
    "puedeEditar" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "permisos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country_config" (
    "countryCode" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "fiscalIdLabel" TEXT NOT NULL,
    "fiscalIdRegex" TEXT NOT NULL,
    "defaultCurrency" TEXT NOT NULL,
    "timezoneDefault" TEXT NOT NULL,
    "phonePrefix" TEXT NOT NULL,
    "billingAdapter" TEXT NOT NULL,
    "dataProtectionLaw" TEXT NOT NULL,

    CONSTRAINT "country_config_pkey" PRIMARY KEY ("countryCode")
);

-- CreateTable
CREATE TABLE "perfiles_profesionales" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "especialidad" TEXT,
    "bio" TEXT,
    "fiscalId" TEXT,
    "telefono" TEXT,
    "countryCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recordatoriosActivos" BOOLEAN NOT NULL DEFAULT false,
    "recordatoriosDiasAnticipacion" INTEGER[] DEFAULT ARRAY[1]::INTEGER[],
    "mercadoPagoConectado" BOOLEAN NOT NULL DEFAULT false,
    "certificadoFiscalEstado" "EstadoCertificadoFiscal",

    CONSTRAINT "perfiles_profesionales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultorios" (
    "id" TEXT NOT NULL,
    "profesionalId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT,
    "esVirtual" BOOLEAN NOT NULL DEFAULT false,
    "timezone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultorios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horarios" (
    "id" TEXT NOT NULL,
    "consultorioId" TEXT NOT NULL,
    "diaSemana" "DiaSemana" NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "horarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_sesion" (
    "id" TEXT NOT NULL,
    "profesionalId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "duracionMinutos" INTEGER NOT NULL,
    "precio" DECIMAL(12,2) NOT NULL,
    "moneda" TEXT NOT NULL,
    "metodosPago" "MetodoPago"[],
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "tipos_sesion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preguntas_plantilla_nota" (
    "id" TEXT NOT NULL,
    "profesionalId" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "preguntas_plantilla_nota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" TEXT NOT NULL,
    "profesionalId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT,
    "telefono" TEXT,
    "consentimientoEn" TIMESTAMP(3),
    "consentimientoVersion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sesiones" (
    "id" TEXT NOT NULL,
    "profesionalId" TEXT NOT NULL,
    "consultorioId" TEXT NOT NULL,
    "tipoSesionId" TEXT NOT NULL,
    "pacienteId" TEXT,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "metodosPago" "MetodoPago"[],
    "estado" "EstadoSesion" NOT NULL DEFAULT 'PROGRAMADA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sesiones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profesion" TEXT NOT NULL,
    "aceptaContacto" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "cuentas_oauth_usuarioId_idx" ON "cuentas_oauth"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "cuentas_oauth_proveedor_proveedorCuentaId_key" ON "cuentas_oauth"("proveedor", "proveedorCuentaId");

-- CreateIndex
CREATE UNIQUE INDEX "permisos_usuarioId_recurso_key" ON "permisos"("usuarioId", "recurso");

-- CreateIndex
CREATE UNIQUE INDEX "perfiles_profesionales_usuarioId_key" ON "perfiles_profesionales"("usuarioId");

-- CreateIndex
CREATE INDEX "consultorios_profesionalId_idx" ON "consultorios"("profesionalId");

-- CreateIndex
CREATE INDEX "horarios_consultorioId_idx" ON "horarios"("consultorioId");

-- CreateIndex
CREATE INDEX "tipos_sesion_profesionalId_idx" ON "tipos_sesion"("profesionalId");

-- CreateIndex
CREATE INDEX "preguntas_plantilla_nota_profesionalId_orden_idx" ON "preguntas_plantilla_nota"("profesionalId", "orden");

-- CreateIndex
CREATE INDEX "pacientes_profesionalId_idx" ON "pacientes"("profesionalId");

-- CreateIndex
CREATE INDEX "sesiones_profesionalId_startAt_idx" ON "sesiones"("profesionalId", "startAt");

-- CreateIndex
CREATE INDEX "sesiones_consultorioId_startAt_idx" ON "sesiones"("consultorioId", "startAt");

-- CreateIndex
CREATE INDEX "leads_createdAt_idx" ON "leads"("createdAt");

-- AddForeignKey
ALTER TABLE "cuentas_oauth" ADD CONSTRAINT "cuentas_oauth_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permisos" ADD CONSTRAINT "permisos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfiles_profesionales" ADD CONSTRAINT "perfiles_profesionales_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfiles_profesionales" ADD CONSTRAINT "perfiles_profesionales_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "country_config"("countryCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultorios" ADD CONSTRAINT "consultorios_profesionalId_fkey" FOREIGN KEY ("profesionalId") REFERENCES "perfiles_profesionales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_consultorioId_fkey" FOREIGN KEY ("consultorioId") REFERENCES "consultorios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tipos_sesion" ADD CONSTRAINT "tipos_sesion_profesionalId_fkey" FOREIGN KEY ("profesionalId") REFERENCES "perfiles_profesionales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preguntas_plantilla_nota" ADD CONSTRAINT "preguntas_plantilla_nota_profesionalId_fkey" FOREIGN KEY ("profesionalId") REFERENCES "perfiles_profesionales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_profesionalId_fkey" FOREIGN KEY ("profesionalId") REFERENCES "perfiles_profesionales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesiones" ADD CONSTRAINT "sesiones_profesionalId_fkey" FOREIGN KEY ("profesionalId") REFERENCES "perfiles_profesionales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesiones" ADD CONSTRAINT "sesiones_consultorioId_fkey" FOREIGN KEY ("consultorioId") REFERENCES "consultorios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesiones" ADD CONSTRAINT "sesiones_tipoSesionId_fkey" FOREIGN KEY ("tipoSesionId") REFERENCES "tipos_sesion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesiones" ADD CONSTRAINT "sesiones_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

