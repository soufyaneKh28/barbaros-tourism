import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#243751",
          50: "#f0f2f5",
          100: "#e1e5eb",
          200: "#c3cbd7",
          300: "#a5b1c3",
          400: "#8797af",
          500: "#243751",
          600: "#1d2c41",
          700: "#162131",
          800: "#0f1621",
          900: "#080b10",
        },
        secondary: {
          DEFAULT: "#A80045",
          50: "#ffe5f0",
          100: "#ffcce1",
          200: "#ff99c3",
          300: "#ff66a5",
          400: "#ff3387",
          500: "#A80045",
          600: "#860037",
          700: "#8a0038",
          800: "#42001b",
          900: "#21000d",
        },
      },
      fontFamily: {
        cabinet: ["var(--font-cabinet)", "sans-serif"],
        satoshi: ["var(--font-satoshi)", "sans-serif"],
      },
      borderRadius: {
        "20": "20px",
      },
    },
  },
  plugins: [],
};

export default config;

