import { addDays, isSameDay, startOfWeek } from "date-fns";
import type { Sesion } from "@/lib/sesiones";
import { SesionCard } from "./sesion-card";

const DIA_ABREV = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];

export function WeekView({
  fecha,
  sesiones,
  onSeleccionarDia,
  onNuevoTurno,
}: {
  fecha: Date;
  sesiones: Sesion[];
  onSeleccionarDia: (dia: Date) => void;
  onNuevoTurno: (dia: Date) => void;
}) {
  const inicioSemana = startOfWeek(fecha, { weekStartsOn: 1 });
  const dias = Array.from({ length: 7 }, (_, i) => addDays(inicioSemana, i));
  const hoy = new Date();

  return (
    <div className="grid grid-cols-7 gap-2">
      {dias.map((dia, index) => {
        const sesionesDelDia = sesiones
          .filter((s) => isSameDay(new Date(s.startAt), dia))
          .sort((a, b) => a.startAt.localeCompare(b.startAt));
        const esHoy = isSameDay(dia, hoy);

        return (
          <div key={dia.toISOString()} className="flex min-h-[16rem] flex-col rounded-card border border-gray-100 p-2">
            <button
              onClick={() => onSeleccionarDia(dia)}
              className={`mb-2 rounded-md px-2 py-1 text-left text-xs font-medium ${
                esHoy ? "bg-lucida-purple-600 text-white" : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {DIA_ABREV[index]} {dia.getDate()}
            </button>

            <div className="flex flex-1 flex-col gap-1">
              {sesionesDelDia.map((s) => (
                <SesionCard key={s.id} sesion={s} />
              ))}
            </div>

            <button
              onClick={() => onNuevoTurno(dia)}
              className="mt-2 rounded-md border border-dashed border-gray-200 py-1 text-xs text-gray-400 hover:border-lucida-purple-300 hover:text-lucida-purple-600"
            >
              + Sesión
            </button>
          </div>
        );
      })}
    </div>
  );
}
