import { useI18nStore } from '@store/i18nStore';

interface Channel {
  key: string;
  label: string;
  handle: string;
  href: string;
  icon: 'github' | 'mail' | 'wechat' | 'rss';
  accent: string;
}

const channels: Channel[] = [
  {
    key: 'contact.github',
    label: 'GitHub',
    handle: '@yanglinfeng',
    href: 'https://github.com/',
    icon: 'github',
    accent: '#00F0FF',
  },
  {
    key: 'contact.email',
    label: 'Email',
    handle: 'yanglinfeng@example.com',
    href: 'mailto:yanglinfeng@example.com',
    icon: 'mail',
    accent: '#FF2EA0',
  },
  {
    key: 'contact.weixin',
    label: 'WeChat',
    handle: 'ylinfeng_dev',
    href: '#',
    icon: 'wechat',
    accent: '#2DFFB9',
  },
];

function Icon({ kind, color }: { kind: Channel['icon']; color: string }) {
  const common = { width: 20, height: 20, fill: 'none', stroke: color, strokeWidth: 1.6 };
  switch (kind) {
    case 'github':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.85 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.22-3.37-1.22-.46-1.17-1.11-1.48-1.11-1.48-.9-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.04 10.04 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case 'wechat':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M8.5 4C4.9 4 2 6.5 2 9.6c0 1.7.9 3.3 2.4 4.3L4 16l2.3-1.2c.7.2 1.4.3 2.2.3.3 0 .6 0 .9-.1" />
          <path d="M22 14.4c0-2.6-2.5-4.7-5.5-4.7s-5.5 2.1-5.5 4.7c0 2.6 2.5 4.7 5.5 4.7.7 0 1.4-.1 2.1-.3L20.5 20l-.4-1.7c1.2-.8 1.9-2.1 1.9-3.5Z" />
          <circle cx="6.5" cy="9" r=".7" fill={color} stroke="none" />
          <circle cx="10" cy="9" r=".7" fill={color} stroke="none" />
          <circle cx="14.5" cy="14" r=".6" fill={color} stroke="none" />
          <circle cx="17.5" cy="14" r=".6" fill={color} stroke="none" />
        </svg>
      );
    case 'rss':
    default:
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M4 11a9 9 0 0 1 9 9" />
          <path d="M4 4a16 16 0 0 1 16 16" />
          <circle cx="5" cy="19" r="1" />
        </svg>
      );
  }
}

export default function ContactPanel() {
  const t = useI18nStore((s) => s.t);

  return (
    <div className="w-[300px]">
      <div className="px-5 py-3 border-b border-neon-green/20 bg-gradient-to-r from-neon-green/[0.06] to-transparent">
        <div className="font-mono text-[9px] tracking-[0.4em] text-neon-green/70">
          CHANNELS · OPEN
        </div>
        <h3 className="font-display text-xl font-black text-white mt-0.5">
          {t('panel.contact')}
        </h3>
      </div>

      <ul className="py-3 space-y-2 px-3">
        {channels.map((c) => (
          <li key={c.key}>
            <a
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="group flex items-center gap-3 px-3 py-2 rounded-full border border-white/10 hover:bg-white/[0.04] transition-colors"
              style={{
                ['--accent' as string]: c.accent,
              }}
            >
              <span
                className="w-9 h-9 rounded-full grid place-items-center border transition-all group-hover:scale-110"
                style={{
                  borderColor: `${c.accent}50`,
                  background: `${c.accent}10`,
                }}
              >
                <Icon kind={c.icon} color={c.accent} />
              </span>
              <div className="flex-1 min-w-0">
                <div
                  className="text-[12px] font-mono tracking-wider transition-colors"
                  style={{ color: c.accent }}
                >
                  {c.label.toUpperCase()}
                </div>
                <div className="text-[10px] text-white/45 font-mono truncate">
                  {c.handle}
                </div>
              </div>
              <span className="font-mono text-[10px] text-white/30 group-hover:text-white/60 transition">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mx-5 my-3 p-3 rounded-lg border border-cyan/15 bg-cyan/[0.03] flex items-center gap-3">
        {/* Mini QR — programmatic */}
        <div className="w-14 h-14 rounded bg-void p-1.5 grid place-items-center">
          <svg viewBox="0 0 21 21" className="w-full h-full">
            <rect width="21" height="21" fill="transparent" />
            {/* Fake QR cells for vibe */}
            {Array.from({ length: 21 }).map((_, y) =>
              Array.from({ length: 21 }).map((_, x) => {
                const filled = (x * 7 + y * 11 + ((x * y) % 5)) % 3 === 0;
                if (!filled) return null;
                return (
                  <rect
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    width={1}
                    height={1}
                    fill={x < 7 && y < 7 ? '#00F0FF' : x > 13 && y < 7 ? '#FF2EA0' : x < 7 && y > 13 ? '#7B2FFF' : '#fff'}
                  />
                );
              }),
            )}
            {/* Position markers */}
            <rect x="0" y="0" width="7" height="7" fill="none" stroke="#00F0FF" strokeWidth="1" />
            <rect x="14" y="0" width="7" height="7" fill="none" stroke="#FF2EA0" strokeWidth="1" />
            <rect x="0" y="14" width="7" height="7" fill="none" stroke="#7B2FFF" strokeWidth="1" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="font-mono text-[10px] text-cyan/80 tracking-widest">
            SCAN · CONNECT
          </div>
          <div className="font-mono text-[9px] text-white/40 mt-1 leading-snug">
            扫码加我微信
            <br />
            备注来自网站
          </div>
        </div>
      </div>
    </div>
  );
}
