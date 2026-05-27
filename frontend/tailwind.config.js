/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#111827",
        secondary: "#1f2937",
        accent: "#2563eb",
        surface: "#f3f4f6",
      },
    },
  },

  plugins: [],
};
