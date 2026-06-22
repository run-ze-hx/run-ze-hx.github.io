import { useI18nStore } from '@store/i18nStore';

export default function LangSwitcher() {
  const lang = useI18nStore((s) => s.lang);
  const toggle = useI18nStore((s) => s.toggle);
  return (
    <button
      onClick={toggle}
      className="term-btn"
      aria-label="Toggle language"
    >
      {lang === 'zh' ? 'EN' : '中'}
    </button>
  );
}
