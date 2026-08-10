import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import type { PerfilProfesionalInput } from "@lucida/shared";

@Injectable()
export class PerfilesService {
  constructor(private readonly prisma: PrismaService) {}

  // Todos los módulos de dominio (consultorios, horarios, agenda, ...)
  // cuelgan de PerfilProfesional, no directamente de Usuario. Este helper
  // resuelve ese id a partir del usuarioId que viene en el JWT.
  async getPerfilIdOrThrow(usuarioId: string): Promise<string> {
    const perfil = await this.prisma.client.perfilProfesional.findUnique({
      where: { usuarioId },
      select: { id: true },
    });
    if (!perfil) {
      throw new NotFoundException("El profesional todavía no completó su perfil");
    }
    return perfil.id;
  }

  async getByUsuarioId(usuarioId: string) {
    return this.prisma.client.perfilProfesional.findUnique({
      where: { usuarioId },
      include: { country: true },
    });
  }

  async upsert(usuarioId: string, input: PerfilProfesionalInput) {
    return this.prisma.client.perfilProfesional.upsert({
      where: { usuarioId },
      create: { usuarioId, ...input },
      update: input,
    });
  }
}
