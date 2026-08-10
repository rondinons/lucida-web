import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { PerfilesService } from "../perfiles/perfiles.service";
import type { RecordatoriosInput } from "@lucida/shared";

@Injectable()
export class RecordatoriosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly perfiles: PerfilesService,
  ) {}

  async obtener(usuarioId: string) {
    const perfil = await this.perfiles.getByUsuarioId(usuarioId);
    return {
      activos: perfil?.recordatoriosActivos ?? false,
      diasAnticipacion: perfil?.recordatoriosDiasAnticipacion ?? [],
    };
  }

  async actualizar(usuarioId: string, input: RecordatoriosInput) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    const perfil = await this.prisma.client.perfilProfesional.update({
      where: { id: profesionalId },
      data: {
        recordatoriosActivos: input.activos,
        recordatoriosDiasAnticipacion: input.diasAnticipacion,
      },
    });
    return { activos: perfil.recordatoriosActivos, diasAnticipacion: perfil.recordatoriosDiasAnticipacion };
  }
}
