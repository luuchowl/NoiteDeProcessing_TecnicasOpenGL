uniform vec2 u_resolution;
uniform float u_time;

vec3 corA = vec3(1.0, 0.3, 0.4);
vec3 corB = vec3(0.0, 0.7, 0.2);

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;

    //Multiplica o canvas para ter tamanho de 0 a 10;
    st *= 10.0;

    //Retorna só a parte fracionária do st, "0.1, 0.2.. 0.9, 0, 0.1, 0.2"
    st = fract(st);


      float radiusMin = 0.2;
      float radiusMax = 0.4;

      float onda = (sin(u_time) + 1.0) * 0.5;

      vec3 cor;

      //Move o campo de distancia;
      //float d = 1.0 - distance(st, u_mouse);
      float d = 1.0 - distance(st, vec2(sin(u_time) * 0.5 + 0.5, cos(u_time * 5.0) * 0.5 + 0.5));

      float tamanhoAtual = mix(1.0-radiusMax, 1.0-radiusMin, onda);

      float circulo = smoothstep(tamanhoAtual-0.003, tamanhoAtual , d);

      //Interpola cores
      cor = vec3(mix(corA, corB, onda)) + vec3(mix(corA, st.xyx, onda)) * circulo;

      gl_FragColor = vec4(cor, 1.0);



}
