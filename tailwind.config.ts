import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void: '#050510',
        deep: '#0A0A1F',
        cyan: { DEFAULT: '#00F0FF', glow: '#7AF5FF' },
        magenta: { DEFAULT: '#FF2EA0', glow: '#FF8AC8' },
        violet: { DEFAULT: '#7B2FFF', glow: '#B891FF' },
        neon: { green: '#2DFFB9', yellow: '#F5FF7A' },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        display: ['"Orbitron"', '"Noto Sans SC"', 'sans-serif'],
      },
      boxShadow: {
        'cyber-sm': '0 0 12px rgba(0,240,255,0.25)',
        cyber: '0 0 30px rgba(0,240,255,0.35), 0 0 60px rgba(255,46,160,0.15)',
        'cyber-lg': '0 0 50px rgba(0,240,255,0.5), 0 0 100px rgba(123,47,255,0.3)',
        'glass': '0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
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
