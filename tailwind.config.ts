import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080C",
        surface: "#111118",
        "ice-blue": "#00D4FF",
        "soft-blue": "#7EC8E3",
        "text-primary": "#F0F0F5",
        "text-muted": "#6B6B80",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Playfair Display", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
