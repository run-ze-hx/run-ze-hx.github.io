import { Link } from 'react-router-dom';
import { useI18nStore } from '@store/i18nStore';
import { posts } from '@content/posts';

const ACCENTS = ['#FFD700', '#8B7355', '#5C4A1A', '#D4AF37', '#FFF4C8'];

export default function ArticlesPanel() {
  const t = useI18nStore((s) => s.t);
  const featured = posts.slice(0, 5);

  return (
    <div className="w-[380px]">
      {/* Header bar — magazine masthead style */}
      <div className="px-5 py-3 flex items-end justify-between border-b border-magenta/20 bg-gradient-to-r from-magenta/[0.06] to-transparent">
        <div>
          <div className="font-mono text-[9px] tracking-[0.4em] text-magenta/60">
            FEATURED · SERIES
          </div>
          <h3 className="font-display text-xl font-black text-white mt-0.5">
            {t('panel.articles')}
            <span className="ml-2 text-[10px] font-mono text-white/40 align-middle">
              ISSUE·01
            </span>
          </h3>
        </div>
        <Link
          to="/posts"
          className="font-mono text-[10px] text-magenta/80 hover:text-magenta tracking-widest"
        >
          {t('articles.viewAll')}
        </Link>
      </div>

      {featured.length === 0 ? (
        <p className="px-5 py-6 text-xs text-white/40 font-mono">
          {t('articles.empty')}
        </p>
      ) : (
        <ul className="py-1">
          {featured.map((p, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <li key={p.slug}>
                <Link
                  to={`/posts/${p.slug}`}
                  className="group flex items-center gap-3 px-5 py-2.5 hover:bg-cyan/[0.04] transition-colors border-l-2 border-transparent hover:border-cyan"
                  style={{ ['--accent' as string]: accent }}
                >
                  {/* Big issue number */}
                  <span
                    className="font-display text-2xl font-black w-8 text-center opacity-30 group-hover:opacity-100 transition-opacity"
                    style={{ color: accent }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] text-white/90 group-hover:text-cyan transition truncate font-medium">
                      {p.title}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="font-mono text-[9px] tracking-widest px-1.5 py-px rounded"
                        style={{
                          color: accent,
                          background: `${accent}15`,
                          border: `1px solid ${accent}40`,
                        }}
                      >
                        {p.level}
                      </span>
                      <span className="font-mono text-[9px] text-white/30">
                        {p.date} · {p.readTime}m
                      </span>
                    </div>
                  </div>

                  <span
                    className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: accent }}
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <div className="px-5 py-2 border-t border-white/5 flex items-center justify-between">
        <span className="font-mono text-[9px] text-white/30 tracking-widest">
          UPDATED · {new Date().toISOString().slice(0, 10)}
        </span>
        <span className="font-mono text-[9px] text-neon-green/70 tracking-widest">
          ● LIVE FEED
        </span>
      </div>
    </div>
  );
}
