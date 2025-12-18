/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: "#00D4FF",
          orange: "#FF6B35",
          green: "#32CD32",
          pink: "#FF1493",
          purple: "#9D4EDD",
        },
      },
      fontFamily: {
        display: ['"Press Start 2P"', "cursive"],
        mono: ['"VT323"', "monospace"],
        sans: ['"VT323"', "monospace"],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'slow-pan': 'pan 20s ease-in-out infinite alternate',
        'bounce-slight': 'bounceSlight 0.5s infinite alternate',
      },
      keyframes: {
        pan: {
          '0%': { transform: 'scale(1.1) translate(0%, 0%)' },
          '100%': { transform: 'scale(1.1) translate(-2%, -2%)' },
        },
        bounceSlight: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-2px)' },
        }
      }
    },
  },
  plugins: [],
};
