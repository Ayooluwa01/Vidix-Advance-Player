/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        "surface-primary": "rgb(var(--surface-primary) / <alpha-value>)",
        "surface-secondary": "rgb(var(--surface-secondary) / <alpha-value>)",

        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-light": "rgb(var(--accent-light) / <alpha-value>)",

        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",

        success: "rgb(var(--success) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
