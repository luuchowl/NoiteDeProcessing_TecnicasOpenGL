#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform sampler2D u_texture;

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;
    vec2 uv = vec2(st.x, 1.0-st.y);

    vec4 col = texture2D(u_texture, uv);

    //col = vec4(col.r);
    col.xyz = vec3(1.0) - col.xyz;

    vec2 uv2 = uv + vec2(sin(u_time + st.y * 3.14) * 0.2, 0.0);
    uv2 = fract(uv2);

    col = texture2D(u_texture, uv2);

    gl_FragColor = col;
}
