import Vector2 from '../math/vector2';

export default class Camera {
  constructor(width, height) {
    this.position = new Vector2();
    this.cameraMatrix = mat4.create();
    this.orthoMatrix = mat4.create();
    this.orthoMatrix = mat4.ortho(this.orthoMatrix, 0.0, width, 0.0, height, 0, 100);
    this.size = new Vector2(width, height);
    this.scale = 1;
  }

  update() {
    var translationVector = vec3.create();
    translationVector = vec3.set(translationVector, -this.position.x, -this.position.y, 0.0);
    this.cameraMatrix = mat4.translate(this.cameraMatrix, this.orthoMatrix, translationVector);
    var scaleVector = vec3.create();
    scaleVector = vec3.set(scaleVector, this.scale, this.scale, 0.0);
    this.cameraMatrix = mat4.scale(this.cameraMatrix, this.cameraMatrix, scaleVector);
  }

  set x(value) {
    this.position.x = value;
  }

  get x() {
    return this.position.x;
  }

  set y(value) {
    this.position.y = value;
  }

  get y() {
    return this.position.y;
  }

  get width() {
    return this.size.x;
  }

  get height() {
    return this.size.y;
  }
}
