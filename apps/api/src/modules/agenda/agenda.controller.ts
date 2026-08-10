import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { actualizarEstadoSesionSchema, actualizarMetodosPagoSesionSchema, crearSesionSchema } from "@lucida/shared";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { AgendaService } from "./agenda.service";

@UseGuards(JwtAuthGuard)
@Controller("sesiones")
export class AgendaController {
  constructor(private readonly agenda: AgendaService) {}

  @Get()
  listar(
    @CurrentUser() user: AuthenticatedUser,
    @Query("desde") desde?: string,
    @Query("hasta") hasta?: string,
  ) {
    return this.agenda.listar(user.userId, desde, hasta);
  }

  @Post()
  crear(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(crearSesionSchema)) body: ReturnType<typeof crearSesionSchema.parse>,
  ) {
    return this.agenda.crear(user.userId, body);
  }

  @Put(":id/estado")
  actualizarEstado(
    @CurrentUser() user: AuthenticatedUser,
    @Param("id") id: string,
    @Body(new ZodValidationPipe(actualizarEstadoSesionSchema))
    body: ReturnType<typeof actualizarEstadoSesionSchema.parse>,
  ) {
    return this.agenda.actualizarEstado(user.userId, id, body);
  }

  @Put(":id/metodos-pago")
  actualizarMetodosPago(
    @CurrentUser() user: AuthenticatedUser,
    @Param("id") id: string,
    @Body(new ZodValidationPipe(actualizarMetodosPagoSesionSchema))
    body: ReturnType<typeof actualizarMetodosPagoSesionSchema.parse>,
  ) {
    return this.agenda.actualizarMetodosPago(user.userId, id, body);
  }
}
