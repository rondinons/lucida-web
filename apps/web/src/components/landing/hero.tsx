"use client";

import Image from "next/image";
import { Container, Eyebrow } from "../ui/container";
import { ButtonLink } from "../ui/button";
import { trackEvent } from "@/lib/analytics";

const TRUST_ITEMS = ["Sin instalación", "Acompañamiento inicial", "Probala sin compromiso"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-bg pt-16 pb-20 lg:pt-24 lg:pb-28">
      <Container className="flex flex-col items-center text-center">
        <Eyebrow>Hecho para profesionales que acompañan</Eyebrow>

        <h1 className="mt-5 max-w-3xl text-[40px] font-semibold leading-[1.08] tracking-tight text-brand-ink sm:text-6xl lg:text-[68px]">
          Todo tu consultorio,
          <br />
          <span className="text-brand-primary">en un mismo lugar.</span>
        </h1>

        <p className="mt-6 max-w-prose text-lg leading-relaxed text-brand-gray sm:text-xl">
          Lúcida reúne pacientes, agenda, sesiones y gestión cotidiana para que puedas trabajar con
          más claridad y menos herramientas dispersas.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <ButtonLink href="#demo" size="lg" onClick={() => trackEvent("demo_cta_hero")}>
            Solicitar demo
          </ButtonLink>
          <a
            href="#producto"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand-dark hover:text-brand-primary"
          >
            Ver cómo funciona
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-gray">
          {TRUST_ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <span className="text-brand-green" aria-hidden="true">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-14 w-full max-w-5xl lg:mt-16">
          <div className="animate-soft-enter overflow-hidden rounded-card border border-brand-border bg-white shadow-float">
            <Image
              src="/brand/lucida-dashboard-note.png"
              alt="Panel principal y nota de sesión de Lúcida"
              width={1440}
              height={1024}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
