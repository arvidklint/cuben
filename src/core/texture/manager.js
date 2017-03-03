import Texture from './texture';

class TextureManager {
  constructor() {
    this.textures = new Map();
  }

  create(id, image) {
    let texture = new Texture(image);
    this.textures.set(id, texture);
  }

  get(id) {
    return this.textures.get(id);
  }
}

export const textureManager = new TextureManager();
