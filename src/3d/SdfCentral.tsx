import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@store/sceneStore';
import sdfVert from '@3d/shaders/sdf.vert.glsl?raw';
import sdfFrag from '@3d/shaders/sdf.frag.glsl?raw';

export default function SdfCentral() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const routeMode = useSceneStore((s) => s.routeMode);
  const { size } = useThree();

  const geometry = useMemo(() => new THREE.PlaneGeometry(2, 2), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: 0.25 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uAspect: { value: size.width / size.height },
      uColorA: { value: new THREE.Color('#00F0FF') },
      uColorB: { value: new THREE.Color('#FF2EA0') },
      uColorC: { value: new THREE.Color('#7B2FFF') },
      uCamPos: { value: new THREE.Vector3(0, 0, 3.5) },
    }),
    [size],
  );

  useFrame((_, delta) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value += delta;
    const targetDistort = routeMode === 'article' ? 0.05 : 0.25;
    matRef.current.uniforms.uDistort.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uDistort.value,
      targetDistort,
      delta * 2,
    );
  });

  return (
    <mesh geometry={geometry} frustumCulled={false} renderOrder={1}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={sdfVert}
        fragmentShader={sdfFrag}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
