"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { PreguntaPlantillaNotaInput } from "@lucida/shared";

type Pregunta = PreguntaPlantillaNotaInput & { id: string; orden: number };

async function fetchPreguntas(): Promise<Pregunta[]> {
  const res = await fetch("/api/plantilla-notas");
  if (!res.ok) throw new Error("No se pudo cargar la plantilla");
  return res.json();
}

async function crearPregunta(texto: string): Promise<Pregunta> {
  const res = await fetch("/api/plantilla-notas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto }),
  });
  if (!res.ok) throw new Error("No se pudo agregar la pregunta");
  return res.json();
}

async function editarPregunta(id: string, texto: string): Promise<Pregunta> {
  const res = await fetch(`/api/plantilla-notas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto }),
  });
  if (!res.ok) throw new Error("No se pudo editar la pregunta");
  return res.json();
}

async function eliminarPregunta(id: string): Promise<void> {
  const res = await fetch(`/api/plantilla-notas/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("No se pudo eliminar la pregunta");
}

async function reordenarPreguntas(ids: string[]): Promise<Pregunta[]> {
  const res = await fetch("/api/plantilla-notas/reordenar", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) throw new Error("No se pudo reordenar la plantilla");
  return res.json();
}

async function restablecerPredeterminadas(): Promise<Pregunta[]> {
  const res = await fetch("/api/plantilla-notas/restablecer", { method: "POST" });
  if (!res.ok) throw new Error("No se pudo restablecer la plantilla");
  return res.json();
}

export function PlantillaNotasView() {
  const queryClient = useQueryClient();
  const [nuevaPregunta, setNuevaPregunta] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [textoEdicion, setTextoEdicion] = useState("");

  const { data: preguntas, isLoading } = useQuery({ queryKey: ["plantilla-notas"], queryFn: fetchPreguntas });

  const invalidar = () => queryClient.invalidateQueries({ queryKey: ["plantilla-notas"] });

  const crear = useMutation({
    mutationFn: crearPregunta,
    onSuccess: () => {
      setNuevaPregunta("");
      invalidar();
    },
  });

  const editar = useMutation({
    mutationFn: ({ id, texto }: { id: string; texto: string }) => editarPregunta(id, texto),
    onSuccess: () => {
      setEditandoId(null);
      invalidar();
    },
  });

  const eliminar = useMutation({ mutationFn: eliminarPregunta, onSuccess: invalidar });
  const reordenar = useMutation({ mutationFn: reordenarPreguntas, onSuccess: invalidar });
  const restablecer = useMutation({
    mutationFn: restablecerPredeterminadas,
    onSuccess: invalidar,
  });

  function mover(index: number, direccion: -1 | 1) {
    if (!preguntas) return;
    const destino = index + direccion;
    if (destino < 0 || destino >= preguntas.length) return;
    const ids = preguntas.map((p) => p.id);
    [ids[index], ids[destino]] = [ids[destino], ids[index]];
    reordenar.mutate(ids);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-lucida-purple-700">Plantilla de notas de sesión</h1>
        <button
          onClick={() => {
            if (confirm("Esto reemplaza tu plantilla actual por las preguntas predeterminadas. ¿Continuar?")) {
              restablecer.mutate();
            }
          }}
          className="text-sm text-lucida-orange-600 hover:underline"
        >
          Restablecer predeterminadas
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (nuevaPregunta.trim()) crear.mutate(nuevaPregunta.trim());
        }}
        className="mb-6 flex max-w-lg gap-2"
      >
        <input
          value={nuevaPregunta}
          onChange={(e) => setNuevaPregunta(e.target.value)}
          placeholder="Nueva pregunta..."
          className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={crear.isPending}
          className="rounded-card bg-lucida-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-lucida-purple-700 disabled:opacity-50"
        >
          Agregar
        </button>
      </form>

      {isLoading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : preguntas?.length ? (
        <ul className="flex max-w-lg flex-col gap-2">
          {preguntas.map((p, index) => (
            <li key={p.id} className="flex items-center gap-2 rounded-card border border-gray-100 p-3 text-sm">
              <div className="flex flex-col">
                <button onClick={() => mover(index, -1)} disabled={index === 0} className="text-gray-400 disabled:opacity-30">
                  ▲
                </button>
                <button
                  onClick={() => mover(index, 1)}
                  disabled={index === preguntas.length - 1}
                  className="text-gray-400 disabled:opacity-30"
                >
                  ▼
                </button>
              </div>

              {editandoId === p.id ? (
                <>
                  <input
                    value={textoEdicion}
                    onChange={(e) => setTextoEdicion(e.target.value)}
                    className="flex-1 rounded-md border border-gray-200 px-2 py-1"
                  />
                  <button
                    onClick={() => editar.mutate({ id: p.id, texto: textoEdicion })}
                    className="text-lucida-purple-600 hover:underline"
                  >
                    Guardar
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1">{p.texto}</span>
                  <button
                    onClick={() => {
                      setEditandoId(p.id);
                      setTextoEdicion(p.texto);
                    }}
                    className="text-lucida-purple-600 hover:underline"
                  >
                    Editar
                  </button>
                </>
              )}

              <button onClick={() => eliminar.mutate(p.id)} className="text-red-500 hover:underline">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Sin preguntas configuradas todavía.</p>
      )}
    </div>
  );
}
