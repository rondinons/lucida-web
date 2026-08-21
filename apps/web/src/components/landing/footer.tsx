import { Container } from "../ui/container";
import { Logo } from "./logo";

const PRODUCT_LINKS = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#privacidad", label: "Privacidad" },
  { href: "#preguntas", label: "Preguntas" },
];

const COMPLIANCE_ITEMS = [
  "Ley 25.326 (Argentina)",
  "GDPR (Internacionales)",
];

// TODO: reemplazar "#" por la URL real de LinkedIn.
const SOCIAL_LINKS = [
  { href: "https://instagram.com/applucida", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
  { href: "https://facebook.com/applucida", label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="bg-white py-16">
      <Container>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
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
                className="text-sm text-brand-gray hover:text-brand-primary"
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
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm text-brand-gray hover:text-brand-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="mailto:applucida@gmail.com"
              className="mt-2 text-sm text-brand-gray hover:text-brand-primary"
            >
              applucida@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-brand-ink">Cumplimiento</p>
            <ul className="flex flex-col gap-3">
              {COMPLIANCE_ITEMS.map((item) => (
                <li key={item} className="text-sm text-brand-gray">
                  {item}
                </li>
              ))}
              <li>
                <a href="/terminos" className="text-sm text-blue-600 hover:text-blue-700">
                  Ver Términos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-brand-border pt-8 text-sm text-brand-gray sm:flex-row">
          <p>© 2026 Lúcida</p>
          <div className="flex items-center gap-4">
            {/* TODO: enlazar a página real de Privacidad */}
            <a href="#" className="hover:text-brand-primary">
              Privacidad
            </a>
            <span aria-hidden="true">·</span>
            <a href="/terminos" className="text-blue-600 hover:text-blue-700">
              Términos
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
