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
          bg: "#000000",
          raised: "#0a0805",
          surface: "#0f0c08",
          hover: "#18130a",
          border: "#261a0a",
          "border-bright": "rgba(255, 176, 0, 0.28)",
          green: "#ffb000",
          "green-bright": "#ffc233",
          "green-dim": "#805800",
          cyan: "#fbbf24",
          "cyan-bright": "#fde047",
          amber: "#ffb000",
          red: "#ef4444",
          purple: "#f59e0b",
          text: "#fef3c7",
          muted: "#b49b78",
          dim: "#786043",
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
