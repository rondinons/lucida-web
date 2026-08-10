import { NextRequest, NextResponse } from "next/server";
import { tipoSesionSchema } from "@lucida/shared";
import { apiFetch } from "@/lib/api-client";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  const data = await apiFetch(`/tipos-sesion${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = tipoSesionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = await apiFetch("/tipos-sesion", { method: "POST", body: JSON.stringify(parsed.data) });
  return NextResponse.json(data, { status: 201 });
}
