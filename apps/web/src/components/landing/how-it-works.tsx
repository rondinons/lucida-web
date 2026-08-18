"use client";

import { useEffect, useRef, useState } from "react";
import { Container, Eyebrow } from "../ui/container";
import { Reveal } from "../ui/reveal";

const STEPS = [
  {
    number: "01",
    title: "Solicitá una demo",
    body: "Nos contás brevemente cómo organizás actualmente tu práctica.",
  },
  {
    number: "02",
    title: "Preparamos tu espacio",
    body: "Te acompañamos a configurar lo necesario.",
  },
  {
    number: "03",
    title: "Probá Lúcida",
    body: "Usala en tu día a día y conocé sus posibilidades.",
  },
];

export function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const node = lineRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="como-funciona" className="scroll-mt-24 bg-brand-bg py-24 lg:py-40">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow>Cómo funciona</Eyebrow>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold text-brand-ink sm:text-[44px]">
            Empezar es simple.
          </h2>
        </Reveal>

        <div className="relative mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          <div
            ref={lineRef}
            className="absolute left-0 right-0 top-6 hidden h-px bg-brand-border sm:block"
            aria-hidden="true"
          >
            <div
              className="h-px bg-brand-primary transition-all duration-[1200ms] ease-out"
              style={{ width: filled ? "100%" : "0%" }}
            />
          </div>

          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 120} className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-brand-border bg-white font-display text-sm font-bold text-brand-dark">
                {step.number}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-brand-ink">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-brand-gray">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
