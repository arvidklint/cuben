import { shaderManager } from '../core/shader/manager';
import { loadingManager } from './manager';

export function loadShader(id, url) {
  loadingManager.count++;
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    loadingManager.count--;
    if (request.status < 200 || request.status > 299) {
      console.error('Error: HTTP Status ' + request.status + ' when loading ' + url);
    } else {
      shaderManager.create(id, request.responseText);
    }
  }
  request.send();
};
