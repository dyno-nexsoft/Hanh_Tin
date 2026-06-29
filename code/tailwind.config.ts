import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Legacy (kept for compatibility)
        'wedding-red': '#7B171B',
        'wedding-red-accent': '#8B1E24',
        'wedding-cream': '#FFFFFF',
        'wedding-cream-dark': '#F9F9F9',
        'wedding-dark': '#333333',
        'wedding-gray': '#666666',
        // Luxury dark palette
        'luxury-black': '#080808',
        'luxury-dark': '#0D0D0D',
        'luxury-card': '#1C1611',
        'luxury-espresso': '#1A0A00',
        'luxury-burgundy': '#1A0507',
        'gold': '#C9A84C',
        'gold-light': '#E8C97A',
        'gold-pale': '#F5E6C0',
        'ivory': '#F8F3E8',
        'ivory-dark': '#F0E8D8',
        'rose-deep': '#8B2230',
      },
      fontFamily: {
        script: ['var(--font-great-vibes)', 'cursive'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      keyframes: {
        petalFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        goldPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        softFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'petal-fall': 'petalFall var(--duration, 4s) var(--delay, 0s) ease-in infinite',
        'shimmer': 'shimmer 3s ease infinite',
        'fade-slide-up': 'fadeSlideUp 0.8s cubic-bezier(0.25, 0, 0, 1) forwards',
        'gold-pulse': 'goldPulse 2.5s ease-in-out infinite',
        'soft-float': 'softFloat 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
