import { useI18nStore } from '@store/i18nStore';
import Magnetic from '@components/ui/Magnetic';

export default function LangSwitcher() {
  const lang = useI18nStore((s) => s.lang);
  const toggle = useI18nStore((s) => s.toggle);
  return (
    <Magnetic strength={4}>
      <button onClick={toggle} className="term-btn" aria-label="Toggle language">
        {lang === 'zh' ? 'EN' : '中'}
      </button>
    </Magnetic>
  );
}
