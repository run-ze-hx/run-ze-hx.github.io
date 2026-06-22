// Soft circular particle with neon core and soft glow edge
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);
  if (dist > 0.5) discard;

  float core = smoothstep(0.5, 0.0, dist);
  float glow = smoothstep(0.5, 0.1, dist);
  float intensity = core * 0.8 + glow * 0.4;

  vec3 col = vColor * (0.5 + intensity * 1.2);
  gl_FragColor = vec4(col, intensity * vAlpha);
}
