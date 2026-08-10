import { NextRequest, NextResponse } from "next/server";
import { horarioSchema } from "@lucida/shared";
import { apiFetch } from "@/lib/api-client";

export async function GET(req: NextRequest) {
  const consultorioId = req.nextUrl.searchParams.get("consultorioId") ?? "";
  const data = await apiFetch(`/horarios?consultorioId=${encodeURIComponent(consultorioId)}`);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = horarioSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = await apiFetch("/horarios", { method: "POST", body: JSON.stringify(parsed.data) });
  return NextResponse.json(data, { status: 201 });
}
