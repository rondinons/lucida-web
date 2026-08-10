import { NextRequest, NextResponse } from "next/server";
import { preguntaPlantillaNotaSchema } from "@lucida/shared";
import { apiFetch } from "@/lib/api-client";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const parsed = preguntaPlantillaNotaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = await apiFetch(`/plantilla-notas/${params.id}`, { method: "PUT", body: JSON.stringify(parsed.data) });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await apiFetch(`/plantilla-notas/${params.id}`, { method: "DELETE" });
  return new NextResponse(null, { status: 204 });
}
