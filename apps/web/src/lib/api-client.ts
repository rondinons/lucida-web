import { SignJWT } from "jose";
import { auth } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// El JWT/JWE de sesión de Auth.js no es legible directamente por un servicio
// externo. En vez de exponer su formato interno a apps/api, emitimos acá un
// JWT propio de corta duración (HS256, mismo AUTH_SECRET) que NestJS valida
// con passport-jwt (ver apps/api/src/auth/jwt.strategy.ts).
async function getApiToken(userId: string, email: string): Promise<string> {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(secret);
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const session = await auth();
  if (!session?.user) {
    throw new Error("No hay sesión activa");
  }

  const token = await getApiToken(session.user.id, session.user.email ?? "");

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API ${path} respondió ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
