// Helper centralizado de eventos de conversión (punto 39 del plan de
// rediseño). Sin proveedor conectado todavía: solo loguea en consola en
// desarrollo. Cuando se defina el stack (GA4, Plausible, etc.) alcanza con
// reemplazar el cuerpo de esta función.
export type ConversionEvent =
  | "demo_cta_header"
  | "demo_cta_hero"
  | "demo_cta_middle"
  | "demo_cta_final"
  | "demo_form_start"
  | "demo_form_submit"
  | "whatsapp_click"
  | "faq_open"
  | "scroll_50"
  | "scroll_90";

export function trackEvent(event: ConversionEvent, payload?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[track]", event, payload ?? {});
  }
  // TODO: enviar a GA4/Plausible/etc. cuando se defina el proveedor.
}
