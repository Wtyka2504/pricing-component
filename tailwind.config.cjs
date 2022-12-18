/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      borderRadius: {
        basic: ".8rem",
        btn: "2.05rem",
      },
      boxShadow: {
        basic: "0px 20px 30px -5px rgba(127, 137, 185, 0.152073)",
      },
    },
    fontSize: {
      "3xl": "4rem",
      "2xl": "3.2rem",
      xl: "2.8rem",
      l: "2rem",
      m: " 1.6rem",
      s: "1.5rem",
      xs: "1.4rem",
      "2xs": "1.3rem",
      "3xs": "1.2rem",
      tiny: "1rem",
    },
    container: {
      center: true,
      screens: {},
    },
    screens: {
      desktop: "400px",
    },
    spacing: {
      0: "0px",
      5: ".5rem",
      8: ".8rem",
      10: "1rem",
      12: "1.2rem",
      16: "1.6rem",
      24: "2.4rem",
      32: "3.2rem",
      34: "3.4rem",
      38: "3.8rem",
      46: "4.6rem",
    },
    colors: {
      white: "#ffffff",
      "ghost-white-light": "#F1F5FE",
      "ghost-white": "#ECF0FB",
      "ghost-white-body": "#F9FAFF",
      "space-cadet": "#293356",
      "cool-grey": "#848EAD",
      coral: "#FF8D68",
      seashell: "#FEEDE8",
      "lavender-blue": "#BECDFF",
      celeste: "#A4F3EB",
      "turquoise-blue": "#80FFF3",
      turquoise: "#10D8C4",
      "periwinkle-crayola": "#CFD8EF",
    },
  },
  plugins: [],
};
