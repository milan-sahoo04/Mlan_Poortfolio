/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#39FF14", // neon green (marquee, headings)
        red: "#C0392B", // diagonal banner
        dark: "#000000", // main bg
        card: "#0a0a0a", // card bg
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Bebas Neue", "sans-serif"], // big headings like FRONTEND ENGINEER
      },
    },
  },
  plugins: [],
};
