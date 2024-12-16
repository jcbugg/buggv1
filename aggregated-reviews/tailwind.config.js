/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS, JSX, TS, and TSX files in the src folder
  ],
  theme: {
    extend: {
      // Custom theme extensions go here
      colors: {
        primary: '#1E3A8A', // Example custom color
        secondary: '#10B981',
      },
    },
  },
  plugins: [],
};
