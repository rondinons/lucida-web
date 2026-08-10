import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { facturacionConfigSchema } from "@lucida/shared";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { FacturacionService } from "./facturacion.service";

@UseGuards(JwtAuthGuard)
@Controller("facturacion")
export class FacturacionController {
  constructor(private readonly facturacion: FacturacionService) {}

  @Get()
  obtener(@CurrentUser() user: AuthenticatedUser) {
    return this.facturacion.obtener(user.userId);
  }

  @Put()
  actualizar(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(facturacionConfigSchema)) body: ReturnType<typeof facturacionConfigSchema.parse>,
  ) {
    return this.facturacion.actualizar(user.userId, body);
  }
}
