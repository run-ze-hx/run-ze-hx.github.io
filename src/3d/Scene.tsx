import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';
import StarDust from './StarDust';
import Ring from './Ring';
import DnaHelix from './DnaHelix';
import SdfCentral from './SdfCentral';

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 12], fov: 55, near: 0.1, far: 100 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 14, 38]} />

      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00F0FF" />
      <pointLight position={[-10, -5, -10]} intensity={0.6} color="#FF2EA0" />

      <StarDust count={5000} radius={40} />

      <group>
        <Ring count={800} radius={5.5} color="#00F0FF" speed={0.5} tilt={0.18} />
        <Ring
          count={1200}
          radius={8}
          color="#FF2EA0"
          speed={-0.32}
          tilt={-0.22}
          flatten={0.05}
          size={2.0}
        />
        <Ring
          count={600}
          radius={10.5}
          color="#7B2FFF"
          speed={0.18}
          tilt={0.28}
          flatten={0.07}
          size={2.6}
        />
      </group>

      <group>
        <DnaHelix count={400} rungCount={40} length={28} color="#FF8AC8" radius={0.7} twist={2.5} baseY={2.5} />
        <DnaHelix count={350} rungCount={35} length={26} color="#7AF5FF" radius={0.6} twist={3.0} baseY={-2} baseZ={1} />
        <DnaHelix count={300} rungCount={30} length={30} color="#B891FF" radius={0.8} twist={2.0} baseY={0} baseZ={-2} />
      </group>

      <SdfCentral />

      <Preload all />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.4}
          mipmapBlur
          radius={0.7}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(0.0008, 0.0012)}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </Canvas>
  );
}
