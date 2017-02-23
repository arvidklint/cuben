import Renderable from './display/renderable';

/**
 * @class Sprite
 * @memberof CBN
 * @extends CBN.Renderable
 */
export default class Sprite extends Renderable {
  /**
   * @param Number x - position x
   * @param Number y - position y
   * @param Number width - the width of the sprite
   * @param Number height - the height of the sprite
   * @param Texture texture - the texture for this sprite
   */
  constructor(x, y, width, height, texture, shader = "spriteShader") {
    super(x, y, width, height, texture, shader);
  }
}
