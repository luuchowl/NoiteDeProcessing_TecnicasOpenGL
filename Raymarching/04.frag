uniform vec2 u_resolution;
uniform float u_time;

vec3 corA = vec3(1.0, 0.3, 0.4);
vec3 corB = vec3(0.0, 0.7, 0.2);

//https://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm
//Signed distance functioms
//A função agora tem a origem da esfera e o raio dela;
float sdSphere(vec3 p, vec3 origin, float radius){
  return distance(p, origin) - radius;
}

float sdBox( vec3 p, vec3 b )
{
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

//Une dois campos de distância/Métrica
float opUnion(float d1, float d2){
  return min(d1, d2);
}

//Une dois campos de distância de uma forma suavizada
float opSmoothUnion( float d1, float d2, float k ) {
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h); }


//A função agora une três objetos;
float sdfShape(vec3 p){
  float op1 = opSmoothUnion(
                sdSphere(p, vec3(sin(u_time)*0.2, 1.0-cos(u_time), sin(u_time*2.0)*0.5), 1. +sin(u_time * 5.0) * 0.1),
                sdSphere(p, vec3(sin(u_time), cos(u_time), sin(u_time*2.0)*0.5), 0.7),
                0.9
                );

  float op2 = opSmoothUnion(
                op1,
                sdBox(p, vec3(0.3, 0.3, 0.3)),
                0.4
          );
  return op2;

}


//http://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/
//Jamie Wong - Ray Marching
#define EPSILON 0.00001
vec3 estimateNormal(vec3 p) {
    return normalize(vec3(
        sdfShape(vec3(p.x + EPSILON, p.y, p.z)) - sdfShape(vec3(p.x - EPSILON, p.y, p.z)),
        sdfShape(vec3(p.x, p.y + EPSILON, p.z)) - sdfShape(vec3(p.x, p.y - EPSILON, p.z)),
        sdfShape(vec3(p.x, p.y, p.z  + EPSILON)) - sdfShape(vec3(p.x, p.y, p.z - EPSILON))
    ));
}


float raymarch(vec3 origin, vec3 direction){
  float dist = 0.0;
  for(int i = 0; i<164; i++){
    vec3 p = origin + direction * dist;
    float d = sdfShape(p);
    if(d<=0.0){
      break;
    }
    dist += d;
  }
  return dist;
}


void main(){
  vec2 coord = 2.0 * gl_FragCoord.xy / u_resolution - vec2(1.0);

  vec3 direction = normalize(vec3(coord, 1.0));
  vec3 origin = vec3(0.0, 0.0, -3.0);
  float dist = raymarch(origin, direction);


  vec3 p = origin + dist*direction;

  vec3 normal = estimateNormal(p);


  //Luz
  vec3 lightDir = normalize(vec3(-1.0));
  lightDir = normalize(vec3(sin(u_time), cos(u_time), -0.5));

  //Calcula o sombreamento da face
  float shading = dot(lightDir, normal);

  if(dist > 10.0){
    shading = 0.4;
  }


  //Agora estamos interpolando as cores do primeiro arquivo em função do sombreamento
  gl_FragColor = vec4(mix(corA, corB, shading), 1.0);
  //gl_FragColor = vec4(vec3(shading), 1.0);

}
