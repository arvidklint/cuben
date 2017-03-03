var megaman;

function preload() {
  console.log("preloading");

  // Load textures
  CBN.load.texture('megaman', './imgs/test.png');
  CBN.load.texture('mario', './imgs/mario.png');
  // loadTexture('/imgs/mario.png', 'mario');
  //
  // // Load shaders
  // loadShader('/engine/shaders/sprite.frag', 'spriteFragment');
  // loadShader('/engine/shaders/sprite.vert', 'spriteVertex');
  //
  // loadShader('/engine/shaders/color.frag', 'colorFragment');
  // loadShader('/engine/shaders/color.vert', 'colorVertex');
}

function setup() {
  megaman = new CBN.Sprite(30, 20, 100, 100, 'megaman');
  app.scene.add(megaman);
  mario = new CBN.Sprite(20, 20, 100, 100, 'mario');
  app.scene.add(mario);
}

function update() {
  mario.x += 0.1;
  megaman.y += 1;
}

var app = new CBN.Application();
app.start();
document.body.appendChild(app.scene.canvas);
