import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSceneStore } from '@store/sceneStore';
import { useI18nStore } from '@store/i18nStore';
import { posts } from '@content/posts';

export default function Posts() {
  const setRouteMode = useSceneStore((s) => s.setRouteMode);
  const t = useI18nStore((s) => s.t);

  useEffect(() => {
    setRouteMode('page');
  }, [setRouteMode]);

  return (
    <div className="relative min-h-screen pt-28 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-12">
          <div className="font-mono text-[10px] tracking-[0.5em] text-cyan/60 mb-2">
            {posts.length} {t('posts.count')}
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black text-white neon-text">
            {t('posts.title')}
          </h1>
          <p className="mt-4 text-white/50 max-w-2xl">
            {t('app.tagline')}
          </p>
        </header>

        <ul className="grid gap-6">
          {posts.map((p, i) => (
            <li key={p.slug}>
              <Link
                to={`/posts/${p.slug}`}
                className="group block p-6 rounded-xl border border-white/10 bg-deep/30 backdrop-blur-sm hover:border-cyan/40 hover:bg-cyan/[0.03] transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="font-display text-3xl font-black text-white/10 group-hover:text-cyan/40 transition tracking-tight">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-magenta/40 text-magenta/90 bg-magenta/5 tracking-widest">
                        {p.level}
                      </span>
                      <span className="font-mono text-[10px] text-white/30">
                        {p.date} · {p.readTime}m
                      </span>
                    </div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-cyan transition">
                      {p.title}
                    </h2>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-2">
                      {p.excerpt}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.map((tg) => (
                        <span
                          key={tg}
                          className="px-1.5 py-0.5 text-[9px] font-mono text-cyan/60 border border-cyan/20 rounded bg-cyan/[0.03]"
                        >
                          #{tg}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-cyan/30 group-hover:text-cyan group-hover:translate-x-1 transition font-mono">
                    →
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
