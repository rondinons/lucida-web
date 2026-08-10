import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { PerfilesService } from "../perfiles/perfiles.service";
import type { ActualizarConsultorioInput, ConsultorioInput } from "@lucida/shared";

@Injectable()
export class ConsultoriosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly perfiles: PerfilesService,
  ) {}

  private async assertPropio(profesionalId: string, consultorioId: string) {
    const consultorio = await this.prisma.client.consultorio.findUnique({
      where: { id: consultorioId },
      select: { profesionalId: true },
    });
    if (!consultorio || consultorio.profesionalId !== profesionalId) {
      throw new ForbiddenException("El consultorio no pertenece al profesional");
    }
  }

  async listar(usuarioId: string) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    return this.prisma.client.consultorio.findMany({
      where: { profesionalId },
      orderBy: { createdAt: "asc" },
    });
  }

  async crear(usuarioId: string, input: ConsultorioInput) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    return this.prisma.client.consultorio.create({
      data: { ...input, profesionalId },
    });
  }

  async editar(usuarioId: string, consultorioId: string, input: ActualizarConsultorioInput) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    await this.assertPropio(profesionalId, consultorioId);
    return this.prisma.client.consultorio.update({ where: { id: consultorioId }, data: input });
  }

  async eliminar(usuarioId: string, consultorioId: string) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    await this.assertPropio(profesionalId, consultorioId);
    await this.prisma.client.consultorio.delete({ where: { id: consultorioId } });
  }
}
