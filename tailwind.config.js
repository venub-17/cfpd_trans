/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        ultraSm: "320px",
        maxSm: "375px",
        sm: "425px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        ultraXl: "2560px",
      },
      colors: {
        primary: {
          100: "rgb(179, 208, 247)",
          600: "rgb(2, 132, 199)", // Example primary-600 (adjust as needed)
          700: "#0369a1", // Example primary-700
          900: "#0c4a6e", // Example primary-900 for darker blue
          100: "#B3D0F7",
        },
      },
    },
  },
  plugins: [],
};
