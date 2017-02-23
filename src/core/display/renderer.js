import { createContext } from '../../gl/gl';

export default class Renderer {
  constructor(canvas, camera) {
    this.canvas = canvas;
    this.camera = camera;
    this.renderables = [];
    this.gl = createContext(canvas);
  }

  add(renderable) {
    this.renderables.push(renderable);
  }

  flush() {
    this.gl = createContext(this.canvas);
    this.gl.clearColor(0.3, 0.8, 0.4, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    let count = 0;
    for(var renderable of this.renderables) {
      renderable.render();
    }
    this.renderables = [];
  }
}
