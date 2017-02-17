var player;

function preload() {
  console.log("preloading");

  // Load textures
  loadTexture('/imgs/test.png', 'megaman');
  loadTexture('/imgs/mario.png', 'mario');

  // Load shaders
  loadShader('/engine/shaders/sprite.frag', 'spriteFragment');
  loadShader('/engine/shaders/sprite.vert', 'spriteVertex');

  loadShader('/engine/shaders/color.frag', 'colorFragment');
  loadShader('/engine/shaders/color.vert', 'colorVertex');
}

function setup() {
  player = new Player();
}
