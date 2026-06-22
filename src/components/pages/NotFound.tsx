import { Link } from 'react-router-dom';
import { useI18nStore } from '@store/i18nStore';

export default function NotFound() {
  const t = useI18nStore((s) => s.t);
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <div className="font-display text-7xl text-magenta neon-text animate-flicker">
          404
        </div>
        <div className="mt-4 font-mono text-cyan/70 tracking-widest">
          {t('notfound.title')}
        </div>
        <p className="mt-2 text-white/40">{t('notfound.desc')}</p>
        <Link to="/" className="term-btn inline-block mt-8">
          {t('notfound.back')}
        </Link>
      </div>
    </div>
  );
}
