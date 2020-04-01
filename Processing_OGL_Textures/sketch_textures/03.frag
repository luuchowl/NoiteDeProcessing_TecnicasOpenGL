#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform sampler2D u_texture;
uniform sampler2D u_flowTex;
uniform sampler2D u_randomTex;

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;
    vec2 uv = vec2(st.x, 1.0-st.y);

    //As duas linhas abaixo usam dois tipos de textura para alterar a imagem;

    //Essa para random vectors (Parece um mosaico)
    vec2 distortion = texture2D(u_randomTex, fract(uv + fract(vec2(0, u_time * 0.02)))).rg;

    //Essa para flow maps
    //vec2 distortion = texture2D(u_flowTex, fract(uv + fract(vec2(0, u_time * 0.02)))).rg;

    //Soma a distorção no uv. Lembre-se que a magnitude é igual a cor do pixel na textura de distorção
    vec4 col = texture2D(u_texture, uv + distortion * 0.1);

    gl_FragColor = col;
}
