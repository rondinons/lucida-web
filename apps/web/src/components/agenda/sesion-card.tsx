import type { Sesion } from "@/lib/sesiones";

const ESTADO_COLOR: Record<Sesion["estado"], string> = {
  PROGRAMADA: "bg-lucida-purple-100 text-lucida-purple-700",
  CONFIRMADA: "bg-green-100 text-green-700",
  CANCELADA: "bg-gray-100 text-gray-500 line-through",
  COMPLETADA: "bg-blue-100 text-blue-700",
  AUSENTE: "bg-red-100 text-red-700",
};

function formatHora(iso: string) {
  return new Date(iso).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}

// KAN-38: resumen de sesión — hora, paciente, tipo, duración y estado.
export function SesionCard({ sesion }: { sesion: Sesion }) {
  return (
    <div className={`rounded-card border border-gray-100 p-2 text-xs ${ESTADO_COLOR[sesion.estado]}`}>
      <div className="font-medium">
        {formatHora(sesion.startAt)}–{formatHora(sesion.endAt)}
      </div>
      <div>{sesion.paciente?.nombre ?? "Sin paciente"}</div>
      <div className="opacity-80">
        {sesion.tipoSesion.nombre} · {sesion.tipoSesion.duracionMinutos} min
      </div>
    </div>
  );
}
