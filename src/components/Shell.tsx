import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, type ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSceneStore } from '@store/sceneStore';
import { useI18nStore } from '@store/i18nStore';
import { startPointerTracker, stopPointerTracker } from '@lib/pointerTracker';
import LangSwitcher from '@components/ui/LangSwitcher';
import NavRail from '@components/ui/NavRail';
import HudClock from '@components/ui/HudClock';
import HudOverlay from '@components/ui/HudOverlay';
import HudMarquee from '@components/ui/HudMarquee';
import ConsoleTerminal from '@components/ConsoleTerminal';

const SceneLayer = lazy(() => import('@3d/SceneLayer'));

function SceneFallback() {
  return (
    <div className="fixed inset-0 -z-10 bg-void">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(0,240,255,0.15), transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,46,160,0.15), transparent 50%)',
        }}
      />
    </div>
  );
}

const routeVariants = {
  initial: { opacity: 0, filter: 'blur(8px)' },
  enter: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(8px)' },
};

interface ShellProps {
  children: ReactNode;
}

export default function Shell({ children }: ShellProps) {
  const setScroll = useSceneStore((s) => s.setScroll);
  const lang = useI18nStore((s) => s.lang);
  const location = useLocation();

  useEffect(() => {
    startPointerTracker();
    return () => stopPointerTracker();
  }, []);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [setScroll]);

  return (
    <div className="relative min-h-screen">
      <Suspense fallback={<SceneFallback />}>
        <SceneLayer />
      </Suspense>

      <HudOverlay />

      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <NavRail />
        </div>
        <div className="pointer-events-auto flex items-center gap-4">
          <HudClock />
          <LangSwitcher />
        </div>
      </header>

      {/* Marquee — second row from top, subtle */}
      <div className="fixed top-[60px] left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <HudMarquee />
      </div>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${lang}-${location.pathname}`}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={routeVariants}
            transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="scanline" aria-hidden />

      <ConsoleTerminal />
    </div>
  );
}
