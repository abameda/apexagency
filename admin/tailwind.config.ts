import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A",
        surface: "#111111",
        elevated: "#1A1A1A",
        border: "rgba(255,255,255,0.08)",
        "text-primary": "#FFFFFF",
        "text-secondary": "rgba(255,255,255,0.5)",
        "text-muted": "rgba(255,255,255,0.25)",
        "glass-fill": "rgba(255,255,255,0.03)",
        "hover-subtle": "rgba(255,255,255,0.06)",
        "hover-strong": "rgba(255,255,255,0.1)",
        success: "#22C55E",
        danger: "#EF4444",
        warning: "#F59E0B",
      },
      fontFamily: {
        heading: ["Orbitron", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
