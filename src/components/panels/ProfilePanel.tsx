import { useEffect, useState } from 'react';
import { useI18nStore } from '@store/i18nStore';

const stats = [
  { value: '3+', label: 'YEARS' },
  { value: '57', label: 'NOTES' },
  { value: '8', label: 'POSTS' },
];

function useCountUp(value: string, duration = 1200, delay = 450) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf = 0;
    let startTime = 0;
    const startAt = performance.now() + delay;
    const tick = (now: number) => {
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (!startTime) startTime = now;
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delay]);
  return `${display}${suffix}`;
}

function Stat({ value, label }: { value: string; label: string }) {
  const display = useCountUp(value);
  return (
    <div className="text-center">
      <div className="font-display text-xl font-black text-cyan neon-text">
        {display}
      </div>
      <div className="font-mono text-[9px] text-white/40 tracking-widest mt-0.5">
        {label}
      </div>
    </div>
  );
}

export default function ProfilePanel() {
  const t = useI18nStore((s) => s.t);

  return (
    <div className="w-[340px]">
      {/* Hero header — gradient banner with avatar */}
      <div className="relative h-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,215,0,0.35) 0%, rgba(92,74,26,0.55) 50%, rgba(139,115,85,0.45) 100%)',
          }}
        />
        {/* scanlines */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 3px)',
          }}
        />
        <div className="absolute top-2 left-3 font-mono text-[9px] tracking-[0.4em] text-white/80">
          ID://YFT-001
        </div>
        <div className="absolute top-2 right-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-[0_0_6px_#D4AF37] animate-pulse" />
          <span className="font-mono text-[9px] tracking-widest text-neon-green/80">
            ONLINE
          </span>
        </div>
      </div>

      {/* Avatar */}
      <div className="px-5 -mt-10 relative">
        <div className="relative w-20 h-20">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, #FFD700, #8B7355, #FFF4C8, #FFD700)',
              animation: 'spin-slow 20s linear infinite',
            }}
          />
          <div className="absolute inset-[3px] rounded-full bg-void grid place-items-center">
            <span className="font-display font-black text-3xl text-cyan neon-text">
              杨
            </span>
          </div>
        </div>
      </div>

      {/* Identity */}
      <div className="px-5 pt-3">
        <h2 className="font-display text-xl font-black text-white tracking-tight">
          {t('app.title')}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono text-[10px] text-cyan tracking-widest">
            {t('app.role').toUpperCase()}
          </span>
          <span className="text-cyan/30">/</span>
          <span className="font-mono text-[10px] text-magenta tracking-widest">
            BEIJING
          </span>
        </div>
        <p className="mt-3 text-[12px] text-white/65 leading-relaxed">
          {t('profile.summary')}
        </p>
      </div>

      {/* Stats row */}
      <div className="mx-5 mt-4 grid grid-cols-3 gap-2 py-3 border-y border-cyan/15">
        {stats.map((s) => (
          <Stat key={s.label} value={s.value} label={s.label} />
        ))}
      </div>

      {/* Tag cloud */}
      <div className="px-5 py-3 flex flex-wrap gap-1.5">
        {['React', 'TypeScript', 'Vite', 'Three.js', 'Zustand', 'R3F'].map(
          (tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-mono tracking-wide text-cyan/80 border border-cyan/25 rounded bg-cyan/[0.04]"
            >
              #{tag}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
