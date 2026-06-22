import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ringVert from '@3d/shaders/ringParticle.vert.glsl?raw';
import particleFrag from '@3d/shaders/particle.frag.glsl?raw';
import { useSceneStore } from '@store/sceneStore';

interface RingProps {
  count?: number;
  radius?: number;
  color: string;
  speed: number;
  flatten?: number;
  tilt?: number;
  size?: number;
}

export default function Ring({
  count = 800,
  radius = 6,
  color,
  speed,
  flatten = 0.04,
  tilt = 0.18,
  size = 2.2,
}: RingProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();
  const pointerNY = useSceneStore((s) => s.pointerNY);
  const dragging = useSceneStore((s) => s.draggingPanelId);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const seeds = new Float32Array(count);
    const angles = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      seeds[i] = Math.random();
      angles[i] = Math.random() * Math.PI * 2;
    }
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute('aAngleOffset', new THREE.BufferAttribute(angles, 1));
    return geo;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uRadius: { value: radius },
      uJitter: { value: 0.18 },
      uFlatten: { value: flatten },
      uTilt: { value: tilt },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uColor: { value: new THREE.Color(color) },
      uSize: { value: size },
      uAttract: { value: 0 },
    }),
    [speed, radius, flatten, tilt, color, size, gl],
  );

  useFrame((_, delta) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value += delta;
    const targetAttract = dragging ? 1 : 0;
    u.uAttract.value = THREE.MathUtils.lerp(
      u.uAttract.value,
      targetAttract,
      delta * 3,
    );
    u.uTilt.value = tilt + pointerNY * 0.12;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={ringVert}
        fragmentShader={particleFrag}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
