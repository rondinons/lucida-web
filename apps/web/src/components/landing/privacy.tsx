import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";

const POINTS = [
  {
    title: "Acceso protegido",
    body: "Tu espacio está asociado a tu cuenta profesional.",
  },
  {
    title: "Información independiente",
    body: "Cada profesional trabaja dentro de su propio espacio.",
  },
  {
    title: "Transparencia",
    body: "Antes de iniciar pruebas con información real vas a conocer claramente las condiciones de uso y tratamiento de datos.",
  },
];

export function Privacy() {
  return (
    <section id="privacidad" className="scroll-mt-24 bg-brand-dark py-24 text-white lg:py-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-white/70">
            Privacidad desde el diseño
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-[44px]">
            La información de tu práctica merece cuidado.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Lúcida se diseña desde el inicio considerando que trabajás con información profesional
            sensible. La privacidad, el control de acceso y la transparencia forman parte de las
            decisiones del producto.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {POINTS.map((point, i) => (
            <Reveal key={point.title} delay={i * 100} className="text-center sm:text-left">
              <h3 className="text-lg font-semibold">{point.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-white/75">{point.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
