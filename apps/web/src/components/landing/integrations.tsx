import { Container, Eyebrow } from "../ui/container";
import { Chip } from "../ui/chip";
import { Reveal } from "../ui/reveal";

const INTEGRATIONS = ["Google Calendar", "Google Meet", "Mercado Pago"];

export function Integrations() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container className="flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <Eyebrow>Pensada para conectarse</Eyebrow>
          <h2 className="mt-4 max-w-xl text-2xl font-semibold leading-snug text-brand-ink sm:text-[32px]">
            Lúcida también está pensada para convivir con las herramientas que ya utilizás.
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-base font-medium text-brand-gray">
          {INTEGRATIONS.map((name, i) => (
            <span key={name} className="flex items-center gap-8">
              {name}
              {i < INTEGRATIONS.length - 1 ? <span className="text-brand-border">·</span> : null}
            </span>
          ))}
        </Reveal>

        <Reveal delay={160} className="mt-6 flex flex-col items-center gap-3">
          <Chip>Integraciones previstas</Chip>
          <p className="max-w-md text-sm text-brand-gray">
            Se incorporarán progresivamente luego de su validación técnica y funcional.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
