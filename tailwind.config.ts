import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void: '#0A0807',
        deep: '#1C1917',
        cyan: { DEFAULT: '#FFD700', glow: '#FFF4C8' },
        magenta: { DEFAULT: '#8B7355', glow: '#CA8A04' },
        violet: { DEFAULT: '#5C4A1A', glow: '#F4C430' },
        neon: { green: '#D4AF37', yellow: '#FFF4C8' },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        display: ['"Cormorant"', '"Noto Sans SC"', 'serif'],
      },
      boxShadow: {
        'cyber-sm': '0 0 12px rgba(255,215,0,0.22)',
        cyber: '0 0 30px rgba(255,215,0,0.30), 0 0 60px rgba(202,138,4,0.15)',
        'cyber-lg': '0 0 50px rgba(255,215,0,0.42), 0 0 100px rgba(212,175,55,0.25)',
        'glass': '0 30px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'flicker': 'flicker 3s linear infinite',
        'scan': 'scan 6s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '45%': { opacity: '1' },
          '50%': { opacity: '0.6' },
          '55%': { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
