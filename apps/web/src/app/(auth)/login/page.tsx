import { signIn } from "@/lib/auth";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const callbackUrl = searchParams.callbackUrl ?? "/dashboard";

  return (
    <main className="flex min-h-screen items-center justify-center bg-lucida-purple-50 px-6">
      <div className="w-full max-w-sm rounded-card bg-white p-8 shadow-md">
        <h1 className="mb-1 text-2xl font-semibold text-lucida-purple-700">Ingresá a Lúcida</h1>
        <p className="mb-6 text-sm text-gray-500">Sin contraseñas.</p>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: callbackUrl });
          }}
        >
          <button
            type="submit"
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-card border border-gray-200 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Continuar con Google
          </button>
        </form>

        <form
          action={async () => {
            "use server";
            await signIn("microsoft-entra-id", { redirectTo: callbackUrl });
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-card border border-gray-200 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Continuar con Microsoft
          </button>
        </form>
      </div>
    </main>
  );
}
