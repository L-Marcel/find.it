/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        roboto: "var(--font-roboto)",
        inter: "var(--font-inter)",
        tilt: "var(--font-tilt-warp)",
      },
      variants: {
        textColor: ["group-focus"],
      },
      screens: {
        xs: "420px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwindcss-animate"),
    function ({ addVariant }: unknown) {
      addVariant("firefox", ":-moz-any(&)");
    },
  ],
};

export default config;
