class Background {
  constructor(r, g, b) {
    this.triangleVertices = null;
    this.shaderProgram = cbn.gl.createProgram();
    this.vertexShader = cbn.gl.createShader(cbn.gl.VERTEX_SHADER);
    this.fragmentShader = cbn.gl.createShader(cbn.gl.FRAGMENT_SHADER);

    this.initShaders('colorVertex', 'colorFragment');
    this.initBuffers(r, g, b);
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

  initBuffers(r, g, b) {
    // Set buffers
    this.triangleVertices = [
      // X, Y, Z, R, G, B
      -1, 1, 0, r, g, b,
      1, 1, 0, r, g, b,
      -1, -1, 0, r, g, b,
      1, 1, 0, r, g, b,
      1, -1, 0, r, g, b,
      -1, -1, 0, r, g, b
    ];

    var triangleVertexBufferObject = cbn.gl.createBuffer();
    cbn.gl.bindBuffer(cbn.gl.ARRAY_BUFFER, triangleVertexBufferObject);
    cbn.gl.bufferData(cbn.gl.ARRAY_BUFFER, new Float32Array(this.triangleVertices), cbn.gl.STATIC_DRAW);

    var positionAttribLocation = cbn.gl.getAttribLocation(this.shaderProgram, 'vertPosition');
    cbn.gl.vertexAttribPointer(
      positionAttribLocation, // Position Attrib location
      3, // Number of elements per attribute
      cbn.gl.FLOAT, // Type of elements
      cbn.gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // Size of individual vertex
      0 // Offset from the beginning of a single vertex to this attribute
    );
    cbn.gl.enableVertexAttribArray(positionAttribLocation);

    var colorAttribLocation = cbn.gl.getAttribLocation(this.shaderProgram, 'vertColor');
    cbn.gl.vertexAttribPointer(
      colorAttribLocation, // Position Attrib location
      3, // Number of elements per attribute
      cbn.gl.FLOAT, // Type of elements
      cbn.gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // Size of individual vertex
      4 // Offset from the beginning of a single vertex to this attribute
    );
    cbn.gl.enableVertexAttribArray(colorAttribLocation);
  }



  draw() {
    cbn.gl.useProgram(this.shaderProgram);
    cbn.gl.drawArrays(cbn.gl.TRIANGLES, 0, this.triangleVertices.length / 6);
    cbn.gl.useProgram(null);
  }
}
