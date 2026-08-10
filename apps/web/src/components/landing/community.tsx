"use client";

import { Container, Eyebrow } from "../ui/container";
import { ButtonLink } from "../ui/button";
import { Reveal } from "../ui/reveal";
import { trackEvent } from "@/lib/analytics";

export function Community() {
  return (
    <section className="bg-brand-bg py-24 lg:py-32">
      <Container className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <Eyebrow>Una herramienta que escucha</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-brand-ink sm:text-[44px]">
            Queremos construir Lúcida junto a quienes la van a usar.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-gray">
            La primera experiencia está pensada para profesionales que quieran conocer el producto,
            probar sus funciones y ayudarnos a detectar qué realmente simplifica su práctica
            cotidiana.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-8">
          <ButtonLink href="#demo" size="lg" onClick={() => trackEvent("demo_cta_middle")}>
            Quiero participar de la primera experiencia
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
