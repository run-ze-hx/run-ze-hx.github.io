import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, type ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSceneStore } from '@store/sceneStore';
import { useI18nStore } from '@store/i18nStore';
import { startPointerTracker, stopPointerTracker } from '@lib/pointerTracker';
import { routeVariants, easeCinema } from '@lib/motion';
import LangSwitcher from '@components/ui/LangSwitcher';
import NavRail from '@components/ui/NavRail';
import HudClock from '@components/ui/HudClock';
import HudOverlay from '@components/ui/HudOverlay';
import HudMarquee from '@components/ui/HudMarquee';
import ConsoleTerminal from '@components/ConsoleTerminal';
import CustomCursor from '@components/ui/CustomCursor';

const SceneLayer = lazy(() => import('@3d/SceneLayer'));

function SceneFallback() {
  return (
    <div className="fixed inset-0 -z-10 bg-void">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(255,215,0,0.15), transparent 50%), radial-gradient(circle at 70% 60%, rgba(139,115,85,0.15), transparent 50%)',
        }}
      />
    </div>
  );
}

const sweepVariants = {
  initial: { scaleX: 0, transformOrigin: '0% 50%' },
  enter: {
    scaleX: 1,
    transition: { duration: 0.45, ease: easeCinema },
  },
  exit: {
    transformOrigin: '100% 50%',
    scaleX: 0,
    transition: { duration: 0.45, ease: easeCinema, delay: 0.05 },
  },
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
      <CustomCursor />
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
            transition={{ duration: 0.6, ease: easeCinema }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Gold sweep mask — wipes across on route change */}
      <AnimatePresence>
        <motion.div
          key={`sweep-${lang}-${location.pathname}`}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60]"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={sweepVariants}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(10,8,7,0) 0%, rgba(255,215,0,0.18) 50%, rgba(10,8,7,0) 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="scanline" aria-hidden />

      <ConsoleTerminal />
    </div>
  );
}
