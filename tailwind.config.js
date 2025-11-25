/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1152px',
      },
    },
    extend: {
      colors: {
        // Custom color system
        primary: {
          DEFAULT: '#10B981', // emerald-500
          dark: '#059669', // emerald-600
          light: '#6EE7B7', // emerald-300
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        accent: {
          DEFAULT: '#FBBF24', // amber-400
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        navy: {
          DEFAULT: '#020617', // slate-950
          900: '#0F172A', // slate-900
          800: '#1E293B', // slate-800
          700: '#334155', // slate-700
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-noto-sans-arabic)', 'sans-serif'],
      },
      fontSize: {
        // Fluid typography using clamp
        'xs': ['clamp(0.625rem, 0.5rem + 0.25vw, 0.75rem)', { lineHeight: '1.5em' }],
        'sm': ['clamp(0.75rem, 0.65rem + 0.35vw, 0.875rem)', { lineHeight: '1.5em' }],
        'base': ['clamp(0.875rem, 0.75rem + 0.4vw, 1rem)', { lineHeight: '1.5em' }],
        'lg': ['clamp(1rem, 0.85rem + 0.5vw, 1.125rem)', { lineHeight: '1.5em' }],
        'xl': ['clamp(1.125rem, 0.95rem + 0.6vw, 1.25rem)', { lineHeight: '1.375em' }],
        '2xl': ['clamp(1.5rem, 1.25rem + 0.8vw, 1.875rem)', { lineHeight: '1.375em' }],
        '3xl': ['clamp(1.875rem, 1.5rem + 1.2vw, 2.5rem)', { lineHeight: '1.2em' }],
        '4xl': ['clamp(2.25rem, 1.75rem + 1.5vw, 3rem)', { lineHeight: '1.2em' }],
      },
      borderRadius: {
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'slide-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(50px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'fade-in-down': 'fade-in-down 0.6s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.6s ease-out',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '8px',
        'md': '12px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
