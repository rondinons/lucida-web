"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

// Al entrar en viewport, espera un momento y funde a la captura de
// "Nuevo cobro" — demuestra la acción sin video. Una sola vez, no en
// loop; prefers-reduced-motion (global) la deja directamente en el
// estado final.
export function CobrosShot({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [showNuevoCobro, setShowNuevoCobro] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const timer = setTimeout(() => setShowNuevoCobro(true), prefersReduced ? 0 : 1400);
        return () => clearTimeout(timer);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <div className="relative hidden sm:inline-block">
        <Image
          src="/brand/cobros-desktop.png"
          alt="Cobros en Lúcida"
          width={1440}
          height={1024}
          className="block h-auto max-h-[520px] w-auto"
        />
        <Image
          src="/brand/cobros-nuevo-cobro.png"
          alt="Registrar un nuevo cobro en Lúcida"
          width={1440}
          height={1024}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-700 ease-out",
            showNuevoCobro ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
      <Image
        src="/brand/cobros-mobile.png"
        alt="Cobros en Lúcida"
        width={390}
        height={920}
        className="h-auto max-h-[520px] w-auto sm:hidden"
      />
    </div>
  );
}
