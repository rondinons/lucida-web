"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

// Única microanimación del hero (punto 11 del plan): un turno pasa de
// "Pendiente" a "Confirmado ✓" una sola vez, 400ms, sin loop.
export function AnimatedStatusCell({ className }: { className?: string }) {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => setConfirmed(true), prefersReduced ? 0 : 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "rounded-input px-2 py-2 text-[11px] font-medium transition-colors duration-500 ease-out",
        confirmed ? "bg-brand-mint text-brand-forest" : "bg-brand-lavender text-brand-purple-dark",
        className,
      )}
    >
      {confirmed ? "Confirmado ✓" : "Pendiente"}
    </div>
  );
}
