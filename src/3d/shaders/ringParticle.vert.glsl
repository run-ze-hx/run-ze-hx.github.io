// Orbiting ring particles — vertex shader computes position on a ring in real-time
// CPU never touches particle positions, all done on GPU for 4K 60fps

uniform float uTime;
uniform float uSpeed;
uniform float uRadius;
uniform float uJitter;
uniform float uFlatten;
uniform float uTilt;
uniform float uPixelRatio;
uniform vec3 uColor;
uniform float uSize;
uniform float uAttract; // 0..1, pulled by pointer / dragging panel

attribute float aSeed;
attribute float aAngleOffset;

varying vec3 vColor;
varying float vAlpha;

mat3 rotateY(float theta) {
  float c = cos(theta);
  float s = sin(theta);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

mat3 rotateX(float theta) {
  float c = cos(theta);
  float s = sin(theta);
  return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
}

void main() {
  float angle = aAngleOffset + uTime * uSpeed;
  float jitterR = sin(uTime * 0.6 + aSeed * 6.2831) * uJitter;
  float radius = uRadius + jitterR + uAttract * 0.15 * uRadius * sin(aSeed * 12.0);

  vec3 pos;
  pos.x = cos(angle) * radius;
  pos.z = sin(angle) * radius;
  pos.y = sin(angle * 0.5 + aSeed * 3.14) * uFlatten * radius * 0.05;

  pos = rotateX(uTilt) * rotateY(uTilt * 0.4) * pos;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float size = uSize * uPixelRatio * (1.0 + uAttract * 0.8);
  gl_PointSize = size * (300.0 / -mvPosition.z);

  float twinkle = 0.5 + 0.5 * sin(uTime * 2.0 + aSeed * 10.0);
  vColor = uColor;
  vAlpha = twinkle * (0.6 + 0.4 * uAttract);
}
