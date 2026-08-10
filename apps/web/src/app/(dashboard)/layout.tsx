import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/agenda", label: "Agenda" },
  { href: "/pacientes", label: "Pacientes" },
  { href: "/perfil", label: "Perfil" },
  { href: "/consultorios", label: "Consultorios" },
  { href: "/horarios", label: "Horarios" },
  { href: "/tipos-sesion", label: "Tipos de sesión" },
  { href: "/plantilla-notas", label: "Notas de sesión" },
  { href: "/recordatorios", label: "Recordatorios" },
  { href: "/facturacion", label: "Facturación" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 flex-col justify-between border-r border-gray-100 bg-lucida-purple-50 p-6">
        <div>
          <div className="mb-8 text-xl font-bold text-lucida-purple-700">Lúcida</div>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-card px-3 py-2 text-sm font-medium text-lucida-purple-900 hover:bg-lucida-purple-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="text-sm">
          <p className="mb-2 truncate text-gray-500">{session?.user?.email}</p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit" className="text-lucida-orange-600 hover:underline">
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
