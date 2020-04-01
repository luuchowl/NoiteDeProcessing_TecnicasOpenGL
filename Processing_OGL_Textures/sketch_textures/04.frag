#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform sampler2D u_texture;

#define PI 3.14159265358979323846


void main() {
    vec2 st = gl_FragCoord.st/u_resolution;

    //Transforma em coordenadas polares
    vec2 pos = vec2(0.5)-st;
    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);


    //Quantos ciclos tem a imagem?
    //vec2 uv = vec2(a /PI, 1.0- r);
    //vec2 uv = vec2(a /PI * 1000, 1.0- r);
    vec2 uv = vec2(a /PI * 4, 1.0- r);

    vec4 col = texture2D(u_texture, fract(uv));

    //Inverte a cor
    col.xyz = vec3(1.0) - col.xyz;

    //Aqui ele anima a uv anterior;
    vec2 uv2 = uv + vec2(sin(u_time + st.y * 3.14) * 0.2, 0.0);
    uv2 = fract(uv2);

    //Descomente a próxima linha para ver a animação 
    //col = texture2D(u_texture, uv2);

    gl_FragColor = col;
}
