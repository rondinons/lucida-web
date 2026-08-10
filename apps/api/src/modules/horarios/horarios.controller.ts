import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { actualizarHorarioSchema, horarioSchema } from "@lucida/shared";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { HorariosService } from "./horarios.service";

@UseGuards(JwtAuthGuard)
@Controller("horarios")
export class HorariosController {
  constructor(private readonly horarios: HorariosService) {}

  @Get()
  listar(@CurrentUser() user: AuthenticatedUser, @Query("consultorioId") consultorioId: string) {
    return this.horarios.listarPorConsultorio(user.userId, consultorioId);
  }

  @Post()
  crear(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(horarioSchema)) body: ReturnType<typeof horarioSchema.parse>,
  ) {
    return this.horarios.crear(user.userId, body);
  }

  @Put(":id")
  editar(
    @CurrentUser() user: AuthenticatedUser,
    @Param("id") id: string,
    @Body(new ZodValidationPipe(actualizarHorarioSchema)) body: ReturnType<typeof actualizarHorarioSchema.parse>,
  ) {
    return this.horarios.editar(user.userId, id, body);
  }

  @Delete(":id")
  @HttpCode(204)
  eliminar(@CurrentUser() user: AuthenticatedUser, @Param("id") id: string) {
    return this.horarios.eliminar(user.userId, id);
  }
}
