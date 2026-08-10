import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { PerfilesService } from "../perfiles/perfiles.service";
import type { ActualizarTipoSesionInput, TipoSesionInput } from "@lucida/shared";

@Injectable()
export class TiposSesionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly perfiles: PerfilesService,
  ) {}

  private async assertPropio(profesionalId: string, tipoSesionId: string) {
    const tipoSesion = await this.prisma.client.tipoSesion.findUnique({
      where: { id: tipoSesionId },
      select: { profesionalId: true },
    });
    if (!tipoSesion || tipoSesion.profesionalId !== profesionalId) {
      throw new ForbiddenException("El tipo de sesión no pertenece al profesional");
    }
  }

  async listar(usuarioId: string, busqueda?: string) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    return this.prisma.client.tipoSesion.findMany({
      where: {
        profesionalId,
        activo: true,
        ...(busqueda ? { nombre: { contains: busqueda, mode: "insensitive" } } : {}),
      },
    });
  }

  async crear(usuarioId: string, input: TipoSesionInput) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    return this.prisma.client.tipoSesion.create({ data: { ...input, profesionalId } });
  }

  async editar(usuarioId: string, tipoSesionId: string, input: ActualizarTipoSesionInput) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    await this.assertPropio(profesionalId, tipoSesionId);
    return this.prisma.client.tipoSesion.update({ where: { id: tipoSesionId }, data: input });
  }

  // Baja lógica: un tipo de sesión puede estar referenciado por turnos ya
  // creados (Sesion.tipoSesionId), así que se desactiva en vez de borrarse.
  async eliminar(usuarioId: string, tipoSesionId: string) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    await this.assertPropio(profesionalId, tipoSesionId);
    await this.prisma.client.tipoSesion.update({ where: { id: tipoSesionId }, data: { activo: false } });
  }
}
