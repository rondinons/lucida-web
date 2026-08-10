import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold text-lucida-purple-700">
        Hola, {session?.user?.name?.split(" ")[0] ?? "profesional"}
      </h1>
      <p className="text-gray-500">
        Fase 1: perfil, consultorios, horarios y agenda básica. La sincronización con Google
        Calendar / Outlook y los cobros llegan en fases siguientes.
      </p>
    </div>
  );
}
