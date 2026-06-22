import { NavLink } from 'react-router-dom';
import { useI18nStore } from '@store/i18nStore';

const items = [
  { to: '/', key: 'nav.home' },
  { to: '/posts', key: 'nav.posts' },
  { to: '/about', key: 'nav.about' },
];

export default function NavRail() {
  const t = useI18nStore((s) => s.t);
  return (
    <nav className="flex items-center gap-1 px-2 py-1 rounded-full border border-cyan/20 bg-deep/40 backdrop-blur-md">
      {items.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          end={it.to === '/'}
          className={({ isActive }) =>
            [
              'px-3 py-1.5 rounded-full text-xs font-mono tracking-widest transition-all',
              isActive
                ? 'bg-cyan/15 text-cyan shadow-cyber-sm'
                : 'text-white/50 hover:text-white hover:bg-white/5',
            ].join(' ')
          }
        >
          {t(it.key).toUpperCase()}
        </NavLink>
      ))}
    </nav>
  );
}
