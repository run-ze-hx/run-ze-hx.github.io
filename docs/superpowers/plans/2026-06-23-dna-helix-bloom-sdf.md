# DNA 螺旋 + Bloom 后处理 + SDF 射线步进 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把现有三条波动丝带改造成 DNA 双螺旋，加入 Bloom + 色差后处理让霓虹真正发光，把中央二十面体替换为 SDF 射线步进的液态金属效果。

**Architecture:**
- **DNA 螺旋**：保留 `<points>` + 自定义 shader 的模式，把顶点位置从波形改成双螺旋参数方程，加一条横杆粒子链作为"碱基对"
- **后处理**：用 `@react-three/postprocessing` 的 `EffectComposer` 包裹 `Canvas` 内容，加 `Bloom` + `ChromaticAberration`
- **SDF 射线步进**：用 `<Quad>` 全屏方块 + raymarching shader，融合多个 metaball 球体得到液态金属形态，颜色采样现有的赛博朋克三色

**Tech Stack:** React 18, @react-three/fiber 8, @react-three/drei 9, @react-three/postprocessing（新增）, three 0.169, GLSL

## Global Constraints

- 现有颜色调色板：`#00F0FF` 青、`#FF2EA0` 粉、`#7B2FFF` 紫、`#FF8AC8` 亮粉、`#7AF5FF` 浅青、`#B891FF` 浅紫 —— 必须沿用
- 现有 shader 风格：additive blending、`depthWrite={false}`、透明、uniform 驱动
- 必须支持 `routeMode`（home / article）响应：文章页所有 3D 元素降低强度
- TypeScript strict，构建命令 `npm run build = tsc -b && vite build`
- 验证手段：`npm run typecheck` + `npm run dev` 浏览器肉眼检查（shader 无法单元测试）

---

## File Structure

**创建：**
- `src/3d/DnaHelix.tsx` — 替代 `Ribbon.tsx`，渲染 DNA 双螺旋粒子
- `src/3d/shaders/dna.vert.glsl` — DNA 顶点 shader（双螺旋参数方程 + 碱基对横杆）
- `src/3d/shaders/sdf.frag.glsl` — 中央物体 raymarching 片元 shader
- `src/3d/shaders/sdf.vert.glsl` — 全屏 quad 顶点 shader
- `src/3d/SdfCentral.tsx` — 替代 `CentralObject.tsx`，全屏 quad + SDF

**修改：**
- `src/3d/Scene.tsx` — 替换 Ribbon 群为 DnaHelix 群；用 EffectComposer 包裹；替换 CentralObject
- `src/3d/shaders.d.ts` — 加 `*.glsl?raw` 模块声明（如果还没有）

**删除/废弃：**
- `src/3d/Ribbon.tsx`（Scene 不再引用，可保留文件不删）
- `src/3d/CentralObject.tsx`（同上）

---

## Task 1: 安装 postprocessing 依赖

**Files:**
- Modify: `package.json`

**Produces:** `@react-three/postprocessing` 和 `postprocessing` 在 node_modules 可用

- [ ] **Step 1: 安装依赖**

```bash
npm install @react-three/postprocessing@^2.16.3 postprocessing@^6.36.4
```

期望：`package.json` 的 dependencies 多出两项；无报错。

- [ ] **Step 2: typecheck 验证**

```bash
npm run typecheck
```

期望：PASS（0 errors）。

- [ ] **Step 3: 提交**

```bash
git add package.json package-lock.json
git commit -m "add @react-three/postprocessing for bloom/aberration"
```

---

## Task 2: 写 DNA 顶点 shader（双螺旋 + 碱基对）

**Files:**
- Create: `src/3d/shaders/dna.vert.glsl`

**Consumes:** 现有 `particle.frag.glsl`（继续复用作为粒子片元）

**Produces:** 一个接收 `aT`（0..1 沿轴）、`aSeed`、`aStrand`（0=链A, 1=链B, 2=碱基对）的顶点 shader，把粒子布到双螺旋上

- [ ] **Step 1: 创建 shader 文件**

