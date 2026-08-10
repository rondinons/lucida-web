import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { PerfilesService } from "../perfiles/perfiles.service";
import type { PacienteInput } from "@lucida/shared";

// Versión mínima: sin datos clínicos. Ver sección 5 del documento de
// arquitectura — eso vive cifrado E2E, fuera de este esquema, desde Fase 3.
@Injectable()
export class PacientesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly perfiles: PerfilesService,
  ) {}

  async listar(usuarioId: string, busqueda?: string) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    return this.prisma.client.paciente.findMany({
      where: {
        profesionalId,
        ...(busqueda ? { nombre: { contains: busqueda, mode: "insensitive" } } : {}),
      },
      orderBy: { nombre: "asc" },
    });
  }

  async crear(usuarioId: string, input: PacienteInput) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    return this.prisma.client.paciente.create({ data: { ...input, profesionalId } });
  }
}
