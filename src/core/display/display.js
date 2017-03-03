import Renderer from './renderer';
import Camera from './camera';
import Grid from './grid';

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

    this.grid = new Grid();
  }

  add(renderable) {
    renderable.init_rendering(this.canvas, this.camera, this.grid);
    this.renderables.push(renderable);
  }

  update() {
    this.camera.update();

    let x1 = this.camera.x;
    let x2 = this.camera.x + this.camera.width;
    let y1 = this.camera.y;
    let y2 = this.camera.y + this.camera.height;

    for(let x = 0; x < this.grid.width; x++) {
      for(let y = 0; y < this.grid.height; y++) {
        let rs = this.grid.getCell(x, y).getRenderables();
        if(rs != null) {
          for(let r of rs) {
            this.renderer.add(r);
          }
        }
      }
    }

    // for(let r of this.renderables) {
    //   this.renderer.add(r);
    // }
  }

  draw() {
    this.renderer.flush();
  }
}
