import { z } from "zod";

export const DIAS_SEMANA = [
  "LUNES",
  "MARTES",
  "MIERCOLES",
  "JUEVES",
  "VIERNES",
  "SABADO",
  "DOMINGO",
] as const;

const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // "HH:mm"

const horarioBaseSchema = z.object({
  consultorioId: z.string().cuid(),
  diaSemana: z.enum(DIAS_SEMANA),
  horaInicio: z.string().regex(horaRegex, "Formato esperado HH:mm"),
  horaFin: z.string().regex(horaRegex, "Formato esperado HH:mm"),
});

export const horarioSchema = horarioBaseSchema.refine((data) => data.horaInicio < data.horaFin, {
  message: "horaInicio debe ser anterior a horaFin",
  path: ["horaFin"],
});

export const actualizarHorarioSchema = horarioBaseSchema.partial().omit({ consultorioId: true });

export type HorarioInput = z.infer<typeof horarioSchema>;
export type ActualizarHorarioInput = z.infer<typeof actualizarHorarioSchema>;
