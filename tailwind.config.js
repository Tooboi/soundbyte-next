/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'brand': {
          100: '#fdf0cf',
          200: '#fbe29e',
          300: '#fad36e',
          400: '#f8c53d',
          500: '#f6b60d',
          600: '#c5920a',
          700: '#946d08',
          800: '#624905',
          900: '#312403',
        }
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
