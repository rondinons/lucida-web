"use client";

import { Container } from "../ui/container";
import { ButtonLink } from "../ui/button";
import { trackEvent } from "@/lib/analytics";

export function MidCta() {
  return (
    <section className="bg-white py-16">
      <Container className="flex flex-col items-center gap-5 text-center">
        <h3 className="text-2xl font-semibold text-brand-ink sm:text-3xl">
          ¿Querés verlo aplicado a tu práctica?
        </h3>
        <ButtonLink href="#demo" size="lg" onClick={() => trackEvent("demo_cta_middle")}>
          Solicitar demo →
        </ButtonLink>
      </Container>
    </section>
  );
}
