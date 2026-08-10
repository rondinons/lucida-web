import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api-client";

export async function POST() {
  const data = await apiFetch("/plantilla-notas/restablecer", { method: "POST" });
  return NextResponse.json(data);
}
