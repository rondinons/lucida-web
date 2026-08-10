import { NextRequest, NextResponse } from "next/server";
import { reordenarPreguntasPlantillaSchema } from "@lucida/shared";
import { apiFetch } from "@/lib/api-client";

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const parsed = reordenarPreguntasPlantillaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = await apiFetch("/plantilla-notas/reordenar", { method: "PUT", body: JSON.stringify(parsed.data) });
  return NextResponse.json(data);
}
