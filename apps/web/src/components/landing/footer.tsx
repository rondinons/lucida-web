import { Container } from "../ui/container";
import { Logo } from "./logo";

const PRODUCT_LINKS = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#privacidad", label: "Privacidad" },
  { href: "#preguntas", label: "Preguntas" },
];

// TODO: reemplazar "#" por las URLs reales de cada red social.
const SOCIAL_LINKS = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="bg-white py-16">
      <Container>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-brand-gray">
              Tu consultorio, claro y en orden.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-brand-ink">Producto</p>
            {PRODUCT_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-brand-gray hover:text-brand-purple"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-brand-ink">Seguinos</p>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-brand-gray hover:text-brand-purple"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="mailto:hola@somoslucida.com"
              className="mt-2 text-sm text-brand-gray hover:text-brand-purple"
            >
              hola@somoslucida.com
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-brand-border pt-8 text-sm text-brand-gray sm:flex-row">
          <p>© 2026 Lúcida</p>
          <div className="flex items-center gap-4">
            {/* TODO: enlazar a páginas reales de Privacidad y Términos */}
            <a href="#" className="hover:text-brand-purple">
              Privacidad
            </a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-brand-purple">
              Términos
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
