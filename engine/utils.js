var loadShader = function(url, id) {
  cbn.preloadingCallbacks++;
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    cbn.preloadingCallbacks--;
    if (request.status < 200 || request.status > 299) {
      console.error('Error: HTTP Status ' + request.status + ' when loading ' + url);
    } else {
      cbn.shaderResources.set(id, request.responseText);
    }
  }
  request.send();
};

var loadTexture = function(url, id) {
  cbn.preloadingCallbacks++;
  var image = new Image();
  image.onload = function() {
    console.log("Loaded image: " + id);
    cbn.preloadingCallbacks--;
    cbn.textureResources.set(id, image);
  };
  image.src = url;
};
