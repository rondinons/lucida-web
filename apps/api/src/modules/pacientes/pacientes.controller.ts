import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { pacienteSchema } from "@lucida/shared";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { PacientesService } from "./pacientes.service";

@UseGuards(JwtAuthGuard)
@Controller("pacientes")
export class PacientesController {
  constructor(private readonly pacientes: PacientesService) {}

  @Get()
  listar(@CurrentUser() user: AuthenticatedUser, @Query("q") q?: string) {
    return this.pacientes.listar(user.userId, q);
  }

  @Post()
  crear(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(pacienteSchema)) body: ReturnType<typeof pacienteSchema.parse>,
  ) {
    return this.pacientes.crear(user.userId, body);
  }
}
