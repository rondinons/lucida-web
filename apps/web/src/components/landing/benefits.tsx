import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";

const BENEFITS = [
  {
    title: "Encontrá todo más rápido",
    body: "Menos tiempo buscando información entre herramientas.",
  },
  {
    title: "Tené una visión clara de tu día",
    body: "Turnos, pacientes y pendientes visibles desde un mismo lugar.",
  },
  {
    title: "Conservá tu manera de trabajar",
    body: "Lúcida acompaña tu práctica sin imponer procesos innecesarios.",
  },
];

export function Benefits() {
  return (
    <section className="bg-brand-bg py-24 lg:py-32">
      <Container className="grid grid-cols-1 gap-12 text-center sm:grid-cols-3 sm:gap-8 sm:text-left">
        {BENEFITS.map((benefit, i) => (
          <Reveal key={benefit.title} delay={i * 100}>
            <h3 className="text-xl font-semibold text-brand-ink">{benefit.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-brand-gray">{benefit.body}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
