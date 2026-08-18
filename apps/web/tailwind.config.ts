import type { Config } from "tailwindcss";

// Paleta legada (lucida.purple/orange) usada por el dashboard interno —
// no tocar, rompería (dashboard)/*. La landing usa el namespace `brand`
// con la identidad real de Lúcida: verde + lavanda + crema, farol como
// isotipo (ver apps/web/public/brand/).
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        lucida: {
          purple: {
            50: "#f5f3ff",
            100: "#ede9fe",
            300: "#c4b5fd",
            500: "#7c3aed",
            600: "#6d28d9",
            700: "#5b21b6",
            900: "#3b0764",
          },
          orange: {
            50: "#fff7ed",
            100: "#ffedd5",
            300: "#fdba74",
            500: "#f97316",
            600: "#ea580c",
            700: "#c2410c",
          },
        },
        brand: {
          primary: "#2F6D59",
          "primary-hover": "#25594A",
          dark: "#1F3D33",
          "dark-border": "#CFE0D5",
          cta: "#A7DFBF",
          "cta-hover": "#8FCDA8",
          lavender: "#EDE8F5",
          "lavender-strong": "#B8A6D9",
          green: "#2F6D59",
          forest: "#1F3D33",
          mint: "#E3F3E9",
          ink: "#2C2336",
          gray: "#6B6270",
          border: "#E6E0D3",
          "input-border": "#DCD5C6",
          bg: "#FBF8F3",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1.25rem",
        button: "14px",
        input: "12px",
        chip: "999px",
      },
      maxWidth: {
        content: "1200px",
        prose: "720px",
      },
      boxShadow: {
        float: "0 20px 50px rgba(39, 37, 45, 0.08)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "soft-enter": {
          "0%": { opacity: "0", transform: "translateY(14px) scale(0.985)" },
          "100%": { opacity: "1", transform: "none" },
        },
        "soft-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "tech-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 500ms ease-out forwards",
        "soft-enter": "soft-enter 700ms ease-out forwards",
        "soft-float": "soft-float 4s ease-in-out infinite",
        "tech-float": "tech-float 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
