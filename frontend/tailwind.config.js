/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.html",
  ],

  theme: {
    extend: {

      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          700: "#1d4ed8",
          900: "#1e40af",
        },

        secondary: {
          50: "#f3f4f6",
          500: "#6b7280",
          700: "#4b5563",
          900: "#374151",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },

        slideUp: {
          "0%": {
            transform: "translateY(10px)",
            opacity: "0",
          },

          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },

      spacing: {
        18: "4.5rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
        40: "10rem",
        48: "12rem",
        64: "16rem",
        80: "20rem",
        96: "24rem",
      },

      borderRadius: {
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.75rem",
        full: "9999px",
      },

      boxShadow: {
        lg: "0 10px 15px -3px rgba(0,0,0,0.1)",
        xl: "0 20px 25px -5px rgba(0,0,0,0.1)",
      },
    },
  },

  plugins: [],
};