/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./reusable-components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#228B22",
      },
    },
  },
  plugins: [],
}

