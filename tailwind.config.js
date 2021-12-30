module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridRow: {
        "span-16": "span 16 / span 16",
      },
      gridRowStart: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
      },
      gridRowEnd: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
      },
    },
    lineHeight: {
      "extra-loose": "2.5",
      12: "3rem",
      14: "4rem",
    },
  },
  plugins: [],
};
