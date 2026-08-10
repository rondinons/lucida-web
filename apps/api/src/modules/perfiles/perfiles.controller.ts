import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { perfilProfesionalSchema } from "@lucida/shared";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { PerfilesService } from "./perfiles.service";

@UseGuards(JwtAuthGuard)
@Controller("perfil")
export class PerfilesController {
  constructor(private readonly perfiles: PerfilesService) {}

  @Get()
  get(@CurrentUser() user: AuthenticatedUser) {
    return this.perfiles.getByUsuarioId(user.userId);
  }

  @Put()
  upsert(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(perfilProfesionalSchema)) body: ReturnType<typeof perfilProfesionalSchema.parse>,
  ) {
    return this.perfiles.upsert(user.userId, body);
  }
}
