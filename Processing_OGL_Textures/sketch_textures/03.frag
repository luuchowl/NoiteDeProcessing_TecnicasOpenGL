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

    //vec2 distortion = texture2D(u_randomTex, fract(uv + fract(vec2(0, u_time * 0.02)))).rg;
    vec2 distortion = texture2D(u_flowTex, fract(uv + fract(vec2(0, u_time * 0.02)))).rg;

    vec4 col = texture2D(u_texture, uv + distortion * 0.1);

    gl_FragColor = col;
}
