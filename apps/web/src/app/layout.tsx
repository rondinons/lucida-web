import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { QueryProvider } from "@/components/query-provider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://somoslucida.com"),
  title: "Lúcida | Gestión para profesionales de salud mental",
  description:
    "Organizá pacientes, agenda, sesiones y gestión cotidiana desde un mismo lugar. Conocé Lúcida y solicitá una demo personalizada.",
  openGraph: {
    title: "Lúcida | Gestión para profesionales de salud mental",
    description:
      "Organizá pacientes, agenda, sesiones y gestión cotidiana desde un mismo lugar. Conocé Lúcida y solicitá una demo personalizada.",
    url: "https://somoslucida.com",
    siteName: "Lúcida",
    locale: "es_AR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Lúcida" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lúcida | Gestión para profesionales de salud mental",
    description:
      "Organizá pacientes, agenda, sesiones y gestión cotidiana desde un mismo lugar.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
