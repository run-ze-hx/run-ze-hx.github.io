import { useEffect, useMemo, useRef, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TocProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TocProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!items.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-80px 0% -70% 0%', threshold: 0 },
    );

    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });
    observerRef.current = obs;
    return () => obs.disconnect();
  }, [items]);

  const itemsByLevel = useMemo(() => {
    const grouped: Record<string, TocItem[]> = {};
    items.forEach((it) => {
      grouped[it.level] = grouped[it.level] ?? [];
      grouped[it.level].push(it);
    });
    return grouped;
  }, [items]);

  if (!items.length) return null;

  return (
    <nav className="sticky top-32 max-h-[calc(100vh-12rem)] overflow-y-auto pr-3 pb-6">
      <div className="font-mono text-[10px] tracking-widest text-cyan/60 mb-3">
        ON · THIS · PAGE
      </div>
      <ul className="space-y-1 border-l border-white/10">
        {items.map((it) => {
          const isActive = activeId === it.id;
          return (
            <li
              key={it.id}
              style={{ paddingLeft: `${(it.level - 2) * 12 + 12}px` }}
            >
              <a
                href={`#${it.id}`}
                className={[
                  'block py-1 text-xs transition-all border-l -ml-px',
                  isActive
                    ? 'text-cyan border-cyan pl-3'
                    : 'text-white/40 hover:text-white border-transparent pl-3 hover:border-white/30',
                ].join(' ')}
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="mt-3 text-[10px] font-mono text-white/20">
        {Object.keys(itemsByLevel).length} levels · {items.length} anchors
      </div>
    </nav>
  );
}
