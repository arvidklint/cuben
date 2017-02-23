export function loadShader(id, url) {
  cuben.preloadingCallbacks++;
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    CBN.Cuben.preloadingCallbacks--;
    if (request.status < 200 || request.status > 299) {
      console.error('Error: HTTP Status ' + request.status + ' when loading ' + url);
    } else {
      CBN.Cuben.shaderResources.set(id, request.responseText);
    }
  }
  request.send();
};
