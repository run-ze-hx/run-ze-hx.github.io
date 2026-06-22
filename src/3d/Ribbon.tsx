import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ribbonVert from '@3d/shaders/ribbon.vert.glsl?raw';
import particleFrag from '@3d/shaders/particle.frag.glsl?raw';

interface RibbonProps {
  count?: number;
  length?: number;
  color?: string;
  size?: number;
  curveAmp?: number;
  curveFreq?: number;
  baseY?: number;
  baseZ?: number;
}

export default function Ribbon({
  count = 400,
  length = 24,
  color = '#FF8AC8',
  size = 1.8,
  curveAmp = 0.6,
  curveFreq = 1.0,
  baseY = 0,
  baseZ = 0,
}: RibbonProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const ts = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (i / count - 0.5) * length;
      positions[i * 3 + 1] = baseY;
      positions[i * 3 + 2] = baseZ;
      seeds[i] = Math.random();
      ts[i] = i / count;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute('aT', new THREE.BufferAttribute(ts, 1));
    return geo;
  }, [count, length, baseY, baseZ]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uSize: { value: size },
      uColor: { value: new THREE.Color(color) },
      uCurveAmp: { value: curveAmp },
      uCurveFreq: { value: curveFreq },
    }),
    [size, color, curveAmp, curveFreq, gl],
  );

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={ribbonVert}
        fragmentShader={particleFrag}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
