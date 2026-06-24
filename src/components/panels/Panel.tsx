import { useMemo, type ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';

type Variant = 'glass' | 'outline' | 'solid' | 'capsule';
type Shape = 'rect' | 'notch' | 'hex' | 'bracket' | 'pill';

interface PanelProps {
  id: string;
  x: number;
  y: number;
  z: number;
  children: ReactNode;
  variant?: Variant;
  shape?: Shape;
  width?: number;
  crt?: boolean;
}

const VARIANT_BORDER: Record<Variant, string> = {
  glass: 'rgba(255, 215, 0, 0.25)',
  outline: 'rgba(139, 115, 85, 0.45)',
  solid: 'rgba(92, 74, 26, 0.55)',
  capsule: 'rgba(212, 175, 55, 0.4)',
};

const VARIANT_GLOW: Record<Variant, string> = {
  glass: 'rgba(255, 215, 0, 0.18)',
  outline: 'rgba(139, 115, 85, 0.25)',
  solid: 'rgba(92, 74, 26, 0.35)',
  capsule: 'rgba(212, 175, 55, 0.22)',
};

const SHAPE_CLASS: Record<Shape, string> = {
  rect: 'panel-rect',
  notch: 'panel-notch',
  hex: 'panel-hex',
  bracket: 'panel-bracket',
  pill: 'panel-pill',
};

/**
 * Direct-transform drag pattern:
 * - useDraggable returns `transform` which updates during drag (state in dnd-kit).
 * - We add transform.x/y to the base position (x, y) and apply translate3d.
 * - During drag (isDragging), we disable transition and 3D tilt for buttery
 *   pointer tracking.
 * - No DragOverlay / portal — panel stays inside the perspective container.
 * - Panel's own React state updates each move frame, but pointer tilt is still
 *   CSS-var-driven (no extra renders from pointer tracking).
 */
export default function Panel({
  id,
  x,
  y,
  z,
  children,
  variant = 'glass',
  shape = 'rect',
  width,
  crt = false,
}: PanelProps) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, isDragging } =
    useDraggable({ id });

  const dragX = transform?.x ?? 0;
  const dragY = transform?.y ?? 0;
  const active = isDragging;

  const style = useMemo<React.CSSProperties>(() => {
    const depth = 40 + z * 8;
    const tilt = active
      ? ''
      : 'rotateX(calc(var(--my) * -4deg)) rotateY(calc(var(--mx) * 4deg))';
    return {
      transform: `translate3d(${x + dragX}px, ${y + dragY}px, ${depth}px) ${tilt} ${
        active ? 'scale(1.04)' : ''
      }`,
      zIndex: 10 + z,
      transition: active ? 'none' : 'transform 0.35s cubic-bezier(0.2,0.8,0.2,1)',
      opacity: active ? 0.96 : 1,
      width: width ? `${width}px` : undefined,
      borderColor: VARIANT_BORDER[variant],
      boxShadow: active
        ? `0 0 60px ${VARIANT_GLOW[variant]}, 0 50px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)`
        : `0 0 50px ${VARIANT_GLOW[variant]}, 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)`,
      willChange: 'transform',
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y, z, dragX, dragY, active, variant, width]);

  return (
    <div
      ref={setNodeRef}
      className={`glass-panel ${SHAPE_CLASS[shape]} ${crt ? 'panel-crt' : ''}`}
      style={style}
    >
      {shape === 'bracket' && (
        <>
          <span className="bracket-corner tl" />
          <span className="bracket-corner tr" />
          <span className="bracket-corner bl" />
          <span className="bracket-corner br" />
        </>
      )}

      {shape !== 'bracket' && (
        <>
          <span className="corner-deco tl" />
          <span className="corner-deco tr" />
          <span className="corner-deco bl" />
          <span className="corner-deco br" />
        </>
      )}

      <div
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
        className="panel-handle"
      >
        <span className="flex gap-1">
          <i className="w-2 h-2 rounded-full bg-magenta/80 inline-block" />
          <i className="w-2 h-2 rounded-full bg-neon-yellow/80 inline-block" />
          <i className="w-2 h-2 rounded-full bg-neon-green/80 inline-block" />
        </span>
        <span className="ml-auto">{id}.panel</span>
      </div>

      <div className="pt-7">{children}</div>
    </div>
  );
}
