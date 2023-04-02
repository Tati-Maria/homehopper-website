/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "extra-violet": "#5e17eb",
      },
      gridTemplateColumns: {
        "fluid-1": "repeat(auto-fill, minmax(300px, 1fr))",
        "fluid-2": "repeat(auto-fill, minmax(250px, 1fr))",
      },
    },
  },
  plugins: [],
}

