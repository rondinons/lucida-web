"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { consultorioSchema, type ConsultorioInput } from "@lucida/shared";

type Consultorio = ConsultorioInput & { id: string };

async function fetchConsultorios(): Promise<Consultorio[]> {
  const res = await fetch("/api/consultorios");
  if (!res.ok) throw new Error("No se pudieron cargar los consultorios");
  return res.json();
}

async function crearConsultorio(input: ConsultorioInput): Promise<Consultorio> {
  const res = await fetch("/api/consultorios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo crear el consultorio");
  return res.json();
}

async function editarConsultorio(id: string, input: Partial<ConsultorioInput>): Promise<Consultorio> {
  const res = await fetch(`/api/consultorios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo editar el consultorio");
  return res.json();
}

async function eliminarConsultorio(id: string): Promise<void> {
  const res = await fetch(`/api/consultorios/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("No se pudo eliminar el consultorio");
}

function ConsultorioItem({ consultorio }: { consultorio: Consultorio }) {
  const queryClient = useQueryClient();
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState(consultorio.nombre);

  const editar = useMutation({
    mutationFn: () => editarConsultorio(consultorio.id, { nombre }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultorios"] });
      setEditando(false);
    },
  });

  const eliminar = useMutation({
    mutationFn: () => eliminarConsultorio(consultorio.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["consultorios"] }),
  });

  if (editando) {
    return (
      <li className="flex items-center gap-2 rounded-card border border-gray-100 p-3 text-sm">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="flex-1 rounded-md border border-gray-200 px-2 py-1"
        />
        <button
          onClick={() => editar.mutate()}
          disabled={editar.isPending}
          className="text-lucida-purple-600 hover:underline"
        >
          Guardar
        </button>
        <button onClick={() => setEditando(false)} className="text-gray-400 hover:underline">
          Cancelar
        </button>
      </li>
    );
  }

  return (
    <li className="flex items-center justify-between rounded-card border border-gray-100 p-3 text-sm">
      <span>
        <span className="font-medium">{consultorio.nombre}</span>
        {consultorio.esVirtual && <span className="ml-2 text-lucida-orange-600">Virtual</span>}
      </span>
      <span className="flex gap-3">
        <button onClick={() => setEditando(true)} className="text-lucida-purple-600 hover:underline">
          Editar
        </button>
        <button
          onClick={() => {
            if (confirm(`¿Eliminar "${consultorio.nombre}"?`)) eliminar.mutate();
          }}
          disabled={eliminar.isPending}
          className="text-red-500 hover:underline"
        >
          Eliminar
        </button>
      </span>
    </li>
  );
}

export function ConsultoriosView() {
  const queryClient = useQueryClient();

  const { data: consultorios, isLoading } = useQuery({
    queryKey: ["consultorios"],
    queryFn: fetchConsultorios,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultorioInput>({
    resolver: zodResolver(consultorioSchema),
    defaultValues: { esVirtual: false, timezone: "America/Argentina/Buenos_Aires" },
  });

  const mutation = useMutation({
    mutationFn: crearConsultorio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultorios"] });
      reset();
    },
  });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold text-lucida-purple-700">Consultorios</h1>

      <form
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
        className="mb-8 flex max-w-md flex-col gap-3 rounded-card border border-gray-100 p-4"
      >
        <input
          {...register("nombre")}
          placeholder="Nombre del consultorio"
          className="rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
        {errors.nombre && <p className="text-xs text-red-500">{errors.nombre.message}</p>}

        <input
          {...register("direccion")}
          placeholder="Dirección (opcional)"
          className="rounded-md border border-gray-200 px-3 py-2 text-sm"
        />

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" {...register("esVirtual")} />
          Es virtual
        </label>

        <button
          type="submit"
          disabled={isSubmitting || mutation.isPending}
          className="rounded-card bg-lucida-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-lucida-purple-700 disabled:opacity-50"
        >
          {mutation.isPending ? "Creando..." : "Crear consultorio"}
        </button>
      </form>

      {isLoading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : consultorios?.length ? (
        <ul className="flex max-w-md flex-col gap-2">
          {consultorios.map((c) => (
            <ConsultorioItem key={c.id} consultorio={c} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Todavía no creaste ningún consultorio.</p>
      )}
    </div>
  );
}
