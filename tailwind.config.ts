import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      colors: {
        tango: {
          DEFAULT: "hsl(var(--tango))",
          foreground: "hsl(var(--tango-foreground))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          foreground: "hsl(var(--gold-foreground))",
        },
        elegant: {
          DEFAULT: "hsl(var(--elegant))",
          foreground: "hsl(var(--elegant-foreground))",
        },
        success: "hsl(var(--success))",
        gray: {
          1: "hsl(var(--gray-1))",
          2: "hsl(var(--gray-2))",
          3: "hsl(var(--gray-3))",
          4: "hsl(var(--gray-4))",
          5: "hsl(var(--gray-5))",
          6: "hsl(var(--gray-6))",
        },
      },
      fontSize: {
        // We extend the default scale with your specific semantic names
        h1: ["64px", { lineHeight: "1.2", fontWeight: "600" }],
        h2: ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        h3: ["24px", { lineHeight: "1.2", fontWeight: "600" }],
        h4: ["20px", { lineHeight: "1.2", fontWeight: "600" }],
        "h4-medium": ["20px", { lineHeight: "1.2", fontWeight: "500" }],
        "body-1": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-1-medium": ["16px", { lineHeight: "1.5", fontWeight: "500" }],
        "body-1-semibold": ["16px", { lineHeight: "1.5", fontWeight: "600" }],
        "body-2": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-2-medium": ["14px", { lineHeight: "1.5", fontWeight: "500" }],
        "body-2-semibold": ["14px", { lineHeight: "1.5", fontWeight: "600" }],
        "body-3": ["12px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-3-medium": ["12px", { lineHeight: "1.5", fontWeight: "500" }],
        "body-3-semibold": ["12px", { lineHeight: "1.5", fontWeight: "600" }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
