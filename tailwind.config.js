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
    screens: {
      xs: "576px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        byteOG: {
          50: "#fef5ee",
          100: "#f8ebde",
          200: "#f7d0b1",
          300: "#f2af7f",
          400: "#ec854b",
          500: "#e9713a",
          600: "#d84c1e",
          700: "#b4381a",
          800: "#8f2e1d",
          900: "#74281a",
          950: "#3e120c",
        },
        byte: {
          50: "#fde5d3",
          100: "#fbdec1",
          200: "#f5c299",
          300: "#f19f65",
          400: "#eb7633",
          500: "#de5617",
          600: "#c24319",
          700: "#9c3116",
          800: "#7b2718",
          900: "#602216",
          950: "#2b0c08",
        },
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
  daisyui: {
    themes: [],
  },
};
