//uniform vec2 u_resolution;

vec3 corA = vec3(1.0, 0.3, 0.4);
vec3 corB = vec3(0.0, 0.7, 0.2);

void main(){
    //vec2 st = gl_FragCoord.xy/u_resolution;

    //Cores também são vetores em openGL
    vec3 cor;
    cor = corA;

    //Você pode fazer operações como subtração, adição e multiplicação
    // cor = corA + corB;
    // cor = corA - corB;
    // cor = corA * corB;

    //Vetores em openGL podem ser acessados pelos seus elementos e utiliza-los
    //em qualquer ordem
    // cor = corA.gbr;
    // cor = corA.yzx;

    //Criando vetores, os contrutores também são bem flexíveis em compor seus elemntos.
    // cor = vec3(corA.rg, corB.g);
    // cor = vec3(corA.b);

    //Operações
    // cor = corA.brg - corB.ggr;

    //Operando cores com vetores de posição
    //cor.rg = corA.rg - st;
    //cor.rg = corA.rg + st.gr;

    //cor.rg = corA.rg = st.gr;

    gl_FragColor = vec4(cor, 1.0);
}
