import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        minimal: "0 1px 3px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
        blue: {
          DEFAULT: "hsl(var(--blue))",
          foreground: "hsl(var(--blue-foreground))",
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
        h4Medium: ["20px", { lineHeight: "1.2", fontWeight: "500" }],
        body1: ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        body1Medium: ["16px", { lineHeight: "1.5", fontWeight: "500" }],
        body1Semibold: ["16px", { lineHeight: "1.5", fontWeight: "600" }],
        body2: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        body2Medium: ["14px", { lineHeight: "1.5", fontWeight: "500" }],
        body2Semibold: ["14px", { lineHeight: "1.5", fontWeight: "600" }],
        body3: ["12px", { lineHeight: "1.5", fontWeight: "400" }],
        body3Medium: ["12px", { lineHeight: "1.5", fontWeight: "500" }],
        body3Semibold: ["12px", { lineHeight: "1.5", fontWeight: "600" }],
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
