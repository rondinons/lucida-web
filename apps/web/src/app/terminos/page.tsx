import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/landing/logo";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Lúcida",
  description:
    "Términos y Condiciones de Lúcida, plataforma de gestión para profesionales de salud mental.",
};

export default function TerminosPage() {
  return (
    <main className="landing-root min-h-screen bg-brand-bg">
      <header className="border-b border-brand-border bg-white">
        <Container className="flex items-center justify-between py-5">
          <Logo />
          <Link href="/" className="text-sm text-brand-gray hover:text-brand-primary">
            Volver al inicio
          </Link>
        </Container>
      </header>

      <Container className="max-w-prose py-16">
        <h1 className="text-3xl font-semibold text-blue-600 sm:text-4xl">
          Términos y Condiciones
        </h1>
        <p className="mt-3 text-brand-gray">
          Lúcida — Plataforma de Gestión para Profesionales de Salud Mental
        </p>
        <p className="mt-1 text-sm text-brand-gray/70">Última actualización: Agosto 2026</p>

        <div className="mt-10 border-t border-brand-border" />

        <article className="mt-10 space-y-10 text-brand-ink">
          <section>
            <h2 className="text-xl font-semibold">1. Introducción</h2>
            <p className="mt-3 leading-relaxed text-brand-gray">
              Bienvenido a Lúcida. Estos Términos y Condiciones (&quot;T&amp;C&quot;) establecen
              los derechos y responsabilidades al usar nuestra plataforma. Al acceder a Lúcida,
              aceptás estos términos en su totalidad.
            </p>
            <p className="mt-3 leading-relaxed text-brand-gray">
              Lúcida es una herramienta de gestión administrativa y organizacional diseñada
              exclusivamente para profesionales de la salud mental. Facilita la organización de
              agenda, pacientes, sesiones y cobros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. Definiciones</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-brand-gray">
              <li>
                <strong className="text-brand-ink">Usuario:</strong> Profesional de la salud
                mental que accede a Lúcida.
              </li>
              <li>
                <strong className="text-brand-ink">Datos:</strong> Información registrada por el
                Usuario en Lúcida.
              </li>
              <li>
                <strong className="text-brand-ink">Plataforma:</strong> La aplicación web de
                Lúcida accesible en somoslucida.com.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Responsabilidades del Usuario</h2>
            <p className="mt-3 leading-relaxed text-brand-gray">El Usuario es responsable de:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-brand-gray">
              <li>Usar Lúcida únicamente para fines profesionales legales y éticos.</li>
              <li>Mantener la confidencialidad y seguridad de sus credenciales de acceso.</li>
              <li>Cumplir con todas las leyes aplicables en su jurisdicción.</li>
              <li>No compartir credenciales ni permitir acceso no autorizado a su cuenta.</li>
              <li>No intentar acceder a datos de otros Usuarios.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Naturaleza de la Plataforma</h2>
            <p className="mt-3 leading-relaxed text-brand-gray">
              Lúcida es una herramienta administrativa y organizacional.{" "}
              <strong className="text-brand-ink">
                No es un software médico, no realiza diagnósticos, y no constituye asesoramiento
                clínico o psicológico.
              </strong>
            </p>
            <p className="mt-3 leading-relaxed text-brand-gray">
              Las decisiones clínicas, diagnósticas y terapéuticas son responsabilidad exclusiva
              del Usuario.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Privacidad y Datos</h2>
            <p className="mt-3 leading-relaxed text-brand-gray">
              El Usuario es el propietario y responsable de los datos que registra en Lúcida.
              Lúcida actúa como procesadora de datos bajo instrucciones del Usuario.
            </p>
            <p className="mt-3 leading-relaxed text-brand-gray">
              Durante el período de prueba gratuito, los datos del Usuario permanecen en la
              Plataforma mientras la cuenta esté activa. Si el Usuario cancela, sus datos se
              retendrán por 30 días antes de ser eliminados permanentemente.
            </p>
            <p className="mt-3 leading-relaxed text-brand-gray">
              El Usuario puede solicitar acceso, rectificación, eliminación o portabilidad de sus
              datos contactando a:{" "}
              <strong className="text-brand-ink">applucida@gmail.com</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Limitaciones de Responsabilidad</h2>
            <p className="mt-3 leading-relaxed text-brand-gray">
              Lúcida se proporciona &quot;tal cual está&quot;. No garantizamos disponibilidad
              24/7, ausencia de errores, o recuperación garantizada de datos.
            </p>
            <p className="mt-3 leading-relaxed text-brand-gray">Lúcida no es responsable por:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-brand-gray">
              <li>Decisiones clínicas o terapéuticas tomadas por el Usuario.</li>
              <li>Daños derivados del uso de la Plataforma.</li>
              <li>Pérdida de datos causada por acceso no autorizado.</li>
              <li>Pérdida de ingresos o datos indirectos.</li>
              <li>Incumplimiento del Usuario con leyes locales.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. Uso Aceptable</h2>
            <p className="mt-3 leading-relaxed text-brand-gray">
              El Usuario se compromete a NO:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-brand-gray">
              <li>Usar Lúcida para actividades ilegales.</li>
              <li>Intentar acceder, alterar o destruir datos de otros Usuarios.</li>
              <li>Usar datos para fines distintos a la práctica profesional.</li>
              <li>Vender, alquilar o distribuir datos a terceros.</li>
              <li>Usar la Plataforma para spam, phishing o acoso.</li>
              <li>Realizar ataques o intentos de hackeo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8. Integraciones con Terceros</h2>
            <p className="mt-3 leading-relaxed text-brand-gray">
              Lúcida puede integrarse con servicios de terceros. Estas integraciones están
              sujetas a los términos de servicio de cada tercero. Lúcida no es responsable por
              fallas en servicios de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">9. Cambios en el Servicio y Cancelación</h2>
            <p className="mt-3 leading-relaxed text-brand-gray">
              Lúcida puede actualizar funcionalidades con aviso previo. El Usuario puede cancelar
              su cuenta en cualquier momento contactando a{" "}
              <strong className="text-brand-ink">applucida@gmail.com</strong>.
            </p>
            <p className="mt-3 leading-relaxed text-brand-gray">
              Los datos se eliminarán permanentemente 30 días después de la cancelación, excepto
              por obligaciones legales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">10. Propiedad Intelectual</h2>
            <p className="mt-3 leading-relaxed text-brand-gray">
              La Plataforma es propiedad intelectual de Lúcida. El Usuario obtiene una licencia
              limitada para usar Lúcida conforme a estos T&amp;C. Los datos registrados por el
              Usuario son propiedad del Usuario.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">11. Contacto</h2>
            <p className="mt-3 leading-relaxed text-brand-gray">
              Para consultas sobre estos T&amp;C o cualquier cuestión:
            </p>
            <p className="mt-3 leading-relaxed text-brand-gray">
              <strong className="text-brand-ink">
                Email:{" "}
                <a href="mailto:applucida@gmail.com" className="hover:text-brand-primary">
                  applucida@gmail.com
                </a>
              </strong>
            </p>
            <p className="mt-3 leading-relaxed text-brand-gray">
              <strong className="text-brand-ink">
                Sitio:{" "}
                <a
                  href="https://somoslucida.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-primary"
                >
                  somoslucida.com
                </a>
              </strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">12. Vigencia y Modificaciones</h2>
            <p className="mt-3 leading-relaxed text-brand-gray">
              Estos T&amp;C rigen desde la fecha de última actualización. Lúcida puede
              modificarlos en cualquier momento. Cambios significativos se comunicarán con aviso
              previo.
            </p>
            <p className="mt-3 leading-relaxed text-brand-gray">
              Usar Lúcida después de cambios implica aceptación de los términos modificados.
            </p>
            <p className="mt-3 leading-relaxed text-brand-gray">
              Si alguna cláusula es inválida, las demás permanecen vigentes. Estos T&amp;C se
              rigen por las leyes de la República Argentina.
            </p>
          </section>
        </article>
      </Container>

      <footer className="border-t border-brand-border bg-white py-10">
        <Container className="text-center text-sm text-brand-gray">
          <p>© 2026 Lucida</p>
          <p className="mt-2 text-brand-gray/70">Ultima actualizacion: Agosto 2026</p>
        </Container>
      </footer>
    </main>
  );
}
