import { type Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require("./preset")],
} satisfies Config;
