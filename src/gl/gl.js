class GL {
  constructor() {
    this.canvas = null;
    this.context = null;
  }

  init(canvas) {
    this.canvas = canvas;

    this.context = canvas.getContext('webgl', {
      premultipliedAlpha: false  // Ask for non-premultiplied alpha
    });

    if(!this.context) {
      console.log('Falling back on experiemental webgl');
      this.context = canvas.getContext('experimental-webgl');
    }

    if(!this.context) {
      alert('Your browser does not support WebGL');
    }

    this.context.viewport(0, 0, canvas.width, canvas.height);
    this.context.enable(gl.context.DEPTH_TEST);
  }
}

export function createContext(canvas) {
  let gl = canvas.getContext('webgl', {
    premultipliedAlpha: false  // Ask for non-premultiplied alpha
  });

  if(!gl) {
    console.log('Falling back on experiemental webgl');
    gl = canvas.getContext('experimental-webgl');
  }

  if(!gl) {
    alert('Your browser does not support WebGL');
  }

  return gl;
}
