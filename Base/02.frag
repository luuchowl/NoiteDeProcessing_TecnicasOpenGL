uniform vec2 u_resolution;


void main(){
    //Normalizar as coordenadas da tela para 0 a 1;
    vec2 st = gl_FragCoord.xy/u_resolution;

    //Todo shader precisa preencher o gl_FragColor;
    gl_FragColor = vec4(st, 0.0, 0);
}
