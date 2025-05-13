/** @type {import('tailwindcss').Config} */
    module.exports = {
      darkMode: ['class'],
      content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
        './index.html',
      ],
      theme: {
        container: {
          center: true,
          padding: '2rem',
          screens: {
            '2xl': '1400px',
          },
        },
        extend: {
          colors: {
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
              DEFAULT: 'hsl(var(--primary))', /* Navy Blue */
              foreground: 'hsl(var(--primary-foreground))', /* White */
            },
            secondary: {
              DEFAULT: 'hsl(var(--secondary))', /* Medium Blue/Gray */
              foreground: 'hsl(var(--secondary-foreground))',
            },
            destructive: {
              DEFAULT: 'hsl(var(--destructive))',
              foreground: 'hsl(var(--destructive-foreground))',
            },
            muted: {
              DEFAULT: 'hsl(var(--muted))', /* Light Gray */
              foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
              DEFAULT: 'hsl(var(--accent))', /* Orange */
              foreground: 'hsl(var(--accent-foreground))',
            },
            popover: {
              DEFAULT: 'hsl(var(--popover))',
              foreground: 'hsl(var(--popover-foreground))',
            },
            card: {
              DEFAULT: 'hsl(var(--card))',
              foreground: 'hsl(var(--card-foreground))',
            },
            'edcap-navy': '#0A2342',
            'edcap-orange': '#F97316',
            'edcap-green': '#10B981',
            'edcap-gray': {
              light: '#F7FAFC',
              DEFAULT: '#A0AEC0',
              dark: '#4A5568',
            }
          },
          borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
          },
          fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            lato: ['Lato', 'sans-serif'],
          },
          keyframes: {
            'accordion-down': {
              from: { height: 0 },
              to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
              from: { height: 'var(--radix-accordion-content-height)' },
              to: { height: 0 },
            },
            'slide-in': {
              from: { transform: 'translateX(-100%)' },
              to: { transform: 'translateX(0)' },
            },
            'slide-out': {
              from: { transform: 'translateX(0)' },
              to: { transform: 'translateX(-100%)' },
            }
          },
          animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
            'slide-in': 'slide-in 0.3s ease-out forwards',
            'slide-out': 'slide-out 0.3s ease-out forwards',
          },
        },
      },
      plugins: [require('tailwindcss-animate')],
    };