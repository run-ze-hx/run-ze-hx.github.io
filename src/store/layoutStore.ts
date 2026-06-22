import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PanelState {
  id: string;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
}

const DEFAULT_PANELS: PanelState[] = [
  { id: 'profile', x: 80, y: 90, z: 0, minimized: false },
  { id: 'articles', x: 880, y: 90, z: 0, minimized: false },
  { id: 'stack', x: 480, y: 480, z: 0, minimized: false },
  { id: 'contact', x: 80, y: 580, z: 0, minimized: false },
];

interface LayoutStore {
  panels: PanelState[];
  activeId: string | null;
  updatePosition: (id: string, x: number, y: number) => void;
  bringToFront: (id: string) => void;
  toggleMinimize: (id: string) => void;
  resetLayout: () => void;
}

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set) => ({
      panels: DEFAULT_PANELS,
      activeId: null,
      updatePosition: (id, x, y) =>
        set((s) => ({
          panels: s.panels.map((p) => (p.id === id ? { ...p, x, y } : p)),
          activeId: id,
        })),
      bringToFront: (id) =>
        set((s) => {
          const maxZ = Math.max(...s.panels.map((p) => p.z));
          return {
            panels: s.panels.map((p) =>
              p.id === id ? { ...p, z: maxZ + 1 } : p,
            ),
            activeId: id,
          };
        }),
      toggleMinimize: (id) =>
        set((s) => ({
          panels: s.panels.map((p) =>
            p.id === id ? { ...p, minimized: !p.minimized } : p,
          ),
        })),
      resetLayout: () => set({ panels: DEFAULT_PANELS, activeId: null }),
    }),
    { name: 'yft-layout' },
  ),
);
