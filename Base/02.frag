
uniform vec2 u_resolution;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    gl_FragColor = vec4(st, 0.0, 0);
}
