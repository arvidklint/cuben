import Texture from './texture';

class TextureManager {
  constructor() {
    this.textures = new Map();
  }

  createTexture(id, image) {
    let texture = new Texture(image);
    this.textures.set(id, texture);
  }

  getTexture(id) {
    return this.textures.get(id);
  }
}

export const textureManager = new TextureManager();
