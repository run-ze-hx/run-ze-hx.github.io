import { Suspense, useEffect, useState } from 'react';
import Scene from '@3d/Scene';

const SceneFallback = () => (
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

function hasWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function SceneLayer() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(hasWebGL());
  }, []);

  if (!supported) return <SceneFallback />;

  return (
    <Suspense fallback={<SceneFallback />}>
      <Scene />
    </Suspense>
  );
}
