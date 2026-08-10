import { z } from "zod";

export const METODOS_PAGO = ["EFECTIVO", "TRANSFERENCIA", "MERCADO_PAGO", "OTRO"] as const;

export const tipoSesionSchema = z.object({
  nombre: z.string().trim().min(1).max(120),
  duracionMinutos: z.number().int().positive().max(480),
  precio: z.number().nonnegative(),
  moneda: z.string().length(3), // ISO 4217
  metodosPago: z.array(z.enum(METODOS_PAGO)).default([]),
  activo: z.boolean().default(true),
});

export const actualizarTipoSesionSchema = tipoSesionSchema.partial();

export type TipoSesionInput = z.infer<typeof tipoSesionSchema>;
export type ActualizarTipoSesionInput = z.infer<typeof actualizarTipoSesionSchema>;
