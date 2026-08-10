import { z } from "zod";

// KAN-24. "Plazos habilitados" (Definiciones pendientes del doc de HU): por
// ahora se admite 1, 2, 3, 7 o 14 días de anticipación, elegibles en conjunto.
export const PLAZOS_RECORDATORIO = [1, 2, 3, 7, 14] as const;

export const recordatoriosSchema = z.object({
  activos: z.boolean(),
  diasAnticipacion: z.array(z.number().int().refine((d) => (PLAZOS_RECORDATORIO as readonly number[]).includes(d))),
});

export type RecordatoriosInput = z.infer<typeof recordatoriosSchema>;
