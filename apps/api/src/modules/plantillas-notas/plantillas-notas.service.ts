import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { PerfilesService } from "../perfiles/perfiles.service";
import type { PreguntaPlantillaNotaInput } from "@lucida/shared";

const PREGUNTAS_PREDETERMINADAS = [
  "¿Cómo llegó el paciente a la sesión?",
  "Temas abordados durante la sesión",
  "Intervenciones realizadas",
  "Estado emocional observado",
  "Tareas o consignas para la próxima sesión",
  "Observaciones generales",
];

@Injectable()
export class PlantillasNotasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly perfiles: PerfilesService,
  ) {}

  private async assertPropia(profesionalId: string, preguntaId: string) {
    const pregunta = await this.prisma.client.preguntaPlantillaNota.findUnique({
      where: { id: preguntaId },
      select: { profesionalId: true },
    });
    if (!pregunta || pregunta.profesionalId !== profesionalId) {
      throw new ForbiddenException("La pregunta no pertenece al profesional");
    }
  }

  async listar(usuarioId: string) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    return this.prisma.client.preguntaPlantillaNota.findMany({
      where: { profesionalId },
      orderBy: { orden: "asc" },
    });
  }

  async crear(usuarioId: string, input: PreguntaPlantillaNotaInput) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    const ultima = await this.prisma.client.preguntaPlantillaNota.findFirst({
      where: { profesionalId },
      orderBy: { orden: "desc" },
    });
    return this.prisma.client.preguntaPlantillaNota.create({
      data: { ...input, profesionalId, orden: (ultima?.orden ?? -1) + 1 },
    });
  }

  async editar(usuarioId: string, preguntaId: string, input: PreguntaPlantillaNotaInput) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    await this.assertPropia(profesionalId, preguntaId);
    return this.prisma.client.preguntaPlantillaNota.update({ where: { id: preguntaId }, data: input });
  }

  async eliminar(usuarioId: string, preguntaId: string) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    await this.assertPropia(profesionalId, preguntaId);
    await this.prisma.client.preguntaPlantillaNota.delete({ where: { id: preguntaId } });
  }

  async reordenar(usuarioId: string, ids: string[]) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    await Promise.all(ids.map((id) => this.assertPropia(profesionalId, id)));
    await this.prisma.client.$transaction(
      ids.map((id, index) =>
        this.prisma.client.preguntaPlantillaNota.update({ where: { id }, data: { orden: index } }),
      ),
    );
    return this.listar(usuarioId);
  }

  async restablecerPredeterminadas(usuarioId: string) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    await this.prisma.client.$transaction([
      this.prisma.client.preguntaPlantillaNota.deleteMany({ where: { profesionalId } }),
      this.prisma.client.preguntaPlantillaNota.createMany({
        data: PREGUNTAS_PREDETERMINADAS.map((texto, orden) => ({ texto, orden, profesionalId })),
      }),
    ]);
    return this.listar(usuarioId);
  }
}
