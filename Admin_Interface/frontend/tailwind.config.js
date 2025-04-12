/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        text: "text 5s ease infinite",
        borderShine: "borderShine 5s linear infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        borderShine: {
          "0%": { borderImageSource: "linear-gradient(to right, #6366F1, #9333EA)" },
          "50%": { borderImageSource: "linear-gradient(to right, #9333EA, #6366F1)" },
          "100%": { borderImageSource: "linear-gradient(to right, #6366F1, #9333EA)" },
        },
      },
      borderImageSlice: {
        1: "1",
      },
      fontFamily: {
        sans: ['"PT Sans"', "sans-serif"],
        serif: ['"Merriweather"', "serif"],
        mono: ['"Fira Code"', "monospace"],
        display: ['"Oswald"', "sans-serif"],
        body: ['"Open Sans"', "sans-serif"],
        handwriting: ['"Dancing Script"', "cursive"],
        cormorant: ['"Cormorant Garamond"', "serif"],
        dosis: ['"Dosis"', "sans-serif"],
        ledger: ['"Ledger"', "serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
        nunito: ['"Nunito"', "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
        playwrite: ['"Playwrite VN"', "sans-serif"],
        raleway: ['"Raleway"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
