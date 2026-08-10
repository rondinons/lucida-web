"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { COUNTRY_CODES, perfilProfesionalSchema, type PerfilProfesionalInput } from "@lucida/shared";

type Perfil = PerfilProfesionalInput & { id: string };

async function fetchPerfil(): Promise<Perfil | null> {
  const res = await fetch("/api/perfil");
  if (res.status === 404 || !res.ok) return null;
  return res.json();
}

async function guardarPerfil(input: PerfilProfesionalInput): Promise<Perfil> {
  const res = await fetch("/api/perfil", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("No se pudo guardar el perfil");
  return res.json();
}

export function PerfilView() {
  const queryClient = useQueryClient();
  const { data: perfil, isLoading } = useQuery({ queryKey: ["perfil"], queryFn: fetchPerfil });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PerfilProfesionalInput>({
    resolver: zodResolver(perfilProfesionalSchema),
    defaultValues: { countryCode: "AR" },
  });

  useEffect(() => {
    if (perfil) reset(perfil);
  }, [perfil, reset]);

  const mutation = useMutation({
    mutationFn: guardarPerfil,
    onSuccess: (data) => {
      queryClient.setQueryData(["perfil"], data);
      reset(data);
    },
  });

  if (isLoading) return <p className="text-gray-500">Cargando...</p>;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold text-lucida-purple-700">Perfil profesional</h1>

      <form
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
        className="flex max-w-lg flex-col gap-3"
      >
        <label className="text-sm font-medium text-gray-700">Especialidad</label>
        <input
          {...register("especialidad")}
          placeholder="Ej. Psicología clínica"
          className="rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
        {errors.especialidad && <p className="text-xs text-red-500">{errors.especialidad.message}</p>}

        <label className="text-sm font-medium text-gray-700">Descripción profesional</label>
        <textarea
          {...register("bio")}
          rows={4}
          className="rounded-md border border-gray-200 px-3 py-2 text-sm"
        />

        <label className="text-sm font-medium text-gray-700">País</label>
        <select {...register("countryCode")} className="rounded-md border border-gray-200 px-3 py-2 text-sm">
          {COUNTRY_CODES.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>

        <label className="text-sm font-medium text-gray-700">CUIT / identificador fiscal</label>
        <input
          {...register("fiscalId")}
          className="rounded-md border border-gray-200 px-3 py-2 text-sm"
        />

        <label className="text-sm font-medium text-gray-700">Teléfono</label>
        <input
          {...register("telefono")}
          placeholder="+54 9 11 ..."
          className="rounded-md border border-gray-200 px-3 py-2 text-sm"
        />

        <button
          type="submit"
          disabled={isSubmitting || mutation.isPending || !isDirty}
          className="mt-2 self-start rounded-card bg-lucida-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-lucida-purple-700 disabled:opacity-50"
        >
          {mutation.isPending ? "Guardando..." : "Guardar cambios"}
        </button>

        {mutation.isSuccess && <p className="text-xs text-green-600">Perfil actualizado.</p>}
        {mutation.isError && <p className="text-xs text-red-500">No se pudo guardar. Intentá de nuevo.</p>}
      </form>
    </div>
  );
}
