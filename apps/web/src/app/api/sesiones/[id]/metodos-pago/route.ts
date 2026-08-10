import { NextRequest, NextResponse } from "next/server";
import { actualizarMetodosPagoSesionSchema } from "@lucida/shared";
import { apiFetch } from "@/lib/api-client";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const parsed = actualizarMetodosPagoSesionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = await apiFetch(`/sesiones/${params.id}/metodos-pago`, {
    method: "PUT",
    body: JSON.stringify(parsed.data),
  });
  return NextResponse.json(data);
}
