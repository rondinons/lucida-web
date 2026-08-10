import { z } from "zod";

// Formulario público de "Solicitar demo" en la landing — sin autenticación,
// sin datos clínicos. Ver punto 23 del documento de rediseño.
export const leadSchema = z.object({
  nombre: z.string().trim().min(1, "Ingresá tu nombre y apellido").max(200),
  email: z.string().trim().min(1, "Ingresá tu email").email("Ingresá un email válido"),
  profesion: z.string().trim().min(1, "Ingresá tu profesión").max(120),
  aceptaContacto: z.literal(true, {
    errorMap: () => ({ message: "Necesitamos tu autorización para continuar" }),
  }),
});

export type LeadInput = z.infer<typeof leadSchema>;
