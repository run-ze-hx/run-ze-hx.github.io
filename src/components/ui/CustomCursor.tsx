import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom gold cursor — a soft halo that lags behind the native pointer with
 * spring physics, plus a crisp dot that tracks instantly. Hovering interactive
 * elements (a, button, [data-cursor]) expands the halo.
 *
 * Skipped on touch devices and when prefers-reduced-motion is set.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const rafRef = useRef<number | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const haloX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const haloY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;

    setEnabled(true);
    document.body.style.cursor = 'none';

    const move = (e: PointerEvent) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest('a, button, [data-cursor], input, textarea, select, [role="button"]');
      setHovering(!!interactive);
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('pointermove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  const haloSize = hovering ? 56 : pressed ? 28 : 36;

  return (
    <>
      {/* Soft halo */}
      <motion.div
        aria-hidden
        style={{
          x: haloX,
          y: haloY,
          width: haloSize,
          height: haloSize,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        animate={{
          scale: pressed ? 0.85 : 1,
          borderColor: hovering ? 'rgba(255,215,0,0.85)' : 'rgba(255,215,0,0.35)',
          backgroundColor: hovering ? 'rgba(255,215,0,0.08)' : 'rgba(255,215,0,0.0)',
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        initial={false}
      >
        <div
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: 'inherit', boxShadow: '0 0 18px rgba(255,215,0,0.25)' }}
        />
      </motion.div>

      {/* Crisp dot */}
      <motion.div
        aria-hidden
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-cyan"
        animate={{
          width: hovering ? 6 : 5,
          height: hovering ? 6 : 5,
          opacity: hovering ? 1 : 0.9,
        }}
        transition={{ duration: 0.15 }}
        initial={false}
      />
    </>
  );
}
