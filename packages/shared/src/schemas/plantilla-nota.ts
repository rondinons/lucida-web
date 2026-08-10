import { z } from "zod";

export const preguntaPlantillaNotaSchema = z.object({
  texto: z.string().trim().min(1).max(300),
});

export const reordenarPreguntasPlantillaSchema = z.object({
  // ids en el nuevo orden deseado, de principio a fin
  ids: z.array(z.string().cuid()).min(1),
});

export type PreguntaPlantillaNotaInput = z.infer<typeof preguntaPlantillaNotaSchema>;
export type ReordenarPreguntasPlantillaInput = z.infer<typeof reordenarPreguntasPlantillaSchema>;
