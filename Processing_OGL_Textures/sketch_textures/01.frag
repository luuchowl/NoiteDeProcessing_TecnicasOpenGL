//É bem comum ver essa declaração em shaders de openGL para aumentar a sua compatibilidade
//Com webGL e OpenGL ES (Celulares, Pagers, relógios)
#ifdef GL_ES
precision mediump float;
#endif

//Indica para o processing como esse shader vai ser usado
//Ver mais em https://processing.org/tutorials/pshader/
#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
void main() {
    vec2 st = gl_FragCoord.st/u_resolution;
    gl_FragColor = vec4(st, 0.0, 1.0);
}
