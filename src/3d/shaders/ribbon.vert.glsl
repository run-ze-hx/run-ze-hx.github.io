// Ribbon particle — particles flow along a curved path
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform vec3 uColor;
uniform float uCurveAmp;
uniform float uCurveFreq;

attribute float aSeed;
attribute float aT; // 0..1 along the ribbon

varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 pos = position;
  float phase = uTime * 0.3 + aSeed;
  pos.x += sin(phase + aT * 6.28 * uCurveFreq) * uCurveAmp;
  pos.y += cos(phase * 1.3 + aT * 4.0) * uCurveAmp * 0.7;
  pos.z += sin(phase * 0.7 + aT * 8.0) * uCurveAmp;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * uPixelRatio * (180.0 / -mvPosition.z);

  float fade = sin(aT * 3.14159);
  vColor = uColor;
  vAlpha = fade * (0.6 + 0.4 * sin(uTime * 2.0 + aSeed * 10.0));
}
