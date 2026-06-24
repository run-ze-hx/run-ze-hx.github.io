import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import DnaHelix from './DnaHelix';
import SdfCentral from './SdfCentral';

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 12], fov: 55, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <fog attach="fog" args={['#0A0807', 16, 42]} />

      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#FFD700" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#F4C430" />

      <group position={[1.8, 0, -1.5]}>
        <DnaHelix basePairs={36} length={11} radius={0.8} size={2.0} />
      </group>

      <SdfCentral />

      <Preload all />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom
          intensity={0.035}
          luminanceThreshold={0.82}
          luminanceSmoothing={0.2}
          mipmapBlur
          radius={0.1}
        />
        <Noise premultiply opacity={0.04} blendFunction={BlendFunction.SOFT_LIGHT} />
        <Vignette offset={0.25} darkness={0.85} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </Canvas>
  );
}
