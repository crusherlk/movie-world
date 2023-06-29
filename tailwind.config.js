/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tmdbDarkBlue: "rgb(var(--tmdbDarkBlue) / 1)",
        tmdbLightGreen: "rgb(var(--tmdbLightGreen) / 1)",
        tmdbLightBlue: "rgb(var(--tmdbLightBlue) / 1)",
      },
    },
  },
  plugins: [],
};
