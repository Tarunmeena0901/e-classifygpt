import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spaceMono: ["var(--font-spaceMono)"],
      },
    },
  },
  plugins: [plugin(function ({ addUtilities } : {addUtilities : any}) {
    addUtilities({
      '.scrollbar-hide': {
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }
    }
    )
  })],
};
export default config;
