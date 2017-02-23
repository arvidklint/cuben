import { createContext } from '../../gl/gl';

/**
 *  Texture class
 */
export default class Texture {
  /**
   * @param Image image - the html image element to create the texture from
   */
  constructor(image) {
    this.image = image;
  }

  init(canvas) {
    this.gl = createContext(canvas);
    let gl = this.gl;

    this.texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
      gl.UNSIGNED_BYTE,
      this.image
    );

    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  /**
   * @param Image image - the html image element to create the texture from
   */
  _bindTexture() {

  }

  bind() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.activeTexture(this.gl.TEXTURE0);
  }

  unbind() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }
}
