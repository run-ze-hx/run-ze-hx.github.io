import { useEffect, useState } from 'react';
import { motion, useSpring, useScroll } from 'framer-motion';
import { easeCinema } from '@lib/motion';

/**
 * Fixed gold reading-progress bar at the top of the viewport.
 * Width tracks scroll position through the page.
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.5,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 right-0 z-[55] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, rgba(255,215,0,0) 0%, #FFD700 25%, #FFF4C8 50%, #FFD700 75%, rgba(255,215,0,0) 100%)',
        boxShadow: '0 0 12px rgba(255,215,0,0.55), 0 0 28px rgba(255,215,0,0.25)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: easeCinema }}
    />
  );
}
