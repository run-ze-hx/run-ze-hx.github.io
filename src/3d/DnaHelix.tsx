import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import dnaVert from '@3d/shaders/dna.vert.glsl?raw';
import particleFrag from '@3d/shaders/particle.frag.glsl?raw';

interface DnaHelixProps {
  count?: number;
  rungCount?: number;
  length?: number;
  color?: string;
  size?: number;
  radius?: number;
  twist?: number;
  baseY?: number;
  baseZ?: number;
}

export default function DnaHelix({
  count = 400,
  rungCount = 40,
  length = 24,
  color = '#FF8AC8',
  size = 1.8,
  radius = 0.6,
  twist = 2.5,
  baseY = 0,
  baseZ = 0,
}: DnaHelixProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();

  const geometry = useMemo(() => {
    const total = count * 2 + rungCount;
    const positions = new Float32Array(total * 3);
    const seeds = new Float32Array(total);
    const ts = new Float32Array(total);
    const strands = new Float32Array(total);

    let i = 0;
    for (let k = 0; k < count; k++, i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = baseY;
      positions[i * 3 + 2] = baseZ;
      seeds[i] = Math.random();
      ts[i] = k / count;
      strands[i] = 0;
    }
    for (let k = 0; k < count; k++, i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = baseY;
      positions[i * 3 + 2] = baseZ;
      seeds[i] = Math.random();
      ts[i] = k / count;
      strands[i] = 1;
    }
    for (let k = 0; k < rungCount; k++, i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = baseY;
      positions[i * 3 + 2] = baseZ;
      seeds[i] = Math.random();
      ts[i] = k / rungCount;
      strands[i] = 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute('aT', new THREE.BufferAttribute(ts, 1));
    geo.setAttribute('aStrand', new THREE.BufferAttribute(strands, 1));
    return geo;
  }, [count, rungCount, baseY, baseZ]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uSize: { value: size },
      uColor: { value: new THREE.Color(color) },
      uRadius: { value: radius },
      uTwist: { value: twist },
      uLength: { value: length },
    }),
    [size, color, radius, twist, length, gl],
  );

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={dnaVert}
        fragmentShader={particleFrag}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
