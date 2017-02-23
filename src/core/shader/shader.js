import { createContext } from '../../gl/gl';

export default class Shader {
  constructor(vString, fString) {
    this.vertexShaderString = vString;
    this.fragmentShaderString = fString;
  }

  init(canvas) {
    console.log("init shader");
    this.gl = createContext(canvas);
    let gl = this.gl;

    this.program = gl.createProgram();
    this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
    this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    // console.log(fString);
    gl.shaderSource(this.vertexShader, this.vertexShaderString);
    gl.shaderSource(this.fragmentShader, this.fragmentShaderString);

    gl.compileShader(this.vertexShader);
    if(!gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS)) {
      console.error("ERROR compiling vertex shader!", gl.getShaderInfoLog(this.vertexShader));
      return;
    }
    gl.compileShader(this.fragmentShader);
    if(!gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS)) {
      console.error("ERROR compiling fragment shader!", gl.getShaderInfoLog(this.fragmentShader));
      return;
    }


    gl.attachShader(this.program, this.vertexShader);
    gl.attachShader(this.program, this.fragmentShader);
    gl.linkProgram(this.program);
    if(!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error('ERROR linking program!', gl.getProgramInfoLog(this.program));
      return;
    }

    //Don't do this step in release
    gl.validateProgram(this.program);
    if(!gl.getProgramParameter(this.program, gl.VALIDATE_STATUS)) {
      console.error('ERROR validating program!', gl.getProgramInfoLog(this.program));
      return;
    }
  }

  setVertexAttribPointer(name, elementSize, vertexSize, offset) {
    let gl = this.gl;
    let attribLocation = gl.getAttribLocation(this.program, name);
    gl.vertexAttribPointer(
      attribLocation, // Position Attrib location
      elementSize, // Number of elements per attribute
      gl.FLOAT, // Type of elements
      gl.FALSE,
      vertexSize * Float32Array.BYTES_PER_ELEMENT, // Size of individual vertex
      offset * Float32Array.BYTES_PER_ELEMENT// Offset from the beginning of a single vertex to this attribute
    );
    gl.enableVertexAttribArray(attribLocation);
  }

  setUniformMatrix4fv(name, matrix) {
    let location = this.gl.getUniformLocation(this.program, name);
    this.gl.uniformMatrix4fv(
      location,
      false,
      matrix
    );
  }

  use() {
    this.gl.useProgram(this.program);
  }

  unuse() {
    this.gl.useProgram(null);
  }
}
