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
              DEFAULT: 'hsl(var(--primary))', /* Azul Marinho Principal */
              foreground: 'hsl(var(--primary-foreground))', /* Branco para textos sobre o azul */
            },
            secondary: {
              DEFAULT: 'hsl(var(--secondary))', /* Cinza para textos secundários, ícones */
              foreground: 'hsl(var(--secondary-foreground))', /* Branco ou cor clara para textos sobre o cinza */
            },
            destructive: {
              DEFAULT: 'hsl(var(--destructive))',
              foreground: 'hsl(var(--destructive-foreground))',
            },
            muted: {
              DEFAULT: 'hsl(var(--muted))', /* Cinza claro para fundos sutis, divisores */
              foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
              DEFAULT: 'hsl(var(--accent))', /* Laranja para CTAs, destaques */
              foreground: 'hsl(var(--accent-foreground))', /* Branco para textos sobre o laranja */
            },
            success: {
              DEFAULT: 'hsl(var(--success))', /* Verde para indicadores de sucesso */
              foreground: 'hsl(var(--success-foreground))', /* Branco para texto sobre o verde */
            },
            warning: { /* Adicionado para alertas/avisos - pode ser um tom de laranja mais claro ou amarelo */
              DEFAULT: 'hsl(var(--warning))',
              foreground: 'hsl(var(--warning-foreground))',
            },
            popover: {
              DEFAULT: 'hsl(var(--popover))',
              foreground: 'hsl(var(--popover-foreground))',
            },
            card: {
              DEFAULT: 'hsl(var(--card))',
              foreground: 'hsl(var(--card-foreground))',
            },
            'edcap-orange': 'hsl(var(--accent))', /* Reutilizando o accent para laranja */
            'edcap-green': 'hsl(var(--success))', /* Reutilizando o success para verde */
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
              from: { height: '0' },
              to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
              from: { height: 'var(--radix-accordion-content-height)' },
              to: { height: '0' },
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