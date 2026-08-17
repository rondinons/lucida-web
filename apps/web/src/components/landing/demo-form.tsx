"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, type LeadInput } from "@lucida/shared";
import { InputField } from "../ui/input-field";
import { Button } from "../ui/button";
import { trackEvent } from "@/lib/analytics";

// Formspree: sin backend propio para este formulario — ver apps/web/.env.example.
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

export function DemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const startedRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({ resolver: zodResolver(leadSchema) });

  function handleFirstInteraction() {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("demo_form_start");
    }
  }

  async function onSubmit(data: LeadInput) {
    setServerError(null);

    if (!FORMSPREE_ENDPOINT) {
      setServerError(
        "El formulario todavía no está conectado (falta NEXT_PUBLIC_FORMSPREE_ENDPOINT).",
      );
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request_failed");
      trackEvent("demo_form_submit");
      setSubmitted(true);
    } catch {
      setServerError("No pudimos enviar tu solicitud. Probá de nuevo en unos minutos.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-card border border-brand-border bg-white p-10 text-center shadow-float">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-mint text-2xl text-brand-forest">
          ✓
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-brand-ink">Recibimos tu solicitud.</h3>
        <p className="mt-2 text-base text-brand-gray">Gracias por querer conocer Lúcida.</p>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-brand-gray">
          Te vamos a contactar para coordinar una demo breve y conocer un poco más sobre tu
          práctica.
        </p>
        {/* TODO: reemplazar "#" por la URL real de Instagram de Lúcida */}
        <a
          href="#"
          className="mt-6 text-[15px] font-semibold text-brand-purple-dark hover:text-brand-purple"
        >
          Seguir a Lúcida en Instagram
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={handleFirstInteraction}
      noValidate
      className="flex flex-col gap-5 rounded-card border border-brand-border bg-white p-8 shadow-float"
    >
      <InputField
        label="Nombre y apellido"
        autoComplete="name"
        error={errors.nombre?.message}
        {...register("nombre")}
      />
      <InputField
        label="Email profesional"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <InputField
        label="Profesión"
        autoComplete="organization-title"
        error={errors.profesion?.message}
        {...register("profesion")}
      />

      <label className="flex items-start gap-3 text-sm text-brand-gray">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-brand-input-border text-brand-purple focus:ring-2 focus:ring-brand-purple"
          {...register("aceptaContacto")}
        />
        Acepto recibir información sobre la demo y novedades de Lúcida.
      </label>
      {errors.aceptaContacto ? (
        <p className="-mt-3 text-sm text-red-500">{errors.aceptaContacto.message}</p>
      ) : null}

      {serverError ? <p className="text-sm text-red-500">{serverError}</p> : null}

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2 w-full">
        {isSubmitting ? "Enviando…" : "Solicitar demo →"}
      </Button>
    </form>
  );
}
