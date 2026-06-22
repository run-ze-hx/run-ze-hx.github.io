import { create } from 'zustand';

interface SceneStore {
  pointerX: number;
  pointerY: number;
  pointerNX: number;
  pointerNY: number;
  draggingPanelId: string | null;
  scrollY: number;
  routeMode: 'desktop' | 'article' | 'page';
  setPointer: (x: number, y: number) => void;
  setDragging: (id: string | null) => void;
  setScroll: (y: number) => void;
  setRouteMode: (m: SceneStore['routeMode']) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  pointerX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  pointerY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  pointerNX: 0,
  pointerNY: 0,
  draggingPanelId: null,
  scrollY: 0,
  routeMode: 'desktop',
  setPointer: (x, y) =>
    set({
      pointerX: x,
      pointerY: y,
      pointerNX: (x / (typeof window !== 'undefined' ? window.innerWidth : 1)) * 2 - 1,
      pointerNY: -((y / (typeof window !== 'undefined' ? window.innerHeight : 1)) * 2 - 1),
    }),
  setDragging: (id) => set({ draggingPanelId: id }),
  setScroll: (y) => set({ scrollY: y }),
  setRouteMode: (m) => set({ routeMode: m }),
}));
