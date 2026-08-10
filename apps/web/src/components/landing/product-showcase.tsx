import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";
import { ProductMockup } from "./product-mockup";

const BLOCKS = [
  {
    variant: "agenda" as const,
    title: "Organizá tu día sin perder de vista nada importante.",
    body: "Turnos, disponibilidad y actividades desde una sola vista.",
  },
  {
    variant: "pacientes" as const,
    title: "Toda la información necesaria, cuando la necesitás.",
    body: "Datos principales y seguimiento organizados por paciente.",
  },
  {
    variant: "sesiones" as const,
    title: "Dale continuidad a cada proceso.",
    body: "Registrá cada encuentro y consultá fácilmente el recorrido.",
  },
  {
    variant: "pacientes" as const,
    title: "Mantené también lo administrativo bajo control.",
    body: "Seguimiento de cobros y tareas relacionadas con tu práctica.",
  },
];

export function ProductShowcase() {
  return (
    <section id="funcionalidades" className="scroll-mt-24 bg-white py-24 lg:py-40">
      <div id="producto" className="scroll-mt-24" />
      <Container className="flex flex-col gap-24 lg:gap-32">
        {BLOCKS.map((block, i) => (
          <Reveal
            key={block.title}
            className={`flex flex-col items-center gap-10 lg:flex-row lg:gap-16 ${
              i % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full lg:w-1/2">
              <ProductMockup variant={block.variant} />
            </div>
            <div className="w-full text-center lg:w-1/2 lg:text-left">
              <h3 className="text-2xl font-semibold leading-snug text-brand-ink sm:text-[28px]">
                {block.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-brand-gray">{block.body}</p>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
