import { cn } from "@/lib/cn";
import { AnimatedStatusCell } from "./animated-status-cell";

// Representación abstracta de la interfaz de Lúcida, NO una captura real.
// Placeholder temporal hasta integrar los exports de Figma (punto 10 del
// plan). Mantiene proporciones ~1100x650 para que el layout no salte
// cuando se reemplace.
export function ProductMockup({
  variant = "dashboard",
  animate = false,
  className,
}: {
  variant?: "dashboard" | "agenda" | "pacientes" | "sesiones";
  animate?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[1100/650] w-full overflow-hidden rounded-card border border-brand-border bg-white shadow-float",
        className,
      )}
    >
      <div className="absolute right-3 top-3 z-10 rounded-chip bg-brand-ink/80 px-2.5 py-1 text-[11px] font-semibold text-white">
        Vista previa — pendiente de captura real
      </div>

      <div className="flex h-10 items-center gap-1.5 border-b border-brand-border bg-brand-bg px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-brand-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-border" />
      </div>

      <div className="flex h-[calc(100%-2.5rem)]">
        <div className="hidden w-[22%] flex-col gap-3 border-r border-brand-border bg-brand-bg p-4 sm:flex">
          {["Agenda", "Pacientes", "Sesiones", "Gestión"].map((item, i) => (
            <div
              key={item}
              className={cn(
                "h-8 rounded-input px-3 text-[13px] leading-8",
                i === 0 ? "bg-brand-lavender font-semibold text-brand-purple-dark" : "text-brand-gray",
              )}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex-1 p-5">
          {variant === "agenda" || variant === "dashboard" ? <AgendaGrid animate={animate} /> : null}
          {variant === "pacientes" ? <ListRows /> : null}
          {variant === "sesiones" ? <NotesLayout /> : null}
        </div>
      </div>
    </div>
  );
}

function AgendaGrid({ animate = false }: { animate?: boolean }) {
  return (
    <div className="grid h-full grid-cols-5 gap-2">
      {Array.from({ length: 5 }).map((_, col) => (
        <div key={col} className="flex flex-col gap-2">
          <div className="h-4 w-8 rounded bg-brand-border" />
          {Array.from({ length: col === 1 ? 3 : 2 }).map((_, row) =>
            animate && col === 1 && row === 0 ? (
              <AnimatedStatusCell key={row} className="h-9" />
            ) : (
              <div
                key={row}
                className="rounded-input bg-brand-lavender/60 px-2 py-2 text-[11px] font-medium text-brand-purple-dark"
                style={{ height: 36 + (row % 2) * 16 }}
              >
                —
              </div>
            ),
          )}
        </div>
      ))}
    </div>
  );
}

function ListRows() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="h-6 w-40 rounded bg-brand-border" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-input border border-brand-border p-2.5">
          <div className="h-8 w-8 shrink-0 rounded-full bg-brand-lavender" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-1/3 rounded bg-brand-border" />
            <div className="h-2 w-1/4 rounded bg-brand-border/60" />
          </div>
        </div>
      ))}
    </div>
  );
}

function NotesLayout() {
  return (
    <div className="grid h-full grid-cols-3 gap-4">
      <div className="col-span-2 space-y-2.5">
        <div className="h-4 w-1/3 rounded bg-brand-border" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-2.5 rounded bg-brand-border/60" style={{ width: `${90 - i * 8}%` }} />
        ))}
      </div>
      <div className="space-y-2 rounded-input bg-brand-bg p-3">
        <div className="h-3 w-2/3 rounded bg-brand-border" />
        <div className="h-2 w-1/2 rounded bg-brand-border/60" />
        <div className="mt-3 h-2 w-full rounded bg-brand-border/60" />
        <div className="h-2 w-3/4 rounded bg-brand-border/60" />
      </div>
    </div>
  );
}
