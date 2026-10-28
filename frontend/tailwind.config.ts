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
        brand: {
          burgundy: "#5A1D16",
          maroon: "#6B241A",
          gold: "#E9B13A",
          "gold-hover": "#D89F28",
          dark: "#3D221B",
          body: "#6F6864",
          cream: "#FFF8F5",
          whatsapp: "#25D366",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        pill: "30px",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(46, 26, 20, 0.07)",
        hover: "0 18px 40px rgba(90, 29, 22, 0.14)",
        gold: "0 10px 25px rgba(233, 177, 58, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
