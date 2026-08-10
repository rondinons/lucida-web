import { NextRequest, NextResponse } from "next/server";
import { preguntaPlantillaNotaSchema } from "@lucida/shared";
import { apiFetch } from "@/lib/api-client";

export async function GET() {
  const data = await apiFetch("/plantilla-notas");
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = preguntaPlantillaNotaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = await apiFetch("/plantilla-notas", { method: "POST", body: JSON.stringify(parsed.data) });
  return NextResponse.json(data, { status: 201 });
}
