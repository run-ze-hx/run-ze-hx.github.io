import { useEffect, useState } from 'react';

interface ClockState {
  date: string;
  time: string;
  seconds: string;
  weekday: string;
}

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function now(): ClockState {
  const d = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return {
    date: `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
    seconds: pad(d.getSeconds()),
    weekday: WEEKDAYS[d.getDay()],
  };
}

export default function HudClock() {
  const [t, setT] = useState<ClockState>(now);

  useEffect(() => {
    const id = setInterval(() => setT(now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-3 font-mono select-none">
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-[0_0_6px_#D4AF37] animate-pulse" />
        <span className="text-[10px] text-neon-green/80 tracking-widest">
          SYNC
        </span>
      </div>
      <div className="text-[10px] text-white/40 tracking-widest">
        {t.weekday}
      </div>
      <div className="text-[10px] text-cyan tracking-widest">
        {t.date}
      </div>
      <div className="flex items-baseline gap-0.5">
        <span className="text-[13px] text-white font-bold tracking-wider neon-text">
          {t.time}
        </span>
        <span className="text-[10px] text-magenta/80 tracking-wider">
          :{t.seconds}
        </span>
      </div>
      <span className="text-[9px] text-white/30 tracking-widest">
        UTC+8
      </span>
    </div>
  );
}
