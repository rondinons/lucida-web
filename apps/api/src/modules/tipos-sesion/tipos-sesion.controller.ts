import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { actualizarTipoSesionSchema, tipoSesionSchema } from "@lucida/shared";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { TiposSesionService } from "./tipos-sesion.service";

@UseGuards(JwtAuthGuard)
@Controller("tipos-sesion")
export class TiposSesionController {
  constructor(private readonly tiposSesion: TiposSesionService) {}

  @Get()
  listar(@CurrentUser() user: AuthenticatedUser, @Query("q") q?: string) {
    return this.tiposSesion.listar(user.userId, q);
  }

  @Post()
  crear(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(tipoSesionSchema)) body: ReturnType<typeof tipoSesionSchema.parse>,
  ) {
    return this.tiposSesion.crear(user.userId, body);
  }

  @Put(":id")
  editar(
    @CurrentUser() user: AuthenticatedUser,
    @Param("id") id: string,
    @Body(new ZodValidationPipe(actualizarTipoSesionSchema)) body: ReturnType<typeof actualizarTipoSesionSchema.parse>,
  ) {
    return this.tiposSesion.editar(user.userId, id, body);
  }

  @Delete(":id")
  @HttpCode(204)
  eliminar(@CurrentUser() user: AuthenticatedUser, @Param("id") id: string) {
    return this.tiposSesion.eliminar(user.userId, id);
  }
}
