uniform vec2 u_resolution;
uniform float u_time;

uniform vec2 u_mouse;

vec3 corA = vec3(1.0, 0.3, 0.4);
vec3 corB = vec3(0.0, 0.7, 0.2);

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution;

  //Criei dois valores pra oscilar o tamanho da meu círculo
  float radiusMin = 0.2;
  float radiusMax = 0.4;

  float onda = (sin(u_time) + 1.0) * 0.5;

  vec3 cor;

  //Métrica de distância do ponteiro do mouse
  float d = 1.0 - distance(st, u_mouse);

  //Oscilnado o tamanho ddo círculo
  float tamanhoAtual = mix(1.0-radiusMax, 1.0-radiusMin, onda);

  float circulo = smoothstep(tamanhoAtual-0.003, tamanhoAtual , d);

  //Faz um mix de cor;
  cor = vec3(mix(corA, corB, onda)) + vec3(mix(corA, st.xyx, onda)) * circulo;

  gl_FragColor = vec4(cor, 1.0);
}
