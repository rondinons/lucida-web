import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

// Valida el body contra el mismo schema Zod que usa apps/web
// (@lucida/shared) — una sola definición de "qué es un Consultorio válido".
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(result.error.flatten());
    }
    return result.data;
  }
}
