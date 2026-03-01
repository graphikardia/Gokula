import type { Config } from "tailwindcss"

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0B0F",
        primary: "#8B5CF6",
        accent: "#00F5D4"
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        }
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out both"
      }
    }
  },
  plugins: []
} satisfies Config
