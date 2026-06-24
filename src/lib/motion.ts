/**
 * Unified motion primitives — single source of truth for curves, springs, variants.
 * Import from here instead of inlining magic numbers in components.
 */

export const easeCinema = [0.16, 1, 0.3, 1] as const;
export const easeExpo = [0.87, 0, 0.13, 1] as const;
export const easeSoft = [0.4, 0, 0.2, 1] as const;

export const spring = {
  gentle: { type: 'spring', stiffness: 60, damping: 16, mass: 1.1 },
  snappy: { type: 'spring', stiffness: 320, damping: 28, mass: 0.6 },
  slow: { type: 'spring', stiffness: 90, damping: 18, mass: 1.3 },
  magnetic: { type: 'spring', stiffness: 350, damping: 25, mass: 0.5 },
  cursor: { type: 'spring', stiffness: 500, damping: 40, mass: 0.4 },
} as const;

export const variants = {
  fadeRise: {
    initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
    enter: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: easeCinema },
    },
    exit: {
      opacity: 0,
      y: -12,
      filter: 'blur(6px)',
      transition: { duration: 0.4, ease: easeCinema },
    },
  },
  blurIn: {
    initial: { opacity: 0, filter: 'blur(18px)', scale: 0.96 },
    enter: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: spring.gentle,
    },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.92 },
    enter: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: easeCinema },
    },
  },
  stagger: (stagger = 0.08, delay = 0.15) => ({
    initial: {},
    enter: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }),
};

export const routeVariants = {
  initial: { opacity: 0, filter: 'blur(12px)', scale: 0.96 },
  enter: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.6, ease: easeCinema },
  },
  exit: {
    opacity: 0,
    filter: 'blur(8px)',
    scale: 1.02,
    transition: { duration: 0.4, ease: easeCinema },
  },
};