```glsl
// DNA double helix particle placement
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform vec3 uColor;
uniform float uRadius;       // 螺旋半径
uniform float uTwist;        // 每单位长度的旋转圈数
uniform float uLength;       // 螺旋总长

attribute float aSeed;
attribute float aT;          // 0..1 沿螺旋轴
attribute float aStrand;     // 0 / 1 = 两条链, 2 = 碱基对横杆

varying vec3 vColor;
varying float vAlpha;

void main() {
  // 沿 X 轴展开
  float xPos = (aT - 0.5) * uLength;

  // 螺旋角度
  float angle = aT * uTwist * 6.2831853 + uTime * 0.4;
  float strandSign = aStrand < 0.5 ? 1.0 : -1.0;

  vec3 pos;
  if (aStrand < 1.5) {
    // 两条主链
    pos = vec3(
      xPos,
      strandSign * uRadius * cos(angle),
      strandSign * uRadius * sin(angle)
    );
  } else {
    // 碱基对横杆：在两条链中间画一根细线
    float rungT = fract(aSeed * 2.0);  // 0..1 从链A到链B
    float signA = 1.0;
    float yA = signA * uRadius * cos(angle);
    float zA = signA * uRadius * sin(angle);
    float yB = -signA * uRadius * cos(angle);
    float zB = -signA * uRadius * sin(angle);
    pos = vec3(xPos, mix(yA, yB, rungT), mix(zA, zB, rungT));
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * uPixelRatio * (180.0 / -mvPosition.z);

  vColor = uColor;
  // 碱基对稍弱一点
  float baseAlpha = aStrand > 1.5 ? 0.5 : 0.9;
  vAlpha = baseAlpha * (0.7 + 0.3 * sin(uTime * 2.0 + aSeed * 10.0));
}
```

- [ ] **Step 2: 确认 `shaders.d.ts` 有 `*.glsl?raw` 声明**

读取 `src/3d/shaders.d.ts`，如果没有就加上：

```ts
declare module '*.vert.glsl?raw' {
  const value: string;
  export default value;
}
declare module '*.frag.glsl?raw' {
  const value: string;
  export default value;
}
```

- [ ] **Step 3: 提交**

```bash
git add src/3d/shaders/dna.vert.glsl src/3d/shaders.d.ts
git commit -m "add dna helix vertex shader"
```

---

## Task 3: 写 DnaHelix 组件

**Files:**
- Create: `src/3d/DnaHelix.tsx`

**Consumes:** `dna.vert.glsl`, `particle.frag.glsl`

**Produces:** 默认导出 `DnaHelix`，props 与现有 `Ribbon` 对齐（`count`, `length`, `color`, `size`, `baseY`, `baseZ`），Scene 可以无缝替换

- [ ] **Step 1: 创建组件文件**

```tsx
import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import dnaVert from '@3d/shaders/dna.vert.glsl?raw';
import particleFrag from '@3d/shaders/particle.frag.glsl?raw';

interface DnaHelixProps {
  count?: number;       // 每条链的粒子数
  rungCount?: number;   // 碱基对横杆数量
  length?: number;
  color?: string;
  size?: number;
  radius?: number;      // 螺旋半径
  twist?: number;       // 扭转圈数
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
    // 链 A
    for (let k = 0; k < count; k++, i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = baseY;
      positions[i * 3 + 2] = baseZ;
      seeds[i] = Math.random();
      ts[i] = k / count;
      strands[i] = 0;
    }
    // 链 B
    for (let k = 0; k < count; k++, i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = baseY;
      positions[i * 3 + 2] = baseZ;
      seeds[i] = Math.random();
      ts[i] = k / count;
      strands[i] = 1;
    }
    // 碱基对
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
```

- [ ] **Step 2: typecheck**

```bash
npm run typecheck
```

期望：PASS。

- [ ] **Step 3: 提交**

```bash
git add src/3d/DnaHelix.tsx
git commit -m "add DnaHelix component"
```

---

## Task 4: 在 Scene 中用 DnaHelix 替换 Ribbon

**Files:**
- Modify: `src/3d/Scene.tsx`

**Consumes:** Task 3 的 `DnaHelix` 组件

- [ ] **Step 1: 修改 import**

把 `import Ribbon from './Ribbon';` 换成 `import DnaHelix from './DnaHelix';`

- [ ] **Step 2: 替换 JSX 中的三个 `<Ribbon />`**

把现有的：

```tsx
<Ribbon count={400} length={28} color="#FF8AC8" curveAmp={0.6} baseY={2.5} />
<Ribbon count={350} length={26} color="#7AF5FF" curveAmp={0.8} curveFreq={1.3} baseY={-2} baseZ={1} />
<Ribbon count={300} length={30} color="#B891FF" curveAmp={0.5} curveFreq={0.7} baseY={0} baseZ={-2} />
```

换成：

```tsx
<DnaHelix count={400} rungCount={40} length={28} color="#FF8AC8" radius={0.7} twist={2.5} baseY={2.5} />
<DnaHelix count={350} rungCount={35} length={26} color="#7AF5FF" radius={0.6} twist={3.0} baseY={-2} baseZ={1} />
<DnaHelix count={300} rungCount={30} length={30} color="#B891FF" radius={0.8} twist={2.0} baseY={0} baseZ={-2} />
```

