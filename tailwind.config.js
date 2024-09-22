/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        italianno: ['Italianno', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins','sans-serif'],
      },
      colors: {
        primary: '#FFFFFF',
        secondary: '#C10C99',
        tertiary: '#B5B5B5',
        quaternary: '#CD46D9',
        gradientStart: '#CD46D9',
        gradientEnd: '#27C5C9',
        bg: '#2F3133',
      },
      fontSize: {
        'tiny': '13px',
      },
    },
  },
  plugins: [
  ],
}

