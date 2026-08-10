import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { recordatoriosSchema } from "@lucida/shared";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { RecordatoriosService } from "./recordatorios.service";

@UseGuards(JwtAuthGuard)
@Controller("recordatorios")
export class RecordatoriosController {
  constructor(private readonly recordatorios: RecordatoriosService) {}

  @Get()
  obtener(@CurrentUser() user: AuthenticatedUser) {
    return this.recordatorios.obtener(user.userId);
  }

  @Put()
  actualizar(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(recordatoriosSchema)) body: ReturnType<typeof recordatoriosSchema.parse>,
  ) {
    return this.recordatorios.actualizar(user.userId, body);
  }
}
