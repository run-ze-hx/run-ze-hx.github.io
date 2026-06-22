// Star dust — static distant points with subtle twinkle
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform vec3 uColor;

attribute float aSeed;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * uPixelRatio * (200.0 / -mvPosition.z);

  float twinkle = 0.5 + 0.5 * sin(uTime * 0.8 + aSeed * 20.0);
  vColor = uColor;
  vAlpha = 0.3 + twinkle * 0.5;
}
