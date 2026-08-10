import { addDays, endOfMonth, endOfWeek, isSameDay, isSameMonth, startOfMonth, startOfWeek } from "date-fns";
import type { Sesion } from "@/lib/sesiones";

const DIA_ABREV = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export function MonthView({
  fecha,
  sesiones,
  onSeleccionarDia,
}: {
  fecha: Date;
  sesiones: Sesion[];
  onSeleccionarDia: (dia: Date) => void;
}) {
  const inicio = startOfWeek(startOfMonth(fecha), { weekStartsOn: 1 });
  const fin = endOfWeek(endOfMonth(fecha), { weekStartsOn: 1 });
  const dias: Date[] = [];
  for (let d = inicio; d <= fin; d = addDays(d, 1)) dias.push(d);

  const hoy = new Date();

  return (
    <div>
      <div className="mb-1 grid grid-cols-7 gap-2 text-center text-xs font-medium text-gray-400">
        {DIA_ABREV.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {dias.map((dia) => {
          const enMes = isSameMonth(dia, fecha);
          const esHoy = isSameDay(dia, hoy);
          const cantidad = sesiones.filter((s) => isSameDay(new Date(s.startAt), dia)).length;

          return (
            <button
              key={dia.toISOString()}
              onClick={() => onSeleccionarDia(dia)}
              className={`flex h-16 flex-col items-center justify-start rounded-card border p-1 text-sm ${
                enMes ? "border-gray-100" : "border-transparent text-gray-300"
              } ${esHoy ? "border-lucida-purple-400 bg-lucida-purple-50" : ""}`}
            >
              <span className={esHoy ? "font-semibold text-lucida-purple-700" : ""}>{dia.getDate()}</span>
              {cantidad > 0 && <span className="mt-1 h-1.5 w-1.5 rounded-full bg-lucida-orange-500" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
