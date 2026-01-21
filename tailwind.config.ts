module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: 'jit',
  theme: {
    fontFamily: {
      body: ['Poppins', 'sans-serif'],
      heading: 'Pecita',
      ink_free: 'Ink Free',
    },
    extend: {
      spacing: {
        68: '280px',
      },
      width: {
        22: '22.5rem',
        70: '17rem',
      },
      container: {
        center: true, // Center the container
        padding: '1rem', // Default padding
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1170px', // Custom container width for xl
          '2xl': '1170px', // Ensure the container does not grow beyond 1170px
        },
      },
      height: {
        84: '22rem',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      primary: '#00da92',
      black: '#000000',
      secondary: '#12312b',
      red: '#FF5454',
      grey: '#9E9E9E',
      'light-primary': '#262F2D',
      'lighter-primary': '#C4E5DC',
      'body-primary': '#1B2422',
      'light-blue': '#49a8ff',
      'light-grey': '#A8A8A8',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
