import { Body, Controller, Post } from "@nestjs/common";
import { leadSchema } from "@lucida/shared";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { LeadsService } from "./leads.service";

// Endpoint público (sin JwtAuthGuard): lo llama el formulario "Solicitar
// demo" de la landing, antes de que exista una sesión de usuario.
@Controller("leads")
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Post()
  crear(@Body(new ZodValidationPipe(leadSchema)) body: ReturnType<typeof leadSchema.parse>) {
    return this.leads.crear(body);
  }
}
