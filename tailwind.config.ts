import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Main dark background and blue/teal accent colors
        'bigfi-bg': '#10141C', // main dark background
        'bigfi-panel': '#181E29', // panel/card background
        'bigfi-border': '#232B3A', // border color
        'bigfi-blue': '#1CA7EC', // blue gradient left
        'bigfi-teal': '#23D18B', // blue-green gradient right
        'bigfi-btn': '#2176AE', // button blue
        'bigfi-btn-dark': '#174A6A', // button blue dark
        'bigfi-gray': '#A3B1C6', // muted text
        'bigfi-accent': '#00CFFF', // accent cyan
      },
      backgroundImage: {
        'bigfi-gradient': 'linear-gradient(90deg, #1CA7EC 0%, #23D18B 100%)',
        'bigfi-panel-gradient': 'linear-gradient(180deg, #181E29 60%, #10141C 100%)',
      },
      boxShadow: {
        'bigfi': '0 2px 16px 0 rgba(28,167,236,0.10)',
      },
      borderRadius: {
        'bigfi': '12px',
      },
    },
  },
  plugins: [],
}

export default config 