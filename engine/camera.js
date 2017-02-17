function Camera(width, height) {
  this.position = vec2.create();
  this.cameraMatrix = mat4.create();
  this.orthoMatrix = mat4.create();
  this.orthoMatrix = mat4.ortho(this.orthoMatrix, 0.0, width, 0.0, height, 0, 100);
  this.width = width;
  this.height = height;
  this.scale = 1;
}

Camera.prototype.update = function() {
  var translationVector = vec3.create();
  translationVector = vec3.set(translationVector, -this.position[0], -this.position[1], 0.0);
  this.cameraMatrix = mat4.translate(this.cameraMatrix, this.orthoMatrix, translationVector);
  var scaleVector = vec3.create();
  scaleVector = vec3.set(scaleVector, this.scale, this.scale, 0.0);
  this.cameraMatrix = mat4.scale(this.cameraMatrix, this.cameraMatrix, scaleVector);
}
