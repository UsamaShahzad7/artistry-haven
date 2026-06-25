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
        "blush-50": "#FFF8F9",
        "blush-100": "#FCE8EC",
        "blush-300": "#F5C5CE",
        "rose-gold": "#B5727A",
        "rose-gold-dark": "#8B4F57",
        cream: "#FFFBF5",
        "text-deep": "#3D1F24",
        "text-muted": "#8B6570",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      perspective: {
        "1000": "1000px",
      },
    },
  },
  plugins: [],
};

export default config;
