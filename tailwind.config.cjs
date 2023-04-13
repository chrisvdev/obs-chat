/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'futura-pt': ['"futura-pt"', 'sans-serif'],
        'inter': ['"Inter"', 'sans-serif']
      },
      colors: {
        twitch: {
          mod: "#00AD03",
          mod_light: "#00E004",
          vip: "#E005B9",
          vip_light: "#FF06D3",
          sub: "#8205B4",
          sub_light: "#A806E8",
          brd: "#E7151E",
          brd_light: "#FF1721"
        }
      },
      msgShadow: `--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
      --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
      text-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);`
    },
  },
  plugins: [],
}
