import { Container, Eyebrow } from "../ui/container";
import { Reveal } from "../ui/reveal";
import { DemoForm } from "./demo-form";

const CHECKLIST = ["Recorrido por el producto", "Espacio para preguntas", "Sin compromiso"];

export function FinalCta() {
  return (
    <section id="demo" className="scroll-mt-24 bg-brand-bg py-24 lg:py-32">
      <Container className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="text-center lg:text-left">
          <Eyebrow>Conocé Lúcida</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-brand-ink sm:text-[44px]">
            ¿Querés ver cómo puede simplificar la gestión de tu consultorio?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-gray">
            Coordinemos una demo breve y personalizada.
          </p>
          <ul className="mt-7 flex flex-col items-center gap-2.5 lg:items-start">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-2 text-base text-brand-ink">
                <span className="text-brand-green" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="w-full">
          <DemoForm />
        </Reveal>
      </Container>
    </section>
  );
}
