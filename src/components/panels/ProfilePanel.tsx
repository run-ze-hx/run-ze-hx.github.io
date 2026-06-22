import { useI18nStore } from '@store/i18nStore';

const stats = [
  { value: '3+', label: 'YEARS' },
  { value: '57', label: 'NOTES' },
  { value: '8', label: 'POSTS' },
];

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
              'linear-gradient(135deg, rgba(0,240,255,0.35) 0%, rgba(123,47,255,0.25) 50%, rgba(255,46,160,0.35) 100%)',
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
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-[0_0_6px_#2DFFB9] animate-pulse" />
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
                'conic-gradient(from 0deg, #00F0FF, #7B2FFF, #FF2EA0, #00F0FF)',
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
          <div key={s.label} className="text-center">
            <div className="font-display text-xl font-black text-cyan neon-text">
              {s.value}
            </div>
            <div className="font-mono text-[9px] text-white/40 tracking-widest mt-0.5">
              {s.label}
            </div>
          </div>
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
