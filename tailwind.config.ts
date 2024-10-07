import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightOrange: '#FF6740',
        lightPurple: '#A179C0',
        darkGray: '#262628',
        lightGray: '#484849',
        orange: '#DA7500',
        lightRed: '#FF4040',
        // Custom theme colors
        light: {
          primary: "#FFFFFF",
          secondary: "#F0F1F2",
          accent: "#E0E4E6",
          neutral: "#2a2e37",
          base: "#ffffff",
          text: "#000000",
        },
        dark: {
          primary: "#191A1C",
          secondary: "#4F4F4F",
          accent: "#2C2C2C",
          neutral: "#27272a",
          base: "#000000",
          text: "#FFFFFF",
        },
        slate: {
          primary: "#1e293b",
          secondary: "#3b82f6",
          accent: "#a78bfa",
          neutral: "#374151",
          base: "#f1f5f9",
          text: "#334155",
        },
        dracula: {
          primary: "#282a36",
          secondary: "#bd93f9",
          accent: "#50fa7b",
          neutral: "#44475a",
          base: "#f8f8f2",
          text: "#f8f8f2",
        },
      },
    },
  },
  plugins: [],
};
export default config;