- [ ] **Step 3: typecheck**

```bash
npm run typecheck
```

期望：PASS。

- [ ] **Step 4: 浏览器肉眼验证**

```bash
npm run dev
```

打开浏览器，看到三条彩色 DNA 双螺旋沿水平方向展开、缓慢扭转。如果看不到，检查浏览器控制台 shader 编译错误。

- [ ] **Step 5: 提交**

```bash
git add src/3d/Scene.tsx
git commit -m "swap Ribbon for DnaHelix in Scene"
```

---

## Task 5: 写 SDF 全屏 quad shaders

**Files:**
- Create: `src/3d/shaders/sdf.vert.glsl`
- Create: `src/3d/shaders/sdf.frag.glsl`

**Produces:** 一个 raymarching 片元 shader，把中央物体渲染成融合 metaball + 噪声扰动的液态金属形态，颜色用青/粉/紫三色 fresnel

- [ ] **Step 1: 创建顶点 shader（全屏 quad）**

```glsl
// sdf.vert.glsl
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
```

- [ ] **Step 2: 创建片元 shader（raymarching）**

```glsl
// sdf.frag.glsl
precision highp float;

uniform float uTime;
uniform float uDistort;
uniform vec2  uResolution;
uniform float uAspect;
uniform vec3  uColorA;
uniform vec3  uColorB;
uniform vec3  uColorC;
uniform vec3  uCamPos;

varying vec2 vUv;

// ---- Simplex 3D noise (Ashima, MIT) ----
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

// ---- SDF primitives ----
float sdSphere(vec3 p, float r) { return length(p) - r; }

// Smooth metaball blend
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k*h*(1.0-h);
}

// 中央液态金属 SDF：4 个 metaball + 噪声扰动
float map(vec3 p) {
  float t = uTime * 0.5;
  // 4 个轨道运动的球
  vec3 b1 = vec3(sin(t)*0.6, cos(t*1.3)*0.4, sin(t*0.7)*0.5);
  vec3 b2 = vec3(cos(t*1.1)*0.5, sin(t*0.9)*0.5, cos(t*1.5)*0.3);
  vec3 b3 = vec3(sin(t*0.8+1.0)*0.7, sin(t*1.2)*0.3, cos(t*0.6+2.0)*0.5);
  vec3 b4 = vec3(cos(t*1.4+3.0)*0.4, cos(t*0.5+1.0)*0.6, sin(t*1.1+1.5)*0.4);

  float d = sdSphere(p - b1, 0.55);
  d = smin(d, sdSphere(p - b2, 0.5), 0.5);
  d = smin(d, sdSphere(p - b3, 0.6), 0.5);
  d = smin(d, sdSphere(p - b4, 0.45), 0.5);

  // 表面噪声扰动
  float n = snoise(p * 1.5 + vec3(t * 0.6));
  d += n * uDistort;

  return d;
}

// 计算法线（中心差分）
vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.001, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

void main() {
  // 屏幕坐标 → NDC，保留 aspect
  vec2 uv = (vUv - 0.5) * vec2(uAspect, 1.0) * 2.0;

  // 相机射线（向 -Z 方向，居中）
  vec3 ro = uCamPos;
  vec3 rd = normalize(vec3(uv, -1.5));

  // Raymarch
  float t = 0.0;
  float d = 0.0;
  bool hit = false;
  for (int i = 0; i < 96; i++) {
    vec3 p = ro + rd * t;
    d = map(p);
    if (d < 0.001) { hit = true; break; }
    if (t > 20.0) break;
    t += d;
  }

  if (!hit) {
    // 没打中 → 完全透明（让 Canvas 背景透出）
    gl_FragColor = vec4(0.0);
    return;
  }

  vec3 p = ro + rd * t;
  vec3 n = calcNormal(p);
  vec3 viewDir = -normalize(rd);

  // Fresnel 边缘高亮
  float fresnel = pow(1.0 - max(dot(n, viewDir), 0.0), 2.5);

  // 表面颜色：基于位置 + 噪声混三色
  float mixT = snoise(p * 2.0 + uTime * 0.3) * 0.5 + 0.5;
  vec3 base = mix(uColorA, uColorB, mixT);
  vec3 col = mix(base, uColorC, fresnel);
  col += fresnel * 0.6;

  // 一点高光
  vec3 lightDir = normalize(vec3(0.5, 0.8, 0.5));
  float spec = pow(max(dot(reflect(-lightDir, n), viewDir), 0.0), 32.0);
  col += spec * 0.4;

  gl_FragColor = vec4(col, 1.0);
}
```

