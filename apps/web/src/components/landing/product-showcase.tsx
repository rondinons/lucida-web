import Image from "next/image";
import { Container } from "../ui/container";
import { Reveal } from "../ui/reveal";
import { ResponsiveShot } from "./responsive-shot";

type Block = { alt: string; title: string; body: string } & (
  | { kind: "single"; src: string; width: number; height: number }
  | { kind: "responsive"; desktopSrc: string; mobileSrc: string }
);

const BLOCKS: Block[] = [
  {
    kind: "single",
    src: "/brand/lucida-agenda-mobile.png",
    alt: "Agenda de Lúcida en celular",
    width: 390,
    height: 920,
    title: "Organizá tu día sin perder de vista nada importante.",
    body: "Turnos, disponibilidad y actividades desde una sola vista.",
  },
  {
    kind: "single",
    src: "/brand/lucida-dashboard-mobile.png",
    alt: "Panel principal de Lúcida en celular",
    width: 390,
    height: 1180,
    title: "Toda la información necesaria en una sola ventana.",
    body: "Datos principales y seguimiento organizados por paciente.",
  },
  {
    kind: "responsive",
    desktopSrc: "/brand/lucida-dashboard-desktop.png",
    mobileSrc: "/brand/lucida-dashboard-inicio-mobile.png",
    alt: "Panel principal de Lúcida",
    title: "Dale continuidad a cada proceso.",
    body: "Registrá cada encuentro y consultá fácilmente el recorrido.",
  },
  {
    kind: "single",
    src: "/brand/lucida-professional-profile.png",
    alt: "Configuración del perfil profesional en Lúcida",
    width: 1440,
    height: 1024,
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
            <div className="flex w-full justify-center lg:w-1/2">
              <div className="overflow-hidden rounded-card border border-brand-border bg-white shadow-float">
                {block.kind === "responsive" ? (
                  <ResponsiveShot
                    desktopSrc={block.desktopSrc}
                    mobileSrc={block.mobileSrc}
                    alt={block.alt}
                    imgClassName="h-auto max-h-[520px] w-auto"
                  />
                ) : (
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={block.width}
                    height={block.height}
                    className="h-auto max-h-[520px] w-auto"
                  />
                )}
              </div>
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
