// tailwind.config.js
export default {
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],  // Asegúrate de que esté incluyendo el contenido correcto
    theme: {
      extend: {
        fontFamily: {
          anton: ['Anton', 'sans-serif'],  // Aquí estamos registrando la fuente Anton
        },
      },
    },
    plugins: [],
  }
  