import Shader from './shader';

/**
 * An object that keeps track of all the loaded shaders
 */
class ShaderManager {
  constructor() {
    this.shaders = new Map();
  }

  /**
   * Create a new shader and add it to the list of all loaded shaders
   *
   * @param String id - the string id of the shader
   * @param String shader - the shader program in string format
   */
  createShader(id, vShader, fShader) {
    let shader = new Shader(vShader, fShader);
    this.shaders.set(id, shader);
  }

  getShader(id) {
    return this.shaders.get(id);
  }
}

export var shaderManager = new ShaderManager();
