/**
 * Pointer tracker — writes --mx / --my CSS variables directly to document root
 * on a rAF-throttled loop. Bypasses React entirely to avoid re-rendering every
 * panel on every pointermove. Components read via CSS `var(--mx)` inheritance.
 *
 * Why: subscribing to continuous pointer state in Zustand caused 60+ renders/sec
 * across all 4 panels during drag. This module is render-free.
 */

let rafId: number | null = null;
let nextX = 0;
let nextY = 0;
let listening = false;

function flush() {
  rafId = null;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const nx = (nextX / w) * 2 - 1;
  const ny = -((nextY / h) * 2 - 1);
  document.documentElement.style.setProperty('--mx', nx.toFixed(3));
  document.documentElement.style.setProperty('--my', ny.toFixed(3));
  document.documentElement.style.setProperty('--px', `${nextX}px`);
  document.documentElement.style.setProperty('--py', `${nextY}px`);
}

function onMove(e: PointerEvent) {
  nextX = e.clientX;
  nextY = e.clientY;
  if (rafId === null) {
    rafId = requestAnimationFrame(flush);
  }
}

export function startPointerTracker() {
  if (listening || typeof window === 'undefined') return;
  listening = true;
  // seed initial values so panels have data on first paint
  nextX = window.innerWidth / 2;
  nextY = window.innerHeight / 2;
  flush();
  window.addEventListener('pointermove', onMove, { passive: true });
}

export function stopPointerTracker() {
  if (!listening) return;
  listening = false;
  window.removeEventListener('pointermove', onMove);
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}
