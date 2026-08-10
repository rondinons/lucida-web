import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { PerfilesService } from "../perfiles/perfiles.service";
import type { FacturacionConfigInput } from "@lucida/shared";

@Injectable()
export class FacturacionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly perfiles: PerfilesService,
  ) {}

  async obtener(usuarioId: string) {
    const perfil = await this.perfiles.getByUsuarioId(usuarioId);
    const datosFaltantes: string[] = [];
    if (!perfil?.fiscalId) datosFaltantes.push("fiscalId");
    if (!perfil?.telefono) datosFaltantes.push("telefono");

    return {
      datosFiscalesCompletos: datosFaltantes.length === 0,
      datosFaltantes,
      mercadoPagoConectado: perfil?.mercadoPagoConectado ?? false,
      certificadoFiscalEstado: perfil?.certificadoFiscalEstado ?? "PENDIENTE",
      // KAN-25: la app muestra el estado de la suscripción; su gestión real
      // (planes, pagos) vive en el backoffice interno (Épica 12, futuro).
      suscripcionEstado: "PRUEBA_GRATUITA",
    };
  }

  async actualizar(usuarioId: string, input: FacturacionConfigInput) {
    const profesionalId = await this.perfiles.getPerfilIdOrThrow(usuarioId);
    const perfil = await this.perfiles.getByUsuarioId(usuarioId);

    if (input.mercadoPagoConectado && !perfil?.fiscalId) {
      throw new BadRequestException("Completá tus datos fiscales antes de conectar Mercado Pago");
    }

    await this.prisma.client.perfilProfesional.update({
      where: { id: profesionalId },
      data: { mercadoPagoConectado: input.mercadoPagoConectado },
    });
    return this.obtener(usuarioId);
  }
}
