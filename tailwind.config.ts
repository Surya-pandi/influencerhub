import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#09051A",
        magenta: "#FF2D9A",
        violet: "#6C3BFF",
        sky: "#00C2FF",
        mint: "#2EE59D",
        coral: "#FF7A59",
        paper: "#F8FBFF",
      },
      boxShadow: {
        glow: "0 22px 70px rgba(108, 59, 255, 0.18)",
        soft: "0 18px 48px rgba(9, 5, 26, 0.10)",
      },
      backgroundImage: {
        "hub-gradient": "linear-gradient(135deg, #FF2D9A 0%, #6C3BFF 55%, #00C2FF 100%)",
        "warm-gradient": "linear-gradient(135deg, #FF2D9A 0%, #FF7A59 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
