#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
void main() {
    vec2 st = gl_FragCoord.st/u_resolution;
    gl_FragColor = vec4(st, 0.0, 1.0);
}
