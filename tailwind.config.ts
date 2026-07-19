import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F4EC",
        paper2: "#EFEADC",
        ink: "#1B1A17",
        ink2: "#57534A",
        rule: "#DAD4C2",
        signal: "#2F6F4E",
        signalDim: "#DDE9E0",
        amber: "#B4791F",
        amberDim: "#F1E4CC",
        flag: "#A6402F",
      },
      fontFamily: {
        display: ["Georgia", "Iowan Old Style", "Palatino Linotype", "serif"],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 1px 1px, rgba(27,26,23,0.06) 1px, transparent 0)",
      },
      backgroundSize: {
        grain: "3px 3px",
      },
    },
  },
  plugins: [],
};
export default config;
