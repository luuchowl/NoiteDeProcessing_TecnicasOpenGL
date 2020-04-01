uniform vec2 u_resolution;
uniform float u_time;

float sdSphere(vec3 p){
  return distance(p, vec3(0.0)) - 1.0;
}

//https://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm
//Signed distance functioms
float sdBox( vec3 p, vec3 b )
{
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

float sdfShape(vec3 p){
  return sdSphere(p);
}

#define EPSILON 0.00001

//http://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/
//Jamie Wong - Ray Marching
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

  //Luz Orbitante com trigonometria
  //lightDir = normalize(vec3(sin(u_time), cos(u_time), sin(u_time * 2.0)));

  //Calcula ponto produto e retornará quão iluminada é uma face
  float shading = dot(lightDir, normal);

  //Se a distância for maior que 5, retorne um cinza para diferenciar a forma do fundo.
  if(dist > 5.0){
    shading = 0.4;
  }

  gl_FragColor = vec4(vec3(shading), 1.0);

}
