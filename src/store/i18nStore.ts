import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { zhDict } from '@lib/i18n/zh';
import { enDict } from '@lib/i18n/en';

export type Lang = 'zh' | 'en';
type Dict = Record<string, string>;

export const dicts: Record<Lang, Dict> = { zh: zhDict, en: enDict };

function detectInitial(): Lang {
  if (typeof navigator === 'undefined') return 'zh';
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

interface I18nStore {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string) => string;
}

export const useI18nStore = create<I18nStore>()(
  persist(
    (set, get) => ({
      lang: detectInitial(),
      setLang: (l) => set({ lang: l }),
      toggle: () => set((s) => ({ lang: s.lang === 'zh' ? 'en' : 'zh' })),
      t: (key) => {
        const { lang } = get();
        return dicts[lang][key] ?? dicts.zh[key] ?? key;
      },
    }),
    { name: 'yft-i18n' },
  ),
);
