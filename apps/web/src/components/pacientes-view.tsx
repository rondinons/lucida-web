"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { pacienteSchema, type PacienteInput } from "@lucida/shared";

type Paciente = PacienteInput & { id: string };

async function fetchPacientes(): Promise<Paciente[]> {
  const res = await fetch("/api/pacientes");
  if (!res.ok) throw new Error("No se pudieron cargar los pacientes");
  return res.json();
}

async function crearPaciente(input: PacienteInput): Promise<Paciente> {
  const res = await fetch("/api/pacientes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo registrar el paciente");
  return res.json();
}

// Alta rápida + listado. La ficha integral (Épica 8: tabs Información/
// Sesiones/Evolución) queda para una iteración aparte.
export function PacientesView() {
  const queryClient = useQueryClient();
  const { data: pacientes, isLoading } = useQuery({ queryKey: ["pacientes"], queryFn: fetchPacientes });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PacienteInput>({ resolver: zodResolver(pacienteSchema) });

  const mutation = useMutation({
    mutationFn: crearPaciente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
      reset();
    },
  });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold text-lucida-purple-700">Pacientes</h1>

      <form
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
        className="mb-8 flex max-w-md flex-col gap-3 rounded-card border border-gray-100 p-4"
      >
        <input
          {...register("nombre")}
          placeholder="Nombre completo"
          className="rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
        {errors.nombre && <p className="text-xs text-red-500">{errors.nombre.message}</p>}

        <input
          {...register("email")}
          placeholder="Email (opcional)"
          className="rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
        <input
          {...register("telefono")}
          placeholder="Teléfono (opcional)"
          className="rounded-md border border-gray-200 px-3 py-2 text-sm"
        />

        <button
          type="submit"
          disabled={isSubmitting || mutation.isPending}
          className="rounded-card bg-lucida-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-lucida-purple-700 disabled:opacity-50"
        >
          {mutation.isPending ? "Registrando..." : "Registrar paciente"}
        </button>
      </form>

      {isLoading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : pacientes?.length ? (
        <ul className="flex max-w-md flex-col gap-2">
          {pacientes.map((p) => (
            <li key={p.id} className="rounded-card border border-gray-100 p-3 text-sm">
              {p.nombre}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Todavía no registraste pacientes.</p>
      )}
    </div>
  );
}
