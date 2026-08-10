"use client";

import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { Container } from "../ui/container";
import { ButtonLink } from "../ui/button";
import { trackEvent } from "@/lib/analytics";

const NAV_LINKS = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#privacidad", label: "Tus datos" },
  { href: "#preguntas", label: "Preguntas" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ease-out ${
        scrolled
          ? "border-b border-brand-border bg-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between lg:h-20">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-brand-ink transition-colors hover:text-brand-purple"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="#demo" onClick={() => trackEvent("demo_cta_header")}>
            Solicitar demo
          </ButtonLink>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-input text-brand-ink lg:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M2 2L20 20M20 2L2 20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M2 5.5H20M2 11H20M2 16.5H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </Container>

      {menuOpen ? (
        <div className="border-t border-brand-border bg-white px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-brand-ink"
              >
                {link.label}
              </a>
            ))}
            <ButtonLink
              href="#demo"
              className="mt-2 w-full"
              onClick={() => {
                trackEvent("demo_cta_header");
                setMenuOpen(false);
              }}
            >
              Solicitar demo
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
