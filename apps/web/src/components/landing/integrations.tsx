import Image from "next/image";
import { Container, Eyebrow } from "../ui/container";
import { Chip } from "../ui/chip";
import { Reveal } from "../ui/reveal";

const INTEGRATIONS = [
  { name: "Google Calendar", src: "/brand/google-calendar.png" },
  { name: "Google Meet", src: "/brand/google-meet.png" },
  { name: "Mercado Pago", src: "/brand/mercado-pago.svg" },
];

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

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          {INTEGRATIONS.map((item, i) => (
            <Reveal key={item.name} delay={i * 80}>
              <div className="flex animate-tech-float items-center gap-3 rounded-card border border-brand-border bg-white px-5 py-4 shadow-float">
                <Image src={item.src} alt="" width={32} height={32} className="h-8 w-8 shrink-0" />
                <span className="text-base font-medium text-brand-gray">{item.name}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220} className="mt-8 flex flex-col items-center gap-3">
          <Chip>Integraciones previstas</Chip>
          <p className="max-w-md text-sm text-brand-gray">
            Se incorporarán progresivamente luego de su validación técnica y funcional.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
