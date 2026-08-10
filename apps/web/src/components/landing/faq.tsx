"use client";

import { Container, Eyebrow } from "../ui/container";
import { Accordion } from "../ui/accordion";
import { Reveal } from "../ui/reveal";
import { trackEvent } from "@/lib/analytics";

const FAQ_ITEMS = [
  {
    question: "¿Lúcida ya está disponible?",
    answer:
      "Estamos en una etapa inicial, acompañando de cerca a los primeros profesionales que se suman a probarla. Podés solicitar una demo para conocerla y sumarte a esta primera experiencia.",
  },
  {
    question: "¿Para quién está pensada?",
    answer:
      "Para profesionales de la salud mental que gestionan su consultorio: agenda, pacientes, sesiones y cobros.",
  },
  {
    question: "¿Tengo que instalar algo?",
    answer: "No. Lúcida funciona desde el navegador, sin instalación.",
  },
  {
    question: "¿Puedo usarla desde el celular?",
    answer: "Sí, podés acceder desde el celular o la computadora con la misma cuenta.",
  },
  {
    question: "¿Qué ocurre durante la demo?",
    answer:
      "Te mostramos el producto, respondemos tus preguntas y, si querés, te acompañamos a configurar tu espacio.",
  },
  {
    question: "¿Tengo que pagar para conocerla?",
    answer: "No. Solicitar la demo y conocer Lúcida no tiene costo ni compromiso.",
  },
  {
    question: "¿Las integraciones ya funcionan?",
    answer:
      "Google Calendar, Google Meet y Mercado Pago están previstas y se incorporarán progresivamente luego de su validación técnica y funcional.",
  },
  {
    question: "¿Cómo se protege la información?",
    answer:
      "Tu espacio está asociado a tu cuenta profesional y cada profesional trabaja de forma independiente. Antes de usar información real vas a conocer claramente las condiciones de tratamiento de datos.",
  },
];

export function Faq() {
  return (
    <section id="preguntas" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <Container className="mx-auto max-w-prose">
        <Reveal className="text-center">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold text-brand-ink sm:text-[44px]">Antes de empezar</h2>
        </Reveal>

        <div className="mt-12">
          <Accordion items={FAQ_ITEMS} onOpen={(question) => trackEvent("faq_open", { question })} />
        </div>
      </Container>
    </section>
  );
}
