import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import starDustVert from '@3d/shaders/starDust.vert.glsl?raw';
import particleFrag from '@3d/shaders/particle.frag.glsl?raw';

interface StarDustProps {
  count?: number;
  radius?: number;
}

export default function StarDust({
  count = 5000,
  radius = 40,
}: StarDustProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r = radius * (0.5 + Math.random() * 0.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      seeds[i] = Math.random();
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    return geo;
  }, [count, radius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: {
        value: Math.min(gl.getPixelRatio(), 2),
      },
      uSize: { value: 1.4 },
      uColor: { value: new THREE.Color('#7AF5FF') },
    }),
    [gl],
  );

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={starDustVert}
        fragmentShader={particleFrag}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
