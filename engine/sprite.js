class Sprite {
  constructor(x, y, width, height, texture) {
    this.position = vec2.create();
    this.position = vec2.set(this.position, x, y);
    this.triangleVertices = null;
    this.shaderProgram = cbn.gl.createProgram();
    this.vertexShader = cbn.gl.createShader(cbn.gl.VERTEX_SHADER);
    this.fragmentShader = cbn.gl.createShader(cbn.gl.FRAGMENT_SHADER);
    this.texture = cbn.gl.createTexture();

    this.initShaders('spriteVertex', 'spriteFragment');

    this.initBuffers(x, y, width, height);

    this.initTexture(texture);
  }

  initBuffers(x, y, width, height) {
    // Set buffers
    this.triangleVertices = [
      // X, Y, U, V
      x, y + height, 0.0, 0.0,
      x + width, y + height, 1.0, 0.0,
      x, y, 0.0, 1.0,
      x + width, y + height, 1.0, 0.0,
      x + width, y, 1.0, 1.0,
      x, y, 0.0, 1.0
    ];

    var triangleVertexBufferObject = cbn.gl.createBuffer();
    cbn.gl.bindBuffer(cbn.gl.ARRAY_BUFFER, triangleVertexBufferObject);
    cbn.gl.bufferData(cbn.gl.ARRAY_BUFFER, new Float32Array(this.triangleVertices), cbn.gl.STATIC_DRAW);

    var positionAttribLocation = cbn.gl.getAttribLocation(this.shaderProgram, 'vertPosition');
    cbn.gl.vertexAttribPointer(
      positionAttribLocation, // Position Attrib location
      2, // Number of elements per attribute
      cbn.gl.FLOAT, // Type of elements
      cbn.gl.FALSE,
      4 * Float32Array.BYTES_PER_ELEMENT, // Size of individual vertex
      0 // Offset from the beginning of a single vertex to this attribute
    );
    cbn.gl.enableVertexAttribArray(positionAttribLocation);

    var texCoordAttribLocation = cbn.gl.getAttribLocation(this.shaderProgram, 'vertTexCoord');
    cbn.gl.vertexAttribPointer(
      texCoordAttribLocation, // Position Attrib location
      2, // Number of elements per attribute
      cbn.gl.FLOAT, // Type of elements
      cbn.gl.FALSE,
      4 * Float32Array.BYTES_PER_ELEMENT, // Size of individual vertex
      2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );
    cbn.gl.enableVertexAttribArray(texCoordAttribLocation);
  }

  initTexture(texture) {
    cbn.gl.bindTexture(cbn.gl.TEXTURE_2D, this.texture);
    cbn.gl.texParameteri(cbn.gl.TEXTURE_2D, cbn.gl.TEXTURE_WRAP_S, cbn.gl.CLAMP_TO_EDGE);
    cbn.gl.texParameteri(cbn.gl.TEXTURE_2D, cbn.gl.TEXTURE_WRAP_T, cbn.gl.CLAMP_TO_EDGE);
    cbn.gl.texParameteri(cbn.gl.TEXTURE_2D, cbn.gl.TEXTURE_MIN_FILTER, cbn.gl.LINEAR);
    cbn.gl.texParameteri(cbn.gl.TEXTURE_2D, cbn.gl.TEXTURE_MAG_FILTER, cbn.gl.LINEAR);
    cbn.gl.texImage2D(
      cbn.gl.TEXTURE_2D, 0, cbn.gl.RGBA, cbn.gl.RGBA,
      cbn.gl.UNSIGNED_BYTE,
      cbn.getTexture(texture)
    );

    cbn.gl.bindTexture(cbn.gl.TEXTURE_2D, null);
  }

  initShaders(vertexShaderId, fragmentShaderId) {
    cbn.gl.shaderSource(this.vertexShader, cbn.shaderResources.get(vertexShaderId));
    cbn.gl.shaderSource(this.fragmentShader, cbn.shaderResources.get(fragmentShaderId));

    cbn.gl.compileShader(this.vertexShader);
    if(!cbn.gl.getShaderParameter(this.vertexShader, cbn.gl.COMPILE_STATUS)) {
      console.error("ERROR compiling vertex shader!", cbn.gl.getShaderInfoLog(this.vertexShader));
      return;
    }
    cbn.gl.compileShader(this.fragmentShader);
    if(!cbn.gl.getShaderParameter(this.fragmentShader, cbn.gl.COMPILE_STATUS)) {
      console.error("ERROR compiling fragment shader!", cbn.gl.getShaderInfoLog(this.fragmentShader));
      return;
    }


    cbn.gl.attachShader(this.shaderProgram, this.vertexShader);
    cbn.gl.attachShader(this.shaderProgram, this.fragmentShader);
    cbn.gl.linkProgram(this.shaderProgram);
    if(!cbn.gl.getProgramParameter(this.shaderProgram, cbn.gl.LINK_STATUS)) {
      console.error('ERROR linking program!', cbn.gl.getProgramInfoLog(this.shaderProgram));
      return;
    }

    //Don't do this step in release
    cbn.gl.validateProgram(this.shaderProgram);
    if(!cbn.gl.getProgramParameter(this.shaderProgram, cbn.gl.VALIDATE_STATUS)) {
      console.error('ERROR validating program!', cbn.gl.getProgramInfoLog(this.shaderProgram));
      return;
    }
  }

  draw() {
    cbn.gl.bindTexture(cbn.gl.TEXTURE_2D, this.texture);
    cbn.gl.activeTexture(cbn.gl.TEXTURE0);
    cbn.gl.useProgram(this.shaderProgram);

    //Set the camera matrix
    var cameraMatrixUniformLocation = cbn.gl.getUniformLocation(this.shaderProgram, 'p');
    cbn.gl.uniformMatrix4fv(
      cameraMatrixUniformLocation,
      false,
      cbn.camera.cameraMatrix
    );

    cbn.gl.drawArrays(cbn.gl.TRIANGLES, 0, this.triangleVertices.length / 4);
    cbn.gl.bindTexture(cbn.gl.TEXTURE_2D, null);
    cbn.gl.useProgram(null);
  }


  // STATIC FUNCTIONS
  static addSprite(x, y, width, height) {
    // var sprite = new Sprite(x, y width, height);
    // return sprite;
  }
}
