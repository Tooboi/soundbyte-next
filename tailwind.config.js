/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brand: {
          100: "#fdf0cf",
          200: "#fbe29e",
          300: "#fad36e",
          400: "#f8c53d",
          500: "#f6b60d",
          600: "#c5920a",
          700: "#946d08",
          800: "#624905",
          900: "#312403",
        },
        byte: {
          50: '#fbf4ef',
          100: '#f8ebde',
          200: '#f1d1b6',
          300: '#ebb184',
          400: '#e78750',
          500: '#e9713a',
          600: '#db4a1a',
          700: '#b93413',
          800: '#992b15',
          900: '#7d2412',
          950: '#470e05',
        },
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
  daisyui: {
    themes: [],
  },
};
