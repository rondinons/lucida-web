import { isSameDay } from "date-fns";
import type { Sesion } from "@/lib/sesiones";
import { SesionCard } from "./sesion-card";

export function DayView({
  fecha,
  sesiones,
  onNuevoTurno,
}: {
  fecha: Date;
  sesiones: Sesion[];
  onNuevoTurno: () => void;
}) {
  const delDia = sesiones
    .filter((s) => isSameDay(new Date(s.startAt), fecha))
    .sort((a, b) => a.startAt.localeCompare(b.startAt));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-lucida-purple-700">
            {fecha.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </h2>
          <p className="text-sm text-gray-500">{delDia.length} sesión(es)</p>
        </div>
        <button
          onClick={onNuevoTurno}
          className="rounded-card bg-lucida-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-lucida-purple-700"
        >
          Nuevo turno
        </button>
      </div>

      {delDia.length ? (
        <ul className="flex max-w-md flex-col gap-2">
          {delDia.map((s) => (
            <li key={s.id}>
              <SesionCard sesion={s} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="max-w-md rounded-card border border-dashed border-gray-200 p-6 text-center">
          <p className="mb-3 text-gray-500">No tenés sesiones programadas para este día.</p>
          <button onClick={onNuevoTurno} className="text-sm text-lucida-purple-600 hover:underline">
            Agendar la primera
          </button>
        </div>
      )}
    </div>
  );
}
