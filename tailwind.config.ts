import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      animation: {
        "gradient-x": "gradient-x 200s linear infinite",
      },
      backgroundImage: {
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      dropShadow: {
        hard: "5px 10px 2px rgb(0 0 0 / 0.8)",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-position": "left center",
            "background-size": "200% 200%",
          },
          "50%": {
            "background-position": "center center",
            "background-size": "200% 200%",
          },
        },
      },
      transitionDuration: {
        "2000": "2000ms",
      },
    },
  },
};
export default config;
