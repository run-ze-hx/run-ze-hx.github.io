// DNA double helix particle placement
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform vec3 uColor;
uniform float uRadius;
uniform float uTwist;
uniform float uLength;

attribute float aSeed;
attribute float aT;
attribute float aStrand;

varying vec3 vColor;
varying float vAlpha;

void main() {
  float xPos = (aT - 0.5) * uLength;

  float angle = aT * uTwist * 6.2831853 + uTime * 0.4;

  vec3 pos;
  if (aStrand < 0.5) {
    pos = vec3(xPos, uRadius * cos(angle), uRadius * sin(angle));
  } else if (aStrand < 1.5) {
    pos = vec3(xPos, -uRadius * cos(angle), -uRadius * sin(angle));
  } else {
    float rungT = fract(aSeed * 2.0);
    float yA = uRadius * cos(angle);
    float zA = uRadius * sin(angle);
    float yB = -uRadius * cos(angle);
    float zB = -uRadius * sin(angle);
    pos = vec3(xPos, mix(yA, yB, rungT), mix(zA, zB, rungT));
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * uPixelRatio * (180.0 / -mvPosition.z);

  vColor = uColor;
  float baseAlpha = aStrand > 1.5 ? 0.5 : 0.9;
  vAlpha = baseAlpha * (0.7 + 0.3 * sin(uTime * 2.0 + aSeed * 10.0));
}
