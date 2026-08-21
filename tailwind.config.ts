import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          ivory: "#F8F6F2",
          cream: "#FAF8F5",
          sand: "#EFECE6",
          beige: "#EDE8DF",
          champagne: "#F4EFE6",
          gold: {
            light: "#DFC69A",
            DEFAULT: "#C5A880",
            dark: "#A6865A",
            metallic: "#D4AF37",
            shimmer: "#F0D590",
          },
          charcoal: {
            light: "#2C2C2E",
            DEFAULT: "#1C1B19",
            dark: "#121213",
            black: "#0B0B0C",
          },
          muted: {
            light: "#797670",
            dark: "#A39F99",
          }
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Montserrat", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up": "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s infinite linear",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      boxShadow: {
        "luxury-sm": "0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
        "luxury-md": "0 12px 30px -10px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)",
        "luxury-lg": "0 20px 40px -15px rgba(0, 0, 0, 0.12), 0 8px 20px -6px rgba(0, 0, 0, 0.05)",
        "luxury-gold": "0 8px 25px rgba(197, 168, 128, 0.28)",
        "luxury-gold-lg": "0 14px 35px rgba(212, 175, 55, 0.35)",
        "dark-card": "0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
