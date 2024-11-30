import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [require('tailwindcss-logical'), require('./src/base/@core/tailwind/plugin')],
  theme: {
    extend: {
      colors: {
        backgroundTableHeader: 'var(--mui-palette-customColors-tableHeaderBg)'
      }
    }
  }
}

export default config
