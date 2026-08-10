"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PLAZOS_RECORDATORIO, type RecordatoriosInput } from "@lucida/shared";

async function fetchRecordatorios(): Promise<RecordatoriosInput> {
  const res = await fetch("/api/recordatorios");
  if (!res.ok) throw new Error("No se pudo cargar la configuración");
  return res.json();
}

async function guardarRecordatorios(input: RecordatoriosInput): Promise<RecordatoriosInput> {
  const res = await fetch("/api/recordatorios", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo guardar la configuración");
  return res.json();
}

export function RecordatoriosView() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["recordatorios"], queryFn: fetchRecordatorios });

  const [activos, setActivos] = useState(false);
  const [dias, setDias] = useState<number[]>([]);

  useEffect(() => {
    if (data) {
      setActivos(data.activos);
      setDias(data.diasAnticipacion);
    }
  }, [data]);

  const guardar = useMutation({
    mutationFn: guardarRecordatorios,
    onSuccess: (result) => queryClient.setQueryData(["recordatorios"], result),
  });

  function toggleDia(dia: number) {
    setDias((prev) => (prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia].sort((a, b) => a - b)));
  }

  if (isLoading) return <p className="text-gray-500">Cargando...</p>;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold text-lucida-purple-700">Recordatorios automáticos</h1>

      <div className="max-w-md rounded-card border border-gray-100 p-4">
        <label className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-700">
          <input type="checkbox" checked={activos} onChange={(e) => setActivos(e.target.checked)} />
          Activar recordatorios automáticos
        </label>

        <p className="mb-2 text-sm text-gray-500">Enviar con anticipación de:</p>
        <div className="mb-4 flex flex-wrap gap-3">
          {PLAZOS_RECORDATORIO.map((plazo) => (
            <label key={plazo} className="flex items-center gap-1 text-sm text-gray-600">
              <input
                type="checkbox"
                disabled={!activos}
                checked={dias.includes(plazo)}
                onChange={() => toggleDia(plazo)}
              />
              {plazo} {plazo === 1 ? "día" : "días"}
            </label>
          ))}
        </div>

        <button
          onClick={() => guardar.mutate({ activos, diasAnticipacion: dias })}
          disabled={guardar.isPending}
          className="rounded-card bg-lucida-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-lucida-purple-700 disabled:opacity-50"
        >
          {guardar.isPending ? "Guardando..." : "Guardar"}
        </button>
        {guardar.isSuccess && <p className="mt-2 text-xs text-green-600">Configuración actualizada.</p>}
      </div>
    </div>
  );
}
