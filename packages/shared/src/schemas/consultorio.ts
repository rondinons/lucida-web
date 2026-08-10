import { z } from "zod";

export const consultorioSchema = z.object({
  nombre: z.string().trim().min(1).max(120),
  direccion: z.string().trim().max(300).optional(),
  esVirtual: z.boolean().default(false),
  timezone: z.string().trim().min(1), // IANA tz, ej. "America/Argentina/Buenos_Aires"
});

export const actualizarConsultorioSchema = consultorioSchema.partial();

export type ConsultorioInput = z.infer<typeof consultorioSchema>;
export type ActualizarConsultorioInput = z.infer<typeof actualizarConsultorioSchema>;
