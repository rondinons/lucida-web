import { NextRequest, NextResponse } from "next/server";
import { perfilProfesionalSchema } from "@lucida/shared";
import { apiFetch } from "@/lib/api-client";

export async function GET() {
  const data = await apiFetch("/perfil");
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const parsed = perfilProfesionalSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = await apiFetch("/perfil", { method: "PUT", body: JSON.stringify(parsed.data) });
  return NextResponse.json(data);
}
