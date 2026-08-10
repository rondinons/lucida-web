import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { PerfilesService } from "../perfiles/perfiles.service";
import type {
  ActualizarEstadoSesionInput,
  ActualizarMetodosPagoSesionInput,
  CrearSesionInput,
} from "@lucida/shared";

@Injectable()
export class AgendaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly perfiles: PerfilesService,
  ) {}

  // Fase 1: agenda básica, sin sync con Google Calendar/Outlook todavía
  // (eso se suma en Fase 2 vía un módulo aparte que escucha estos mismos
  // eventos de creación/edición).
  async listar(usuarioId: string, desde?: string, hasta?: string) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    return this.prisma.client.sesion.findMany({
      where: {
        profesionalId,
        ...(desde || hasta
          ? {
              startAt: {
                ...(desde ? { gte: new Date(desde) } : {}),
                ...(hasta ? { lte: new Date(hasta) } : {}),
              },
            }
          : {}),
      },
      include: { consultorio: true, tipoSesion: true, paciente: true },
      orderBy: { startAt: "asc" },
    });
  }

  async crear(usuarioId: string, input: CrearSesionInput) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);

    const [consultorio, tipoSesion] = await Promise.all([
      this.prisma.client.consultorio.findUnique({ where: { id: input.consultorioId } }),
      this.prisma.client.tipoSesion.findUnique({ where: { id: input.tipoSesionId } }),
    ]);

    if (!consultorio || !tipoSesion || consultorio.profesionalId !== profesionalId || tipoSesion.profesionalId !== profesionalId) {
      throw new ForbiddenException("El consultorio o tipo de sesión no pertenece al profesional");
    }

    if (input.pacienteId) {
      const paciente = await this.prisma.client.paciente.findUnique({ where: { id: input.pacienteId } });
      if (paciente?.profesionalId !== profesionalId) {
        throw new ForbiddenException("El paciente no pertenece al profesional");
      }
    }

    // KAN-36: si el turno no especifica métodos de pago, hereda los del tipo de sesión.
    const metodosPago = input.metodosPago ?? tipoSesion.metodosPago;

    return this.prisma.client.sesion.create({ data: { ...input, metodosPago, profesionalId } });
  }

  async actualizarMetodosPago(usuarioId: string, sesionId: string, input: ActualizarMetodosPagoSesionInput) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    const sesion = await this.prisma.client.sesion.findUnique({ where: { id: sesionId } });
    if (sesion?.profesionalId !== profesionalId) {
      throw new ForbiddenException("La sesión no pertenece al profesional");
    }
    return this.prisma.client.sesion.update({ where: { id: sesionId }, data: input });
  }

  async actualizarEstado(usuarioId: string, sesionId: string, input: ActualizarEstadoSesionInput) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    const sesion = await this.prisma.client.sesion.findUnique({ where: { id: sesionId } });
    if (sesion?.profesionalId !== profesionalId) {
      throw new ForbiddenException("La sesión no pertenece al profesional");
    }
    return this.prisma.client.sesion.update({ where: { id: sesionId }, data: input });
  }
}
