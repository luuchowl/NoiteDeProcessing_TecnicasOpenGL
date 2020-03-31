uniform vec2 u_resolution;

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

float raymarch(vec3 origin, vec3 direction){
  float dist = 0.0;
  for(int i = 0; i<64; i++){
    vec3 p = origin + direction * dist;
    float d = sdBox(p, vec3(0.5));
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

  gl_FragColor = vec4(vec3(dist /30.0), 1.0);

}
