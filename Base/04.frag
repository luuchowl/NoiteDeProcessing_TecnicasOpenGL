uniform vec2 u_resolution;

vec3 corA = vec3(1.0, 0.3, 0.4);
vec3 corB = vec3(0.0, 0.7, 0.2);

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  //Em diversas linguagens, a função é LERP
  //Mix interpola valores entre escalares e vetores;
  vec3 corFinal = mix(corA, corB, st.x);
  //vec3 corFinal = mix(corA, corB, distance(st.x, st.y));

  gl_FragColor = vec4(corFinal, 1.0);
}