- [ ] **Step 3: 提交**

```bash
git add src/3d/shaders/sdf.vert.glsl src/3d/shaders/sdf.frag.glsl
git commit -m "add SDF raymarching shaders for central object"
```

---

## Task 6: 写 SdfCentral 组件

**Files:**
- Create: `src/3d/SdfCentral.tsx`

**Consumes:** Task 5 的 shaders；`useSceneStore` 的 `routeMode`

**Produces:** 默认导出 `SdfCentral`，渲染一个全屏 quad，shader 处理 raymarching，响应 `routeMode`

- [ ] **Step 1: 创建组件**

```tsx
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

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2, 2);
    return geo;
  }, []);

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
```

- [ ] **Step 2: typecheck**

```bash
npm run typecheck
```

期望：PASS。

- [ ] **Step 3: 提交**

```bash
git add src/3d/SdfCentral.tsx
git commit -m "add SdfCentral raymarched object"
```

---

## Task 7: 在 Scene 中用 SdfCentral 替换 CentralObject + 加 EffectComposer

**Files:**
- Modify: `src/3d/Scene.tsx`

**Consumes:** Task 6 的 `SdfCentral`、Task 1 的 `@react-three/postprocessing`

- [ ] **Step 1: 修改 import**

在文件顶部加：

```tsx
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';
import SdfCentral from './SdfCentral';
```

删除 `import CentralObject from './CentralObject';`

- [ ] **Step 2: 把 `<CentralObject />` 换成 `<SdfCentral />`**

- [ ] **Step 3: 在 `</Canvas>` 关闭前用 `<EffectComposer>` 包裹所有内容**

最简写法（不要嵌套 Canvas 外面）：

```tsx
<EffectComposer multisampling={0} disableNormalPass>
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
```

`EffectComposer` 必须作为 `<Canvas>` 的直接子节点，放在所有 3D 元素之后。最终 Scene.tsx 的结构是：

```tsx
<Canvas ...>
  <color ... />
  <fog ... />
  <ambientLight ... />
  <pointLight ... />
  <pointLight ... />
  <StarDust ... />
  <group>{/* 三条 Ring */}</group>
  <group>{/* 三条 DnaHelix */}</group>
  <SdfCentral />
  <Preload all />
  <AdaptiveDpr pixelated />
  <AdaptiveEvents />
  <EffectComposer multisampling={0} disableNormalPass>
    <Bloom ... />
    <ChromaticAberration ... />
  </EffectComposer>
</Canvas>
```

- [ ] **Step 4: typecheck**

```bash
npm run typecheck
```

期望：PASS。

- [ ] **Step 5: 浏览器肉眼验证**

```bash
npm run dev
```

期望看到：
- 中央液态金属球缓慢变形，颜色在青/粉/紫之间流动
- 霓虹真正"发光"渗出（Bloom）
- 边缘有轻微 RGB 错位（色差）
- 三条 DNA 螺旋在 Bloom 下也更亮

- [ ] **Step 6: 提交**

```bash
git add src/3d/Scene.tsx
git commit -m "swap central object for SDF + add bloom/aberration postprocessing"
```

---

## Task 8: 整体验证 + 推送

**Files:** 无修改

- [ ] **Step 1: 全量 typecheck**

```bash
npm run typecheck
```

期望：PASS（0 errors）。

- [ ] **Step 2: 生产构建**

```bash
npm run build
```

期望：构建成功，dist/ 生成。

- [ ] **Step 3: 浏览器肉眼最终验收**

```bash
npm run dev
```

检查清单：
- [ ] 三条 DNA 螺旋清晰可辨，扭转流畅
- [ ] 中央 SDF 物体形态有机，颜色流动
- [ ] Bloom 让霓虹发光但不过曝
- [ ] 色差在边缘可见但不刺眼
- [ ] 滚动/切到文章页时强度衰减正常
- [ ] 控制台无报错

- [ ] **Step 4: 推送**

```bash
git push origin master
```

---

## Notes

- **关于 shader 测试**：GLSL 无法单元测试，验证手段是 typecheck + 浏览器肉眼检查 + 生产构建通过。
- **关于性能**：SDF raymarching 96 步 + 4 个 metaball 在主流显卡上 60fps 没问题；低端机可降 `步数` 或加 `AdaptiveDpr`。
- **关于色调**：所有颜色都从现有调色板取，保持赛博朋克一致性。
