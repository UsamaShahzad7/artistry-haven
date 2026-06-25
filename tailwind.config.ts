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
        "blush-50": "#FEF4F5",
        "blush-100": "#FAE0E6",
        "blush-300": "#F0BFCA",
        "rose-gold": "#B87878",
        "rose-gold-warm": "#C4A882",
        "rose-gold-dark": "#9E5F72",
        cream: "#FFFAF8",
        "text-deep": "#6B4A50",
        "text-muted": "#9A7A80",
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
