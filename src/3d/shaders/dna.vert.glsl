// DNA double helix — scientifically structured (B-DNA)
// Categories (aStrand):
//   0 = backbone A (sugar-phosphate, antiparallel 5'->3')
//   1 = backbone B (3'->5', ~180° phase offset)
//   2 = base attached to A (A or G — purine)
//   3 = base attached to B (T or C — pyrimidine, complementary)
//   4 = H-bond (A-T pair = 2 bonds, G-C pair = 3 bonds)
//
// aBase encoding:
//   0 = A, 1 = T, 2 = G, 3 = C
// For H-bonds, aBase uses 0 (A-T) or 2 (G-C) just to pick pair type.

uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform float uRadius;       // backbone radius from helix axis
uniform float uTwistPerBp;   // radians per base pair (B-DNA ~0.6283 = 36°)
uniform float uLength;       // total Y span
uniform float uBasePairs;    // number of base pairs along the helix

uniform vec3 uColorBackbone;
uniform vec3 uColorBaseAT;
uniform vec3 uColorBaseGC;
uniform vec3 uColorBond;

attribute float aSeed;
attribute float aT;          // 0..1 along helix
attribute float aStrand;     // 0..4
attribute float aBase;       // 0=A, 1=T, 2=G, 3=C
attribute float aBondIdx;    // 0..2 for parallel H-bonds

varying vec3 vColor;
varying float vAlpha;

void main() {
  float bpIdx = aT * uBasePairs;
  float angle = bpIdx * uTwistPerBp;
  float yPos = (aT - 0.5) * uLength;

  // B-DNA antiparallel phase (~180°) — gives the major/minor groove asymmetry
  float antiPhase = 3.14159265;

  vec3 pos;
  float ptSize = uSize;
  float alpha = 0.9;

  if (aStrand < 0.5) {
    // Backbone A
    pos = vec3(uRadius * cos(angle), yPos, uRadius * sin(angle));
    vColor = uColorBackbone * 1.1;
    ptSize = uSize * 1.35;
  } else if (aStrand < 1.5) {
    // Backbone B
    pos = vec3(uRadius * cos(angle + antiPhase), yPos, uRadius * sin(angle + antiPhase));
    vColor = uColorBackbone * 1.1;
    ptSize = uSize * 1.35;
  } else if (aStrand < 2.5) {
    // Base on strand A — extends inward from backbone
    float baseR = uRadius * 0.55;
    pos = vec3(baseR * cos(angle), yPos, baseR * sin(angle));
    vColor = (aBase < 1.5) ? uColorBaseAT : uColorBaseGC;
    ptSize = uSize * 0.95;
  } else if (aStrand < 3.5) {
    // Base on strand B — complementary
    float baseR = uRadius * 0.55;
    pos = vec3(baseR * cos(angle + antiPhase), yPos, baseR * sin(angle + antiPhase));
    vColor = (aBase < 1.5) ? uColorBaseAT : uColorBaseGC;
    ptSize = uSize * 0.95;
  } else {
    // H-bond particle between paired bases
    float bondCount = (aBase < 1.5) ? 2.0 : 3.0;
    float t = (aBondIdx + 0.5) / bondCount;

    vec3 baseAPos = vec3(uRadius * 0.55 * cos(angle), yPos, uRadius * 0.55 * sin(angle));
    vec3 baseBPos = vec3(uRadius * 0.55 * cos(angle + antiPhase), yPos, uRadius * 0.55 * sin(angle + antiPhase));

    // Parallel bonds: offset perpendicular to the bond axis
    vec3 bondDir = baseBPos - baseAPos;
    vec3 perp = normalize(cross(bondDir, vec3(0.0, 1.0, 0.0)));
    float spacing = uRadius * 0.18;
    float offset = (aBondIdx - (bondCount - 1.0) * 0.5) * spacing;

    pos = mix(baseAPos, baseBPos, t) + perp * offset;
    vColor = uColorBond;
    ptSize = uSize * 0.45;
    alpha = 0.5;
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = ptSize * uPixelRatio * (180.0 / -mvPosition.z);

  // Subtle life pulse
  float pulse = 0.85 + 0.15 * sin(uTime * 1.5 + aSeed * 10.0);
  vAlpha = alpha * pulse;
}
