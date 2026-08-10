import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { actualizarConsultorioSchema, consultorioSchema } from "@lucida/shared";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { ConsultoriosService } from "./consultorios.service";

@UseGuards(JwtAuthGuard)
@Controller("consultorios")
export class ConsultoriosController {
  constructor(private readonly consultorios: ConsultoriosService) {}

  @Get()
  listar(@CurrentUser() user: AuthenticatedUser) {
    return this.consultorios.listar(user.userId);
  }

  @Post()
  crear(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(consultorioSchema)) body: ReturnType<typeof consultorioSchema.parse>,
  ) {
    return this.consultorios.crear(user.userId, body);
  }

  @Put(":id")
  editar(
    @CurrentUser() user: AuthenticatedUser,
    @Param("id") id: string,
    @Body(new ZodValidationPipe(actualizarConsultorioSchema)) body: ReturnType<typeof actualizarConsultorioSchema.parse>,
  ) {
    return this.consultorios.editar(user.userId, id, body);
  }

  @Delete(":id")
  @HttpCode(204)
  eliminar(@CurrentUser() user: AuthenticatedUser, @Param("id") id: string) {
    return this.consultorios.eliminar(user.userId, id);
  }
}
