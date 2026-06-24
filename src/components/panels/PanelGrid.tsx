import { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { useLayoutStore } from '@store/layoutStore';
import { useSceneStore } from '@store/sceneStore';
import Panel from './Panel';
import ProfilePanel from './ProfilePanel';
import ArticlesPanel from './ArticlesPanel';
import StackPanel from './StackPanel';
import ContactPanel from './ContactPanel';

type Variant = 'glass' | 'outline' | 'solid' | 'capsule';
type Shape = 'rect' | 'notch' | 'hex' | 'bracket' | 'pill';

const PANEL_CONFIG: Record<
  string,
  {
    Component: () => JSX.Element;
    variant: Variant;
    shape: Shape;
    width: number;
    crt: boolean;
  }
> = {
  profile: {
    Component: ProfilePanel,
    variant: 'glass',
    shape: 'notch',
    width: 340,
    crt: true,
  },
  articles: {
    Component: ArticlesPanel,
    variant: 'outline',
    shape: 'bracket',
    width: 380,
    crt: false,
  },
  stack: {
    Component: StackPanel,
    variant: 'solid',
    shape: 'hex',
    width: 320,
    crt: false,
  },
  contact: {
    Component: ContactPanel,
    variant: 'capsule',
    shape: 'pill',
    width: 300,
    crt: true,
  },
};

const containerVariants = {
  initial: {},
  enter: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 24, scale: 0.94, filter: 'blur(8px)' },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 130, damping: 18, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    filter: 'blur(6px)',
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
};

export default function PanelGrid() {
  const panels = useLayoutStore((s) => s.panels);
  const updatePosition = useLayoutStore((s) => s.updatePosition);
  const bringToFront = useLayoutStore((s) => s.bringToFront);
  const resetLayout = useLayoutStore((s) => s.resetLayout);
  const setDragging = useSceneStore((s) => s.setDragging);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor),
  );

  const onDragStart = useCallback(
    (e: DragStartEvent) => {
      setDragging(String(e.active.id));
    },
    [setDragging],
  );

  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { active, delta } = e;
      const id = String(active.id);
      const panel = panels.find((p) => p.id === id);
      setDragging(null);
      if (!panel || (delta.x === 0 && delta.y === 0)) return;

      const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const h = typeof window !== 'undefined' ? window.innerHeight : 1080;
      const cfg = PANEL_CONFIG[id];
      const safeW = cfg?.width ?? 300;
      const nextX = Math.max(8, Math.min(w - safeW - 8, panel.x + delta.x));
      const nextY = Math.max(56, Math.min(h - 80, panel.y + delta.y));
      updatePosition(id, nextX, nextY);
      bringToFront(id);
    },
    [panels, updatePosition, bringToFront, setDragging],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'R' || e.key === 'r')) resetLayout();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [resetLayout]);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ perspective: '1800px', perspectiveOrigin: 'center 30%' }}
      >
        <motion.div
          className="relative"
          style={{ transformStyle: 'preserve-3d' }}
          variants={containerVariants}
          initial="initial"
          animate="enter"
        >
          {panels.map((p) => {
            const cfg = PANEL_CONFIG[p.id];
            if (!cfg) return null;
            const Renderer = cfg.Component;
            return (
              <motion.div
                key={p.id}
                className="pointer-events-auto"
                variants={itemVariants}
              >
                <Panel
                  id={p.id}
                  x={p.x}
                  y={p.y}
                  z={p.z}
                  variant={cfg.variant}
                  shape={cfg.shape}
                  width={cfg.width}
                  crt={cfg.crt}
                >
                  <Renderer />
                </Panel>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </DndContext>
  );
}
