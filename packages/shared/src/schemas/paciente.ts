import { z } from "zod";

export const pacienteSchema = z.object({
  nombre: z.string().trim().min(1).max(200),
  email: z.string().trim().email().optional().or(z.literal("")),
  telefono: z.string().trim().min(1).max(20).optional(),
});

export type PacienteInput = z.infer<typeof pacienteSchema>;
