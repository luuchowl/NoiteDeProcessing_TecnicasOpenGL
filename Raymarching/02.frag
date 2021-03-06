uniform vec2 u_resolution;

//https://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm

float sdSphere(vec3 p){
  return distance(p, vec3(0.0)) - 1.0;
}

//Signed distance functioms
float sdBox( vec3 p, vec3 b )
{
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

//Criei essa função pra armazenar a "Cena Completa" de sdfs
float sdfShape(vec3 p){
  return sdSphere(p);
}



//Constante de distância para calcular normal por aproximação
#define EPSILON 0.0001

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
    //Importante que agora está em outra função
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

  //P é o ponto que foi antingido no espaço pelo "raymarch"
  vec3 p = origin + dist*direction;

  //Calcula a normal
  vec3 normal = estimateNormal(p);

  //Retorna a normal de uma face
  gl_FragColor = vec4(normal, 1.0);

}
