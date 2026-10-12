import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#07090b",
          raised: "#0d1117",
          surface: "#111620",
          hover: "#171f2c",
          border: "#1e2634",
          "border-bright": "rgba(77, 255, 136, 0.25)",
          green: "#4dff88",
          "green-bright": "#33ff99",
          "green-dim": "#237340",
          cyan: "#38bdf8",
          "cyan-bright": "#61e7ff",
          amber: "#fbbf24",
          red: "#f87171",
          purple: "#a855f7",
          text: "#f1f5f9",
          muted: "#94a3b8",
          dim: "#64748b",
        },
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
        editorial: [
          "Cinzel",
          "Trajan Pro",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanline-drift": "scanlineDrift 20s linear infinite",
        "sweep-glow": "sweepGlow 6s linear infinite",
      },
      keyframes: {
        scanlineDrift: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "0 40px" },
        },
        sweepGlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "-200% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
