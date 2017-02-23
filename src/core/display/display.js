import Renderer from './renderer';
import Camera from './camera';

export default class Display {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.renderables = [];

    // Create a new canvas
    this.canvas = document.createElement('canvas');
    this.canvas.id = "cuben-game";
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.background = "blue";
    this.camera = new Camera(width, height);

    this.renderer = new Renderer(this.canvas, this.camera);

  }

  add(renderable) {
    renderable.init_rendering(this.canvas, this.camera);
    this.renderables.push(renderable);
  }

  update() {
    this.camera.update();
    for(let r of this.renderables) {
      this.renderer.add(r);
    }
  }

  draw() {
    this.renderer.flush();
  }
}
