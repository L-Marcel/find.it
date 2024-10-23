/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
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
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

export default config;
