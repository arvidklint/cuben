class Player extends CBN.GameObject {
  constructor() {
    super("megaman");
    this.sprite = new Sprite(100, 100, 50, 50, 'mario');
  }

  setup() {
    console.log("player setup");
  }

  update() {
    console.log("updating player");
  }

  draw() {
    this.sprite.draw();
  }
}
