import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';
import { spring } from '@lib/motion';

interface MagneticProps {
  children: ReactNode;
  /** Maximum displacement in pixels. Default 5. */
  strength?: number;
  className?: string;
}

/**
 * Wraps a child element and translates it slightly toward the pointer when the
 * pointer is inside the element's box. Spring physics returns it to center.
 *
 * Use on small interactive elements: nav buttons, icons, tags.
 */
export default function Magnetic({ children, strength = 5, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.magnetic);
  const sy = useSpring(y, spring.magnetic);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const maxX = rect.width / 2;
    const maxY = rect.height / 2;
    const factorX = maxX === 0 ? 0 : relX / maxX;
    const factorY = maxY === 0 ? 0 : relY / maxY;
    x.set(factorX * strength);
    y.set(factorY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
