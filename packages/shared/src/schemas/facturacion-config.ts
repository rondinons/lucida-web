import { z } from "zod";

export const ESTADOS_CERTIFICADO_FISCAL = ["PENDIENTE", "CARGADO", "VENCIDO"] as const;

// KAN-25. La integración real con Mercado Pago y AFIP/SII llega en Fase 4
// (ver roadmap); acá solo se refleja el estado para la pantalla de
// configuración: qué falta, no cómo se resuelve.
export const facturacionConfigSchema = z.object({
  mercadoPagoConectado: z.boolean(),
});

export type FacturacionConfigInput = z.infer<typeof facturacionConfigSchema>;
