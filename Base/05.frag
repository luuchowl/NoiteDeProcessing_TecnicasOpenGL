uniform vec2 u_resolution;
uniform float u_time;

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution;

  vec3 cor;

  //A função step retorna 0 para o que está a baixo do elemento e 1 para o que está acima
  cor = vec3(step(st.x, 0.6));

  //Smoothstep cria um intervalo para essa interpolação do step
  //vec3 cor = vec3(smoothstep(0.1, 0.3, st.x));


  //Aqui criamos uma onda usando u_time para controlar melhor a onda
  //float onda = (sin(u_time) + 1.0) * 0.5;
  //cor = vec3(onda);

  //cor = vec3(step(st.x, onda));

  //cor.r = (step(st.y, onda));
  //cor.g = (step(st.x, onda));

  gl_FragColor = vec4(cor, 1);
}
