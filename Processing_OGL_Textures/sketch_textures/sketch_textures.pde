PShader shader;
PImage img, img2, img3;

void setup() {
  size(800, 800, P2D);
  noStroke();
  img = loadImage("img1.png");
  img2 = loadImage("randomvectors.jpg");
  img3 = loadImage("flow.png");
  shader = loadShader("04.frag");
}

void draw() {
  shader.set("u_resolution", float(width), float(height));
  //shader.set("u_mouse", float(mouseX), float(mouseY));
  shader.set("u_time", millis() / 1000.0);
  shader.set("u_texture",img);
  shader.set("u_randomTex", img2);
  shader.set("u_flowTex", img3);
  
  shader(shader);
  rect(0,0,width,height);
}
