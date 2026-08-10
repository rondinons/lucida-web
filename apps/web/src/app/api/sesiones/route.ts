import { NextRequest, NextResponse } from "next/server";
import { crearSesionSchema } from "@lucida/shared";
import { apiFetch } from "@/lib/api-client";

export async function GET(req: NextRequest) {
  const desde = req.nextUrl.searchParams.get("desde");
  const hasta = req.nextUrl.searchParams.get("hasta");
  const query = new URLSearchParams();
  if (desde) query.set("desde", desde);
  if (hasta) query.set("hasta", hasta);

  const data = await apiFetch(`/sesiones${query.toString() ? `?${query.toString()}` : ""}`);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = crearSesionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = await apiFetch("/sesiones", { method: "POST", body: JSON.stringify(parsed.data) });
  return NextResponse.json(data, { status: 201 });
}
