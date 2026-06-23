// sdf.frag.glsl — raymarched liquid-metal metaballs
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

float sdSphere(vec3 p, float r) { return length(p) - r; }

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k*h*(1.0-h);
}

float map(vec3 p) {
  float t = uTime * 0.5;
  vec3 b1 = vec3(sin(t)*0.6, cos(t*1.3)*0.4, sin(t*0.7)*0.5);
  vec3 b2 = vec3(cos(t*1.1)*0.5, sin(t*0.9)*0.5, cos(t*1.5)*0.3);
  vec3 b3 = vec3(sin(t*0.8+1.0)*0.7, sin(t*1.2)*0.3, cos(t*0.6+2.0)*0.5);
  vec3 b4 = vec3(cos(t*1.4+3.0)*0.4, cos(t*0.5+1.0)*0.6, sin(t*1.1+1.5)*0.4);

  float d = sdSphere(p - b1, 0.55);
  d = smin(d, sdSphere(p - b2, 0.5), 0.5);
  d = smin(d, sdSphere(p - b3, 0.6), 0.5);
  d = smin(d, sdSphere(p - b4, 0.45), 0.5);

  float n = snoise(p * 1.5 + vec3(t * 0.6));
  d += n * uDistort;

  return d;
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.001, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

void main() {
  vec2 uv = (vUv - 0.5) * vec2(uAspect, 1.0) * 2.0;

  vec3 ro = uCamPos;
  vec3 rd = normalize(vec3(uv, -1.5));

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
    gl_FragColor = vec4(0.0);
    return;
  }

  vec3 p = ro + rd * t;
  vec3 n = calcNormal(p);
  vec3 viewDir = -normalize(rd);

  float fresnel = pow(1.0 - max(dot(n, viewDir), 0.0), 2.5);

  float mixT = snoise(p * 2.0 + uTime * 0.3) * 0.5 + 0.5;
  vec3 base = mix(uColorA, uColorB, mixT);
  vec3 col = mix(base, uColorC, fresnel);
  col += fresnel * 0.6;

  vec3 lightDir = normalize(vec3(0.5, 0.8, 0.5));
  float spec = pow(max(dot(reflect(-lightDir, n), viewDir), 0.0), 32.0);
  col += spec * 0.4;

  gl_FragColor = vec4(col, 1.0);
}
