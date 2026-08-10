"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DIAS_SEMANA, horarioSchema, type HorarioInput } from "@lucida/shared";

type Consultorio = { id: string; nombre: string };
type Horario = HorarioInput & { id: string };

async function fetchConsultorios(): Promise<Consultorio[]> {
  const res = await fetch("/api/consultorios");
  if (!res.ok) throw new Error("No se pudieron cargar los consultorios");
  return res.json();
}

async function fetchHorarios(consultorioId: string): Promise<Horario[]> {
  const res = await fetch(`/api/horarios?consultorioId=${consultorioId}`);
  if (!res.ok) throw new Error("No se pudieron cargar los horarios");
  return res.json();
}

async function crearHorario(input: HorarioInput): Promise<Horario> {
  const res = await fetch("/api/horarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo crear el horario");
  return res.json();
}

async function eliminarHorario(id: string): Promise<void> {
  const res = await fetch(`/api/horarios/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("No se pudo eliminar el horario");
}

const DIA_LABEL: Record<(typeof DIAS_SEMANA)[number], string> = {
  LUNES: "Lunes",
  MARTES: "Martes",
  MIERCOLES: "Miércoles",
  JUEVES: "Jueves",
  VIERNES: "Viernes",
  SABADO: "Sábado",
  DOMINGO: "Domingo",
};

export function HorariosView() {
  const queryClient = useQueryClient();
  const { data: consultorios } = useQuery({ queryKey: ["consultorios"], queryFn: fetchConsultorios });
  const [consultorioId, setConsultorioId] = useState<string>("");

  const activeConsultorioId = consultorioId || consultorios?.[0]?.id || "";

  const { data: horarios, isLoading } = useQuery({
    queryKey: ["horarios", activeConsultorioId],
    queryFn: () => fetchHorarios(activeConsultorioId),
    enabled: !!activeConsultorioId,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HorarioInput>({
    resolver: zodResolver(horarioSchema),
    defaultValues: { consultorioId: activeConsultorioId, diaSemana: "LUNES", horaInicio: "09:00", horaFin: "17:00" },
  });

  const crear = useMutation({
    mutationFn: crearHorario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["horarios", activeConsultorioId] });
      reset({ consultorioId: activeConsultorioId, diaSemana: "LUNES", horaInicio: "09:00", horaFin: "17:00" });
    },
  });

  const eliminar = useMutation({
    mutationFn: eliminarHorario,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["horarios", activeConsultorioId] }),
  });

  if (!consultorios?.length) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-semibold text-lucida-purple-700">Horarios de atención</h1>
        <p className="text-gray-500">Creá un consultorio primero para poder configurar sus horarios.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold text-lucida-purple-700">Horarios de atención</h1>

      <select
        value={activeConsultorioId}
        onChange={(e) => setConsultorioId(e.target.value)}
        className="mb-4 rounded-md border border-gray-200 px-3 py-2 text-sm"
      >
        {consultorios.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>

      <form
        onSubmit={handleSubmit((values) => crear.mutate({ ...values, consultorioId: activeConsultorioId }))}
        className="mb-8 flex max-w-md flex-wrap items-end gap-3 rounded-card border border-gray-100 p-4"
      >
        <div>
          <label className="block text-xs text-gray-500">Día</label>
          <select {...register("diaSemana")} className="rounded-md border border-gray-200 px-2 py-2 text-sm">
            {DIAS_SEMANA.map((d) => (
              <option key={d} value={d}>
                {DIA_LABEL[d]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500">Desde</label>
          <input type="time" {...register("horaInicio")} className="rounded-md border border-gray-200 px-2 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Hasta</label>
          <input type="time" {...register("horaFin")} className="rounded-md border border-gray-200 px-2 py-2 text-sm" />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || crear.isPending}
          className="rounded-card bg-lucida-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-lucida-purple-700 disabled:opacity-50"
        >
          Agregar
        </button>
        {errors.horaFin && <p className="w-full text-xs text-red-500">{errors.horaFin.message}</p>}
      </form>

      {isLoading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : horarios?.length ? (
        <ul className="flex max-w-md flex-col gap-2">
          {horarios.map((h) => (
            <li key={h.id} className="flex items-center justify-between rounded-card border border-gray-100 p-3 text-sm">
              <span>
                {DIA_LABEL[h.diaSemana]} — {h.horaInicio} a {h.horaFin}
              </span>
              <button onClick={() => eliminar.mutate(h.id)} className="text-red-500 hover:underline">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Sin bloques de atención configurados para este consultorio.</p>
      )}
    </div>
  );
}
