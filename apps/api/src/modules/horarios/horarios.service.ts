import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { PerfilesService } from "../perfiles/perfiles.service";
import type { ActualizarHorarioInput, HorarioInput } from "@lucida/shared";

@Injectable()
export class HorariosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly perfiles: PerfilesService,
  ) {}

  private async assertConsultorioPropio(profesionalId: string, consultorioId: string) {
    const consultorio = await this.prisma.client.consultorio.findUnique({
      where: { id: consultorioId },
      select: { profesionalId: true },
    });
    if (!consultorio || consultorio.profesionalId !== profesionalId) {
      throw new ForbiddenException("El consultorio no pertenece al profesional");
    }
  }

  async listarPorConsultorio(usuarioId: string, consultorioId: string) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    await this.assertConsultorioPropio(profesionalId, consultorioId);
    return this.prisma.client.horario.findMany({ where: { consultorioId } });
  }

  async crear(usuarioId: string, input: HorarioInput) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    await this.assertConsultorioPropio(profesionalId, input.consultorioId);
    return this.prisma.client.horario.create({ data: input });
  }

  private async assertHorarioPropio(profesionalId: string, horarioId: string) {
    const horario = await this.prisma.client.horario.findUnique({
      where: { id: horarioId },
      select: { consultorio: { select: { profesionalId: true } } },
    });
    if (!horario || horario.consultorio.profesionalId !== profesionalId) {
      throw new ForbiddenException("El horario no pertenece al profesional");
    }
  }

  async editar(usuarioId: string, horarioId: string, input: ActualizarHorarioInput) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    await this.assertHorarioPropio(profesionalId, horarioId);
    return this.prisma.client.horario.update({ where: { id: horarioId }, data: input });
  }

  async eliminar(usuarioId: string, horarioId: string) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    await this.assertHorarioPropio(profesionalId, horarioId);
    await this.prisma.client.horario.delete({ where: { id: horarioId } });
  }
}
