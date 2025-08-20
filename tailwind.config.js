/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF7F2',
        foreground: '#131313',
        primary: '#F59E0B',
        'primary-dark': '#D97706',
      },
      fontFamily: {
        sans: ['GT Pressura Mono', 'monospace'],
        'gt-mono': ['GT Pressura Mono', 'monospace'],
        'gt-mono-light': ['GT Pressura Mono', 'monospace'],
        'gt-mono-regular': ['GT Pressura Mono', 'monospace'],
      },
      fontSize: {
        'headline': ['clamp(2.5rem,8vw,6rem)', { lineHeight: '1.1' }],
        'subheadline': ['clamp(1.5rem,4vw,3rem)', { lineHeight: '1.2' }],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}
