"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { METODOS_PAGO } from "@lucida/shared";

type Consultorio = { id: string; nombre: string };
type TipoSesion = { id: string; nombre: string; duracionMinutos: number; metodosPago: string[] };
type Paciente = { id: string; nombre: string };

const METODO_LABEL: Record<(typeof METODOS_PAGO)[number], string> = {
  EFECTIVO: "Efectivo",
  TRANSFERENCIA: "Transferencia",
  MERCADO_PAGO: "Mercado Pago",
  OTRO: "Otro",
};

function toDatetimeLocalValue(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

async function fetchConsultorios(): Promise<Consultorio[]> {
  const res = await fetch("/api/consultorios");
  if (!res.ok) throw new Error("No se pudieron cargar los consultorios");
  return res.json();
}

async function fetchTiposSesion(): Promise<TipoSesion[]> {
  const res = await fetch("/api/tipos-sesion");
  if (!res.ok) throw new Error("No se pudieron cargar los tipos de sesión");
  return res.json();
}

async function buscarPacientes(q: string): Promise<Paciente[]> {
  const res = await fetch(`/api/pacientes${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  if (!res.ok) throw new Error("No se pudieron buscar pacientes");
  return res.json();
}

async function crearSesion(input: {
  consultorioId: string;
  tipoSesionId: string;
  pacienteId?: string;
  startAt: string;
  endAt: string;
  metodosPago: string[];
}) {
  const res = await fetch("/api/sesiones", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo crear el turno");
  return res.json();
}

// KAN-32 a KAN-37: alta de turno. Se resuelve como un único formulario con
// secciones (no una máquina de pasos estricta): las HU piden validar y
// habilitar "Crear sesión" recién cuando todo lo obligatorio está completo,
// no forzar una navegación lineal.
export function TurnoWizard({
  fechaInicial,
  onClose,
  onCreated,
}: {
  fechaInicial: Date;
  onClose: () => void;
  onCreated: () => void;
}) {
  const { data: consultorios } = useQuery({ queryKey: ["consultorios"], queryFn: fetchConsultorios });
  const { data: tiposSesion } = useQuery({ queryKey: ["tipos-sesion", ""], queryFn: fetchTiposSesion });

  const [busquedaPaciente, setBusquedaPaciente] = useState("");
  const { data: resultadosPacientes } = useQuery({
    queryKey: ["pacientes-buscar", busquedaPaciente],
    queryFn: () => buscarPacientes(busquedaPaciente),
    enabled: busquedaPaciente.length > 0,
  });

  const [pacienteId, setPacienteId] = useState<string | null>(null);
  const [consultorioId, setConsultorioId] = useState("");
  const [tipoSesionId, setTipoSesionId] = useState("");
  const [fechaHora, setFechaHora] = useState(toDatetimeLocalValue(fechaInicial));
  const [metodosPago, setMetodosPago] = useState<string[]>([]);

  const tipoSeleccionado = tiposSesion?.find((t) => t.id === tipoSesionId);

  function seleccionarTipo(id: string) {
    setTipoSesionId(id);
    const tipo = tiposSesion?.find((t) => t.id === id);
    setMetodosPago(tipo?.metodosPago ?? []);
  }

  function toggleMetodo(m: string) {
    setMetodosPago((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
  }

  const startAt = useMemo(() => (fechaHora ? new Date(fechaHora) : null), [fechaHora]);
  const endAt = useMemo(
    () => (startAt && tipoSeleccionado ? new Date(startAt.getTime() + tipoSeleccionado.duracionMinutos * 60000) : null),
    [startAt, tipoSeleccionado],
  );

  const listo = Boolean(consultorioId && tipoSesionId && startAt && endAt);

  const mutation = useMutation({
    mutationFn: crearSesion,
    onSuccess: onCreated,
  });

  function confirmar() {
    if (!listo || !startAt || !endAt) return;
    mutation.mutate({
      consultorioId,
      tipoSesionId,
      pacienteId: pacienteId ?? undefined,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      metodosPago,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-card bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-lucida-purple-700">Nuevo turno</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Paciente</label>
            <input
              value={busquedaPaciente}
              onChange={(e) => {
                setBusquedaPaciente(e.target.value);
                setPacienteId(null);
              }}
              placeholder="Buscar por nombre..."
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
            />
            {busquedaPaciente && !pacienteId && (
              <ul className="mt-1 max-h-32 overflow-y-auto rounded-md border border-gray-100">
                {resultadosPacientes?.length ? (
                  resultadosPacientes.map((p) => (
                    <li key={p.id}>
                      <button
                        onClick={() => {
                          setPacienteId(p.id);
                          setBusquedaPaciente(p.nombre);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-lucida-purple-50"
                      >
                        {p.nombre}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-sm text-gray-400">Sin coincidencias</li>
                )}
              </ul>
            )}
            {pacienteId && <p className="mt-1 text-xs text-green-600">Paciente seleccionado.</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Consultorio</label>
            <select
              value={consultorioId}
              onChange={(e) => setConsultorioId(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="">Seleccioná un consultorio</option>
              {consultorios?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Fecha y hora</label>
            <input
              type="datetime-local"
              value={fechaHora}
              onChange={(e) => setFechaHora(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tipo de sesión</label>
            {tiposSesion?.length ? (
              <div className="flex flex-wrap gap-2">
                {tiposSesion.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => seleccionarTipo(t.id)}
                    className={`rounded-card border px-3 py-1.5 text-sm ${
                      tipoSesionId === t.id
                        ? "border-lucida-purple-500 bg-lucida-purple-50 text-lucida-purple-700"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    {t.nombre} · {t.duracionMinutos} min
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                Todavía no configuraste tipos de sesión. Creá uno en Tipos de sesión.
              </p>
            )}
          </div>

          {tipoSeleccionado && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Métodos de pago</label>
              <div className="flex flex-wrap gap-3">
                {METODOS_PAGO.map((m) => (
                  <label key={m} className="flex items-center gap-1 text-sm text-gray-600">
                    <input type="checkbox" checked={metodosPago.includes(m)} onChange={() => toggleMetodo(m)} />
                    {METODO_LABEL[m]}
                  </label>
                ))}
              </div>
            </div>
          )}

          {mutation.isError && <p className="text-sm text-red-500">No se pudo crear el turno. Intentá de nuevo.</p>}

          <div className="mt-2 flex justify-end gap-3">
            <button onClick={onClose} className="rounded-card px-4 py-2 text-sm text-gray-500 hover:bg-gray-50">
              Cancelar
            </button>
            <button
              onClick={confirmar}
              disabled={!listo || mutation.isPending}
              className="rounded-card bg-lucida-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-lucida-purple-700 disabled:opacity-40"
            >
              {mutation.isPending ? "Creando..." : "Crear sesión"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
