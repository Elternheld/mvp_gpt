import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F58A7B",     // ElternHeld Primärfarbe
        greenAccent: "#94C973", // ElternHeld Grün
        blueAccent: "#A0D2EB",  // ElternHeld Blau
        background: "#FFF6EC",  // ElternHeld Hintergrund
        textMain: "#2E2E2E",    // ElternHeld Textfarbe
        textSecondary: "#C8C8C8" // ElternHeld Sekundärtext
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
      }
    },
  },
  plugins: [],
};
export default config;
