module.exports = {
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-animate"),
    require("tailwindcss-autofill"),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BB9244",
        secondary: "#D4AF37",
        background: "#0C2543",
      },
    },
  },
};
