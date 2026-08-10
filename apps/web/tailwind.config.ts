import type { Config } from "tailwindcss";

// Paleta legada (lucida.purple/orange) usada por el dashboard interno —
// no tocar, rompería (dashboard)/*. La landing usa el namespace `brand`
// con la paleta violeta/verde del documento de rediseño.
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
          purple: "#6757C8",
          "purple-hover": "#5747B7",
          "purple-dark": "#403479",
          "purple-border": "#D8D2EF",
          lavender: "#F0EDFA",
          green: "#87AA96",
          forest: "#456B55",
          mint: "#EDF5F0",
          ink: "#27252D",
          gray: "#69666F",
          border: "#E4E1E7",
          "input-border": "#DAD7DF",
          bg: "#FBFAF8",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "ui-sans-serif", "system-ui", "sans-serif"],
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
      },
      animation: {
        "fade-up": "fade-up 500ms ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
