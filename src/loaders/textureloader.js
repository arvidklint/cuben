import { textureManager } from '../core/texture/manager';
import { loadingManager } from './manager';

export function loadTexture(id, url) {
  loadingManager.count++;
  var image = new Image();
  image.onload = function() {
    console.log("Loaded image: " + id);
    loadingManager.count--;
    textureManager.create(id, image);
  };
  image.src = url;
};
