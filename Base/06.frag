uniform vec2 u_resolution;
uniform float u_time;

uniform vec2 u_mouse;

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution;

  //As vezes é necessário remapear as coordenadas em pixel do mouse para coordenadas relativas
  //vec2 mouse_n = u_mouse / u_resolution;

  vec3 cor;

  //Criando um campo de distância a partir da posição do mouse;
  float d = 1.0 - distance(st, u_mouse);

  cor = vec3(d);
  cor = vec3(smoothstep(0.895, 0.9, d));

  gl_FragColor = vec4(cor, 1.0);
}
