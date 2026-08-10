import { NextRequest, NextResponse } from "next/server";
import { consultorioSchema } from "@lucida/shared";
import { apiFetch } from "@/lib/api-client";

// BFF: el navegador nunca llama directo a apps/api. Esta ruta agrega el JWT
// server-side (apiFetch) y reenvía. Mismo patrón para el resto de los módulos.
export async function GET() {
  const data = await apiFetch("/consultorios");
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = consultorioSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = await apiFetch("/consultorios", {
    method: "POST",
    body: JSON.stringify(parsed.data),
  });
  return NextResponse.json(data, { status: 201 });
}
