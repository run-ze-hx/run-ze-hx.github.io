import { useEffect, useState } from 'react';

const MESSAGES = [
  '[SYS] frontend kernel online · react@18.3.1',
  '[NET] handshake complete · 200 OK',
  '[3D]  four-layer particle field stable · 60fps',
  '[DND] drag-overlay portal armed',
  '[ENC] hybrid AES-GCM + RSA-OAEP engaged',
  '[I18N] zh-CN / en-US dual channel',
  '[POST] 8 articles synced',
  '[GIT] main → origin/main · clean',
];

export default function HudMarquee() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % MESSAGES.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-3 font-mono text-[10px] text-white/40 tracking-widest overflow-hidden">
      <span className="text-magenta/80 shrink-0">BROADCAST</span>
      <span className="text-cyan/40 shrink-0">·</span>
      <div className="relative flex-1 overflow-hidden">
        <div
          key={idx}
          className="whitespace-nowrap"
          style={{
            animation: 'marquee-slide 0.5s ease-out',
          }}
        >
          {MESSAGES[idx]}
        </div>
      </div>
    </div>
  );
}
