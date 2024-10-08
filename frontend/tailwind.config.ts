import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
    },
  },
  plugins: [],
};

export default config;
