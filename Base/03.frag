//uniform vec2 u_resolution;

vec3 corA = vec3(1.0, 0.3, 0.4);
vec3 corB = vec3(0.0, 0.7, 0.2);

void main(){
    //vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 cor;
    cor = corA;

    // cor = corA + corB;
    // cor = corA - corB;
    // cor = corA * corB;

    //Acessando vetores
    // cor = corA.gbr;
    // cor = corA.yzx;

    //Criando vetores
    // cor = vec3(corA.rg, corB.g);
    // cor = vec3(corA.b);

    //Operações
    // cor = corA.brg - corB.ggr;

    //cor.rg = corA.rg - st;
    //cor.rg = corA.rg + st.gr;

    //cor.rg = corA.rg = st.gr;

    gl_FragColor = vec4(cor, 1.0);
}
