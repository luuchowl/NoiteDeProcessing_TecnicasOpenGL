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

    //Polar coordinates
    vec2 pos = vec2(0.5)-st;
    float r = length(pos)*2.0;
    //float r = length(pos)*20.0;
    float a = atan(pos.y,pos.x);


    //vec2 uv = vec2(a /PI, 1.0- r);
    vec2 uv = vec2(a /PI * 4, 1.0- r);
    //vec2 uv = vec2(a /PI * 1000, 1.0- r);


    vec4 col = texture2D(u_texture, fract(uv));


    col.xyz = vec3(1.0) - col.xyz;

    //vec2 uv2 = uv + vec2(sin(u_time + st.y * 3.14) * 0.2, 0.0);
    //uv2 = fract(uv2);

    //col = texture2D(u_texture, uv2);

    gl_FragColor = col;
}
