import Vector2 from '../math/vector2';
import { createContext } from '../../gl/gl';
import { textureManager } from '../texture/manager';
import { shaderManager } from '../shader/manager';

export default class Renderable {
  constructor(x, y, width, height, texture, shader) {
    this.position = new Vector2(x, y);
    this.anchor = new Vector2(0.5, 0.5);
    this.size = new Vector2(width, height);
    this.scale = 1;
    this.triangleVertices = null;
    this.texture = textureManager.get(texture);
    this.shader = shaderManager.get(shader);
  }

  init_rendering(canvas, camera, grid) {
    this.camera = camera;
    this.gl = createContext(canvas);
    this.grid = grid;

    // Add itself to the grid
    this.grid.add(this);

    console.log("init rendering");
    this.shader.init(canvas);
    this.texture.init(canvas);

    this._initBuffers();
  }

  // @TODO make another class for buffers
  _initBuffers() {
    // Set buffers
    let x = this.x;
    let y = this.y;
    let width = this.width;
    let height = this.height;
    this.triangleVertices = [
      // X, Y, U, V
      x, y + height, 0.0, 0.0,
      x + width, y + height, 1.0, 0.0,
      x, y, 0.0, 1.0,
      x + width, y + height, 1.0, 0.0,
      x + width, y, 1.0, 1.0,
      x, y, 0.0, 1.0
    ];

    this.vao = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vao);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.triangleVertices), this.gl.STATIC_DRAW);

    // unbind buffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }

  bindBuffer() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vao);
  }

  unbindBuffer() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }

  render() {
    this.texture.bind();
    this.shader.use();
    this.bindBuffer();

    this.shader.setVertexAttribPointer('vertPosition', 2, 4, 0);
    this.shader.setVertexAttribPointer('vertTexCoord', 2, 4, 2);

    //Set the camera matrix
    this.shader.setUniformMatrix4fv('p', this.camera.cameraMatrix);

    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.triangleVertices.length / 4);

    this.texture.unbind();
    this.unbindBuffer();
    this.shader.unuse();
  }

  _updatePosition() {
    let x = this.x;
    let y = this.y;
    let width = this.width;
    let height = this.height;
    this.triangleVertices = [
      // X, Y, U, V
      x, y + height, 0.0, 0.0,
      x + width, y + height, 1.0, 0.0,
      x, y, 0.0, 1.0,
      x + width, y + height, 1.0, 0.0,
      x + width, y, 1.0, 1.0,
      x, y, 0.0, 1.0
    ];
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vao);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.triangleVertices), this.gl.STATIC_DRAW);
    // unbind buffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }

  moveTo(x, y) {
    if(this.grid === null) {
      console.error("grid not initialised");
      return;
    }

    this.grid.remove(this);
    this.grid.add(this);
  }

  set x(value) {
    this.position.x = value;
    this._updatePosition();
  }

  get x() {
    return this.position.x;
  }

  set y(value) {
    this.position.y = value;
    this._updatePosition();
  }

  get y() {
    return this.position.y;
  }

  set width(value) {
    this.size.x = value;
  }

  get width() {
    return this.size.x;
  }

  set height(value) {
    this.size.y = value;
  }

  get height() {
    return this.size.y;
  }
}
