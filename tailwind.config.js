module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        42: '9.75rem'
      },
      height: {
        42: '9.75rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
