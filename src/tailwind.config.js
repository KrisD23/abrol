/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {},
  },

  safelist: [
    { pattern: /text-\[.*\]/ },
    { pattern: /bg-\[.*\]/ },
    { pattern: /border-\[.*\]/ },
  ],

  variants: {
    extend: {
      backgroundColor: ["group-hover"],
      borderColor: ["group-hover"],
      textColor: ["group-hover"],
    },
  },
};
