"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { METODOS_PAGO, tipoSesionSchema, type TipoSesionInput } from "@lucida/shared";

type TipoSesion = TipoSesionInput & { id: string };

const METODO_LABEL: Record<(typeof METODOS_PAGO)[number], string> = {
  EFECTIVO: "Efectivo",
  TRANSFERENCIA: "Transferencia",
  MERCADO_PAGO: "Mercado Pago",
  OTRO: "Otro",
};

async function fetchTiposSesion(q: string): Promise<TipoSesion[]> {
  const res = await fetch(`/api/tipos-sesion${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  if (!res.ok) throw new Error("No se pudieron cargar los tipos de sesión");
  return res.json();
}

async function crearTipoSesion(input: TipoSesionInput): Promise<TipoSesion> {
  const res = await fetch("/api/tipos-sesion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo crear el tipo de sesión");
  return res.json();
}

async function eliminarTipoSesion(id: string): Promise<void> {
  const res = await fetch(`/api/tipos-sesion/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("No se pudo eliminar el tipo de sesión");
}

export function TiposSesionView() {
  const queryClient = useQueryClient();
  const [busqueda, setBusqueda] = useState("");

  const { data: tipos, isLoading } = useQuery({
    queryKey: ["tipos-sesion", busqueda],
    queryFn: () => fetchTiposSesion(busqueda),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TipoSesionInput>({
    resolver: zodResolver(tipoSesionSchema),
    defaultValues: { duracionMinutos: 50, precio: 0, moneda: "ARS", metodosPago: [], activo: true },
  });

  const crear = useMutation({
    mutationFn: crearTipoSesion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipos-sesion"] });
      reset();
    },
  });

  const eliminar = useMutation({
    mutationFn: eliminarTipoSesion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tipos-sesion"] }),
  });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold text-lucida-purple-700">Tipos de sesión</h1>

      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por nombre..."
        className="mb-4 w-full max-w-sm rounded-md border border-gray-200 px-3 py-2 text-sm"
      />

      <form
        onSubmit={handleSubmit((values) => crear.mutate(values))}
        className="mb-8 flex max-w-md flex-col gap-3 rounded-card border border-gray-100 p-4"
      >
        <input
          {...register("nombre")}
          placeholder="Nombre (ej. Sesión individual)"
          className="rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
        {errors.nombre && <p className="text-xs text-red-500">{errors.nombre.message}</p>}

        <div className="flex gap-3">
          <input
            type="number"
            {...register("duracionMinutos", { valueAsNumber: true })}
            placeholder="Duración (min)"
            className="w-1/2 rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            type="number"
            step="0.01"
            {...register("precio", { valueAsNumber: true })}
            placeholder="Precio"
            className="w-1/2 rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <input
          {...register("moneda")}
          placeholder="Moneda (ej. ARS)"
          className="rounded-md border border-gray-200 px-3 py-2 text-sm"
        />

        <fieldset className="flex flex-wrap gap-3">
          {METODOS_PAGO.map((m) => (
            <label key={m} className="flex items-center gap-1 text-sm text-gray-600">
              <input type="checkbox" value={m} {...register("metodosPago")} />
              {METODO_LABEL[m]}
            </label>
          ))}
        </fieldset>

        <button
          type="submit"
          disabled={isSubmitting || crear.isPending}
          className="rounded-card bg-lucida-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-lucida-purple-700 disabled:opacity-50"
        >
          {crear.isPending ? "Creando..." : "Crear tipo de sesión"}
        </button>
      </form>

      {isLoading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : tipos?.length ? (
        <ul className="flex max-w-md flex-col gap-2">
          {tipos.map((t) => (
            <li key={t.id} className="flex items-center justify-between rounded-card border border-gray-100 p-3 text-sm">
              <span>
                <span className="font-medium">{t.nombre}</span> — {t.duracionMinutos} min — {t.precio} {t.moneda}
              </span>
              <button onClick={() => eliminar.mutate(t.id)} className="text-red-500 hover:underline">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Sin tipos de sesión configurados.</p>
      )}
    </div>
  );
}
