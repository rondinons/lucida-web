"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

type FacturacionConfig = {
  datosFiscalesCompletos: boolean;
  datosFaltantes: string[];
  mercadoPagoConectado: boolean;
  certificadoFiscalEstado: "PENDIENTE" | "CARGADO" | "VENCIDO";
  suscripcionEstado: string;
};

async function fetchFacturacion(): Promise<FacturacionConfig> {
  const res = await fetch("/api/facturacion");
  if (!res.ok) throw new Error("No se pudo cargar la configuración de facturación");
  return res.json();
}

async function actualizarMercadoPago(conectar: boolean): Promise<FacturacionConfig> {
  const res = await fetch("/api/facturacion", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mercadoPagoConectado: conectar }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "No se pudo actualizar Mercado Pago");
  }
  return res.json();
}

const CAMPO_LABEL: Record<string, string> = {
  fiscalId: "identificador fiscal (CUIT/RUT/RFC)",
  telefono: "teléfono",
};

export function FacturacionView() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["facturacion"], queryFn: fetchFacturacion });

  const mutation = useMutation({
    mutationFn: actualizarMercadoPago,
    onSuccess: (result) => queryClient.setQueryData(["facturacion"], result),
  });

  if (isLoading || !data) return <p className="text-gray-500">Cargando...</p>;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold text-lucida-purple-700">Facturación y cobros</h1>

      <div className="flex max-w-lg flex-col gap-4">
        <section className="rounded-card border border-gray-100 p-4">
          <h2 className="mb-1 font-medium text-gray-700">Suscripción</h2>
          <p className="text-sm text-gray-500">Estado: {data.suscripcionEstado}</p>
        </section>

        <section className="rounded-card border border-gray-100 p-4">
          <h2 className="mb-1 font-medium text-gray-700">Datos fiscales</h2>
          {data.datosFiscalesCompletos ? (
            <p className="text-sm text-green-600">Completos.</p>
          ) : (
            <p className="text-sm text-lucida-orange-600">
              Faltan: {data.datosFaltantes.map((c) => CAMPO_LABEL[c] ?? c).join(", ")}.{" "}
              <Link href="/perfil" className="underline">
                Completar en Perfil
              </Link>
            </p>
          )}
        </section>

        <section className="rounded-card border border-gray-100 p-4">
          <h2 className="mb-1 font-medium text-gray-700">Mercado Pago</h2>
          <p className="mb-2 text-sm text-gray-500">
            {data.mercadoPagoConectado ? "Conectado." : "No conectado."}
          </p>
          <button
            onClick={() => mutation.mutate(!data.mercadoPagoConectado)}
            disabled={mutation.isPending || (!data.mercadoPagoConectado && !data.datosFiscalesCompletos)}
            className="rounded-card bg-lucida-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-lucida-purple-700 disabled:opacity-50"
          >
            {data.mercadoPagoConectado ? "Desconectar" : "Conectar"}
          </button>
          {mutation.isError && <p className="mt-2 text-xs text-red-500">{(mutation.error as Error).message}</p>}
        </section>

        <section className="rounded-card border border-gray-100 p-4">
          <h2 className="mb-1 font-medium text-gray-700">Certificado fiscal</h2>
          <p className="text-sm text-gray-500">Estado: {data.certificadoFiscalEstado}</p>
        </section>
      </div>
    </div>
  );
}
