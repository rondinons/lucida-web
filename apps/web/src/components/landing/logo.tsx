import Link from "next/link";
import { cn } from "@/lib/cn";

// Isotipo provisional en CSS: la "l" dentro de un cuadrado redondeado.
// Reemplazar por el SVG de marca definitivo (punto 30-31 del plan) en
// cuanto esté disponible.
export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5 font-display", className)}
      aria-label="Lúcida — inicio"
    >
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-[10px] text-lg font-bold leading-none",
          inverted ? "bg-white text-brand-purple" : "bg-brand-purple text-white",
        )}
      >
        l
      </span>
      <span className={cn("text-lg font-semibold lowercase", inverted ? "text-white" : "text-brand-ink")}>
        lúcida
      </span>
    </Link>
  );
}
