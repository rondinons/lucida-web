"use client";

import {
  addDays,
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchSesiones } from "@/lib/sesiones";
import { TurnoWizard } from "@/components/turno-wizard";
import { DayView } from "./day-view";
import { WeekView } from "./week-view";
import { MonthView } from "./month-view";

type Vista = "dia" | "semana" | "mes";

// KAN-31: rango de consulta según la vista activa, con un margen para que
// las tarjetas de días vecinos (mes) también tengan datos.
function rangoParaVista(vista: Vista, fecha: Date): [Date, Date] {
  if (vista === "dia") return [startOfDay(fecha), addDays(startOfDay(fecha), 1)];
  if (vista === "semana") return [startOfWeek(fecha, { weekStartsOn: 1 }), endOfWeek(fecha, { weekStartsOn: 1 })];
  return [startOfWeek(startOfMonth(fecha), { weekStartsOn: 1 }), endOfWeek(endOfMonth(fecha), { weekStartsOn: 1 })];
}

export function AgendaView() {
  const queryClient = useQueryClient();
  const [vista, setVista] = useState<Vista>("semana");
  const [fecha, setFecha] = useState(() => new Date());
  const [wizard, setWizard] = useState<{ fechaInicial: Date } | null>(null);

  const [desde, hasta] = rangoParaVista(vista, fecha);

  const { data: sesiones = [] } = useQuery({
    queryKey: ["sesiones", desde.toISOString(), hasta.toISOString()],
    queryFn: () => fetchSesiones(desde, hasta),
  });

  function navegar(direccion: -1 | 1) {
    if (vista === "dia") setFecha((f) => (direccion === 1 ? addDays(f, 1) : subDays(f, 1)));
    else if (vista === "semana") setFecha((f) => (direccion === 1 ? addWeeks(f, 1) : subWeeks(f, 1)));
    else setFecha((f) => (direccion === 1 ? addMonths(f, 1) : subMonths(f, 1)));
  }

  function cerrarWizard(creado: boolean) {
    setWizard(null);
    if (creado) queryClient.invalidateQueries({ queryKey: ["sesiones"] });
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-lucida-purple-700">Agenda</h1>

        <div className="flex items-center gap-2">
          <div className="flex rounded-card border border-gray-200 text-sm">
            {(["dia", "semana", "mes"] as Vista[]).map((v) => (
              <button
                key={v}
                onClick={() => setVista(v)}
                className={`px-3 py-1.5 capitalize ${
                  vista === v ? "bg-lucida-purple-600 text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <button onClick={() => navegar(-1)} className="rounded-card border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50">
            ‹
          </button>
          <button
            onClick={() => setFecha(new Date())}
            className="rounded-card border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            Hoy
          </button>
          <button onClick={() => navegar(1)} className="rounded-card border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50">
            ›
          </button>
        </div>
      </div>

      {vista === "dia" && (
        <DayView fecha={fecha} sesiones={sesiones} onNuevoTurno={() => setWizard({ fechaInicial: fecha })} />
      )}
      {vista === "semana" && (
        <WeekView
          fecha={fecha}
          sesiones={sesiones}
          onSeleccionarDia={(dia) => {
            setFecha(dia);
            setVista("dia");
          }}
          onNuevoTurno={(dia) => setWizard({ fechaInicial: dia })}
        />
      )}
      {vista === "mes" && (
        <MonthView
          fecha={fecha}
          sesiones={sesiones}
          onSeleccionarDia={(dia) => {
            setFecha(dia);
            setVista("dia");
          }}
        />
      )}

      {wizard && <TurnoWizard fechaInicial={wizard.fechaInicial} onClose={() => cerrarWizard(false)} onCreated={() => cerrarWizard(true)} />}
    </div>
  );
}
