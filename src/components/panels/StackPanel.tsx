import { useMemo } from 'react';
import { useI18nStore } from '@store/i18nStore';

interface Skill {
  name: string;
  level: number; // 0-100
  short: string;
}

const skills: Skill[] = [
  { name: 'React', level: 92, short: 'R' },
  { name: 'TypeScript', level: 88, short: 'TS' },
  { name: 'Three.js', level: 75, short: '3D' },
  { name: 'Vite', level: 85, short: 'V' },
  { name: 'Zustand', level: 90, short: 'Z' },
  { name: 'CSS / Tailwind', level: 88, short: 'CSS' },
];

export default function StackPanel() {
  const t = useI18nStore((s) => s.t);

  // Radar geometry
  const { points, axes, gridLevels } = useMemo(() => {
    const cx = 110;
    const cy = 110;
    const radius = 80;
    const n = skills.length;

    const axes = skills.map((s, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        labelX: cx + Math.cos(angle) * (radius + 18),
        labelY: cy + Math.sin(angle) * (radius + 18),
        name: s.name,
        short: s.short,
      };
    });

    const gridLevels = [0.25, 0.5, 0.75, 1].map((lvl) =>
      skills
        .map((_, i) => {
          const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          return {
            x: cx + Math.cos(angle) * radius * lvl,
            y: cy + Math.sin(angle) * radius * lvl,
          };
        }),
    );

    const points = skills.map((s, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const r = (s.level / 100) * radius;
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        level: s.level,
        name: s.name,
      };
    });

    return { points, axes, gridLevels };
  }, []);

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="w-[320px]">
      <div className="px-5 py-3 flex items-end justify-between border-b border-violet/20 bg-gradient-to-r from-violet/[0.08] to-transparent">
        <div>
          <div className="font-mono text-[9px] tracking-[0.4em] text-violet/70">
            CAPABILITY · MATRIX
          </div>
          <h3 className="font-display text-xl font-black text-white mt-0.5">
            {t('panel.stack')}
          </h3>
        </div>
        <span className="font-mono text-[10px] text-violet/70 tracking-widest">
          6 · AXES
        </span>
      </div>

      {/* Radar SVG */}
      <div className="px-2 py-3 grid place-items-center">
        <svg width={220} height={220} viewBox="0 0 220 220">
          <defs>
            <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7B2FFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.2" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid rings */}
          {gridLevels.map((ring, i) => (
            <polygon
              key={i}
              points={ring.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="rgba(123,47,255,0.18)"
              strokeWidth={1}
              strokeDasharray={i === gridLevels.length - 1 ? '0' : '2 4'}
            />
          ))}

          {/* Axes */}
          {axes.map((a, i) => (
            <line
              key={i}
              x1={110}
              y1={110}
              x2={a.x}
              y2={a.y}
              stroke="rgba(0,240,255,0.15)"
              strokeWidth={1}
            />
          ))}

          {/* Skill polygon */}
          <polygon
            points={polygonPoints}
            fill="url(#radarFill)"
            stroke="#00F0FF"
            strokeWidth={1.5}
            filter="url(#glow)"
            style={{
              animation: 'radarPulse 4s ease-in-out infinite',
              transformOrigin: 'center',
            }}
          />

          {/* Skill points */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={3}
                fill="#FF2EA0"
                stroke="#fff"
                strokeWidth={1}
              />
            </g>
          ))}

          {/* Labels */}
          {axes.map((a, i) => (
            <g key={i}>
              <text
                x={a.labelX}
                y={a.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={9}
                fill="rgba(255,255,255,0.7)"
                fontFamily="JetBrains Mono, monospace"
                fontWeight={600}
              >
                {a.short}
              </text>
              <text
                x={a.labelX}
                y={a.labelY + 11}
                textAnchor="middle"
                fontSize={8}
                fill="rgba(0,240,255,0.5)"
                fontFamily="JetBrains Mono, monospace"
              >
                {skills[i].level}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="px-5 pb-3 grid grid-cols-2 gap-x-3 gap-y-1">
        {skills.map((s) => (
          <div
            key={s.name}
            className="flex items-center justify-between text-[10px] font-mono"
          >
            <span className="text-white/60">{s.name}</span>
            <span className="text-violet/80">{s.level}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes radarPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
