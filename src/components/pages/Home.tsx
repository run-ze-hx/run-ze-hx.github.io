import { useEffect } from 'react';
import { useSceneStore } from '@store/sceneStore';
import { useI18nStore } from '@store/i18nStore';
import { useLayoutStore } from '@store/layoutStore';
import PanelGrid from '@components/panels/PanelGrid';

export default function Home() {
  const setRouteMode = useSceneStore((s) => s.setRouteMode);
  const resetLayout = useLayoutStore((s) => s.resetLayout);
  const t = useI18nStore((s) => s.t);

  useEffect(() => {
    setRouteMode('desktop');
  }, [setRouteMode]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <PanelGrid />

      <div className="absolute inset-x-0 top-[14%] grid place-items-center pointer-events-none">
        <div className="text-center pointer-events-none">
          <div className="font-mono text-xs text-cyan/70 tracking-[0.5em] mb-6 animate-pulse">
            YFT · OS · v0.1
          </div>
          <h1 className="font-display text-6xl md:text-8xl font-black tracking-tight neon-text text-cyan">
            {t('app.title')}
          </h1>
          <p className="mt-6 font-mono text-sm md:text-base text-white/70 tracking-[0.3em]">
            {t('app.role').toUpperCase()}
          </p>
          <p className="mt-2 font-mono text-xs md:text-sm text-magenta/80 tracking-widest">
            {t('app.tagline')}
          </p>
        </div>
      </div>

      {/* Status bar — split bottom-left and bottom-right, no overlap */}
      <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none">
        <div className="flex items-end justify-between px-6 py-4">
          {/* Left: console hint */}
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/35 tracking-widest">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon-green/70 animate-pulse" />
            {t('home.consoleHint').toUpperCase()}
          </div>

          {/* Right: reset hint (clickable) */}
          <button
            onClick={resetLayout}
            className="pointer-events-auto px-3 py-1.5 rounded border border-cyan/30 bg-deep/40 backdrop-blur-md font-mono text-[10px] text-cyan/80 hover:text-cyan hover:border-cyan hover:bg-cyan/[0.08] transition tracking-widest"
          >
            [{t('home.reset').toUpperCase()}] · SHIFT+R
          </button>
        </div>
      </div>
    </div>
  );
}
