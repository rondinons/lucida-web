import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { preguntaPlantillaNotaSchema, reordenarPreguntasPlantillaSchema } from "@lucida/shared";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { PlantillasNotasService } from "./plantillas-notas.service";

@UseGuards(JwtAuthGuard)
@Controller("plantilla-notas")
export class PlantillasNotasController {
  constructor(private readonly plantillas: PlantillasNotasService) {}

  @Get()
  listar(@CurrentUser() user: AuthenticatedUser) {
    return this.plantillas.listar(user.userId);
  }

  @Post()
  crear(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(preguntaPlantillaNotaSchema)) body: ReturnType<typeof preguntaPlantillaNotaSchema.parse>,
  ) {
    return this.plantillas.crear(user.userId, body);
  }

  @Put("reordenar")
  reordenar(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(reordenarPreguntasPlantillaSchema))
    body: ReturnType<typeof reordenarPreguntasPlantillaSchema.parse>,
  ) {
    return this.plantillas.reordenar(user.userId, body.ids);
  }

  @Post("restablecer")
  restablecer(@CurrentUser() user: AuthenticatedUser) {
    return this.plantillas.restablecerPredeterminadas(user.userId);
  }

  @Put(":id")
  editar(
    @CurrentUser() user: AuthenticatedUser,
    @Param("id") id: string,
    @Body(new ZodValidationPipe(preguntaPlantillaNotaSchema)) body: ReturnType<typeof preguntaPlantillaNotaSchema.parse>,
  ) {
    return this.plantillas.editar(user.userId, id, body);
  }

  @Delete(":id")
  @HttpCode(204)
  eliminar(@CurrentUser() user: AuthenticatedUser, @Param("id") id: string) {
    return this.plantillas.eliminar(user.userId, id);
  }
}
