// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      textColor: {
        default: colors.black,
        surface: colors.black,
        primary: colors.white,
        secondary: colors.black,
        destructive: {
          DEFAULT: colors.white,
          link: colors.red[600],
        },
        link: colors.blue[600],
        disabled: colors.gray[400],
      },
      backgroundColor: {
        root: colors.gray[50],
        surface: colors.white,
        primary: colors.black,
        secondary: colors.gray[100],
        destructive: colors.red[600],
        disabled: colors.gray[200],
      },
      zIndex: {
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
        110: "110",
        120: "120",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".scrollbar-none": {
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
