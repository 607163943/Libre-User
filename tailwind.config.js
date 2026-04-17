/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'surface-bright': '#f7f9fc',
        'surface-container-low': '#f2f4f7',
        surface: '#f7f9fc',
        'tertiary-fixed': '#ffdbc7',
        background: '#f7f9fc',
        'surface-container-highest': '#e0e3e6',
        'on-primary-fixed': '#001c3a',
        error: '#ba1a1a',
        'on-primary-container': '#fefcff',
        'tertiary-fixed-dim': '#ffb688',
        secondary: '#40608b',
        'on-secondary-fixed-variant': '#274871',
        'on-primary-fixed-variant': '#004785',
        'tertiary-container': '#b95a00',
        'surface-tint': '#005fae',
        'inverse-on-surface': '#eff1f4',
        outline: '#707785',
        'error-container': '#ffdad6',
        'on-tertiary-fixed-variant': '#733600',
        'on-surface-variant': '#404753',
        'primary-fixed-dim': '#a5c8ff',
        'on-secondary-fixed': '#001c3a',
        'on-tertiary-fixed': '#311300',
        'surface-container-high': '#e6e8eb',
        'secondary-fixed-dim': '#a9c8f9',
        'secondary-container': '#afceff',
        'on-error': '#ffffff',
        tertiary: '#934600',
        'surface-container-lowest': '#ffffff',
        'on-secondary': '#ffffff',
        'primary-container': '#0075d5',
        'surface-container': '#eceef1',
        'primary-fixed': '#d4e3ff',
        'on-error-container': '#93000a',
        'on-tertiary': '#ffffff',
        'on-primary': '#ffffff',
        'on-secondary-container': '#385782',
        'surface-variant': '#e0e3e6',
        'outline-variant': '#c0c7d6',
        'on-surface': '#191c1e',
        'on-tertiary-container': '#fffbff',
        'inverse-surface': '#2d3133',
        'surface-dim': '#d8dadd',
        primary: '#005daa',
        'secondary-fixed': '#d4e3ff',
        'on-background': '#191c1e',
        'inverse-primary': '#a5c8ff'
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem'
      },
      fontFamily: {
        headline: ['Manrope'],
        body: ['Inter'],
        label: ['Inter']
      }
    }
  },
  plugins: []
}
