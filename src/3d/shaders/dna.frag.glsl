// DNA particle fragment — tighter falloff than particle.frag
// so adjacent base pairs stay visually distinct.
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);
  if (dist > 0.5) discard;

  float core = smoothstep(0.42, 0.0, dist);
  float glow = smoothstep(0.5, 0.22, dist);
  float intensity = core * 0.88 + glow * 0.22;

  vec3 col = vColor * (0.4 + intensity * 0.85);
  gl_FragColor = vec4(col, intensity * vAlpha);
}
