import { z } from "zod";
import { METODOS_PAGO } from "./tipo-sesion";

export const ESTADOS_SESION = [
  "PROGRAMADA",
  "CONFIRMADA",
  "CANCELADA",
  "COMPLETADA",
  "AUSENTE",
] as const;

export const crearSesionSchema = z
  .object({
    consultorioId: z.string().cuid(),
    tipoSesionId: z.string().cuid(),
    pacienteId: z.string().cuid().optional(),
    startAt: z.coerce.date(), // siempre UTC en el wire
    endAt: z.coerce.date(),
    // Si se omite, el backend copia los métodos configurados en el TipoSesion (KAN-36).
    metodosPago: z.array(z.enum(METODOS_PAGO)).optional(),
  })
  .refine((data) => data.startAt < data.endAt, {
    message: "startAt debe ser anterior a endAt",
    path: ["endAt"],
  });

export const actualizarEstadoSesionSchema = z.object({
  estado: z.enum(ESTADOS_SESION),
});

export const actualizarMetodosPagoSesionSchema = z.object({
  metodosPago: z.array(z.enum(METODOS_PAGO)),
});

export type CrearSesionInput = z.infer<typeof crearSesionSchema>;
export type ActualizarEstadoSesionInput = z.infer<typeof actualizarEstadoSesionSchema>;
export type ActualizarMetodosPagoSesionInput = z.infer<typeof actualizarMetodosPagoSesionSchema>;
