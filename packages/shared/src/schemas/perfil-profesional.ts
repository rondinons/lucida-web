import { z } from "zod";
import { COUNTRY_CODES } from "../countries";

export const perfilProfesionalSchema = z.object({
  especialidad: z.string().trim().min(1).max(120).optional(),
  bio: z.string().trim().max(2000).optional(),
  fiscalId: z.string().trim().min(1).max(20).optional(),
  telefono: z.string().trim().min(1).max(20).optional(), // validado con libphonenumber-js en el form
  countryCode: z.enum(COUNTRY_CODES),
});

export type PerfilProfesionalInput = z.infer<typeof perfilProfesionalSchema>;
