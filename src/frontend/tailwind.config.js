import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
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
        serif: ["'Playfair Display'", "Georgia", "'Times New Roman'", "serif"],
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        playfair: ["'Playfair Display'", "Georgia", "serif"],
        inter: ["'Inter'", "sans-serif"],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        brand: {
          red: "#CC0000",
          "red-dark": "#8B0000",
          "red-muted": "#990000",
          black: "#0D0D0D",
          "black-rich": "#1A1A1A",
          card: "#1E1E1E",
          gold: "#FFD700",
          "gold-dim": "#B8960C",
          white: "#FFFFFF",
          "wa-green": "#25D366",
          "wa-dark": "#128C7E",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        "red-sm": "0 4px 12px rgba(204,0,0,0.25)",
        "red-md": "0 8px 24px rgba(204,0,0,0.35)",
        "red-lg": "0 16px 48px rgba(204,0,0,0.4)",
        "red-glow": "0 0 20px rgba(204,0,0,0.4), 0 0 40px rgba(204,0,0,0.15)",
        "gold-sm": "0 4px 12px rgba(255,215,0,0.25)",
        "gold-glow": "0 0 15px rgba(255,215,0,0.5)",
        "card-dark": "0 8px 32px rgba(0,0,0,0.5)",
        "lift": "0 20px 40px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #8B0000 0%, #CC0000 30%, #1A1A1A 70%, #0D0D0D 100%)",
        "red-gradient": "linear-gradient(135deg, #CC0000 0%, #8B0000 100%)",
        "dark-gradient": "linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%)",
        "card-gradient": "linear-gradient(180deg, #2A0000 0%, #1E1E1E 50%)",
        "gold-gradient": "linear-gradient(135deg, #FFD700 0%, #B8960C 100%)",
        "wa-gradient": "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        "insta-gradient": "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)",
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
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255,215,0,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(255,215,0,0)" },
        },
        "price-pop": {
          "0%": { transform: "scale(1.3)", color: "#FFD700" },
          "100%": { transform: "scale(1)", color: "#FFFFFF" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 3s linear infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "price-pop": "price-pop 0.4s ease-out",
        "spin-slow": "spin-slow 8s linear infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
