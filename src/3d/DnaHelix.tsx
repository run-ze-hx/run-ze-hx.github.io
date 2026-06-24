import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import dnaVert from '@3d/shaders/dna.vert.glsl?raw';
import dnaFrag from '@3d/shaders/dna.frag.glsl?raw';

interface DnaHelixProps {
  basePairs?: number;
  length?: number;
  radius?: number;
  twistPerBp?: number;
  size?: number;
  rotationSpeed?: number;
  colors?: {
    backbone?: string;
    baseAT?: string;
    baseGC?: string;
    bond?: string;
  };
}

const B_DNA_TWIST_PER_BP = 0.62831853; // 36°, ~10 bp per turn (B-DNA)

export default function DnaHelix({
  basePairs = 26,
  length = 12,
  radius = 0.85,
  twistPerBp = B_DNA_TWIST_PER_BP,
  size = 2.4,
  rotationSpeed = 0.15,
  colors = {
    backbone: '#FFD700',
    baseAT: '#FFF4C8',
    baseGC: '#8B7355',
    bond: '#CA8A04',
  },
}: DnaHelixProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();

  const geometry = useMemo(() => {
    const pairTypes: boolean[] = [];
    for (let k = 0; k < basePairs; k++) pairTypes.push(Math.random() < 0.5);

    let bondTotal = 0;
    for (let k = 0; k < basePairs; k++) bondTotal += pairTypes[k] ? 2 : 3;
    const total = basePairs * 4 + bondTotal;

    const positions = new Float32Array(total * 3);
    const seeds = new Float32Array(total);
    const ts = new Float32Array(total);
    const strands = new Float32Array(total);
    const bases = new Float32Array(total);
    const bondIdxs = new Float32Array(total);

    let i = 0;
    // Backbone A
    for (let k = 0; k < basePairs; k++, i++) {
      seeds[i] = Math.random();
      ts[i] = k / basePairs;
      strands[i] = 0;
      bases[i] = 0;
      bondIdxs[i] = 0;
    }
    // Backbone B
    for (let k = 0; k < basePairs; k++, i++) {
      seeds[i] = Math.random();
      ts[i] = k / basePairs;
      strands[i] = 1;
      bases[i] = 0;
      bondIdxs[i] = 0;
    }
    // Bases on strand A
    for (let k = 0; k < basePairs; k++, i++) {
      const isAT = pairTypes[k];
      seeds[i] = Math.random();
      ts[i] = k / basePairs;
      strands[i] = 2;
      bases[i] = isAT ? 0 : 2;
      bondIdxs[i] = 0;
    }
    // Bases on strand B
    for (let k = 0; k < basePairs; k++, i++) {
      const isAT = pairTypes[k];
      seeds[i] = Math.random();
      ts[i] = k / basePairs;
      strands[i] = 3;
      bases[i] = isAT ? 1 : 3;
      bondIdxs[i] = 0;
    }
    // H-bonds
    for (let k = 0; k < basePairs; k++) {
      const isAT = pairTypes[k];
      const n = isAT ? 2 : 3;
      for (let b = 0; b < n; b++, i++) {
        seeds[i] = Math.random();
        ts[i] = k / basePairs;
        strands[i] = 4;
        bases[i] = isAT ? 0 : 2;
        bondIdxs[i] = b;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute('aT', new THREE.BufferAttribute(ts, 1));
    geo.setAttribute('aStrand', new THREE.BufferAttribute(strands, 1));
    geo.setAttribute('aBase', new THREE.BufferAttribute(bases, 1));
    geo.setAttribute('aBondIdx', new THREE.BufferAttribute(bondIdxs, 1));
    return geo;
  }, [basePairs]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uSize: { value: size },
      uRadius: { value: radius },
      uTwistPerBp: { value: twistPerBp },
      uLength: { value: length },
      uBasePairs: { value: basePairs },
      uColorBackbone: { value: new THREE.Color(colors.backbone) },
      uColorBaseAT: { value: new THREE.Color(colors.baseAT) },
      uColorBaseGC: { value: new THREE.Color(colors.baseGC) },
      uColorBond: { value: new THREE.Color(colors.bond) },
    }),
    [size, radius, twistPerBp, length, basePairs, colors],
  );

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
    if (groupRef.current) groupRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={dnaVert}
          fragmentShader={dnaFrag}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
