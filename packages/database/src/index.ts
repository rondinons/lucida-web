import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __lucidaPrisma: PrismaClient | undefined;
}

// Singleton para evitar agotar conexiones en dev (hot-reload de Next.js/Nest).
export const prisma = globalThis.__lucidaPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__lucidaPrisma = prisma;
}

export * from "@prisma/client";
