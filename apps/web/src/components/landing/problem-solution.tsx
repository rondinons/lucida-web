import { Container, Eyebrow } from "../ui/container";
import { Reveal } from "../ui/reveal";

const SCATTERED_TOOLS = [
  { label: "Agenda", tool: "Google Calendar" },
  { label: "Mensajes", tool: "WhatsApp" },
  { label: "Seguimiento", tool: "Notas / documentos" },
  { label: "Pagos", tool: "Planillas" },
];

export function ProblemSolution() {
  return (
    <section className="bg-white py-24 lg:py-40">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow>Tu día hoy</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-brand-ink sm:text-[44px]">
            Tu práctica no debería vivir
            <br />
            en cinco lugares distintos.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          {SCATTERED_TOOLS.map((item, i) => (
            <Reveal key={item.label} delay={i * 80} className="w-full sm:w-auto">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="w-full rounded-card border border-dashed border-brand-border bg-brand-bg px-6 py-5 text-center sm:w-44">
                  <p className="text-sm font-semibold text-brand-ink">{item.label}</p>
                  <p className="mt-1 text-sm text-brand-gray">{item.tool}</p>
                </div>
                {i < SCATTERED_TOOLS.length - 1 ? (
                  <span className="hidden text-brand-border sm:inline" aria-hidden="true">
                    +
                  </span>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-center gap-4">
          <span className="text-2xl text-brand-primary" aria-hidden="true">
            ↓
          </span>
          <div className="rounded-card bg-brand-primary px-8 py-5 text-center shadow-float">
            <p className="text-lg font-semibold text-white sm:text-xl">Todo conectado en Lúcida.</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
