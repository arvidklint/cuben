function Vector2(x, y) {
  this.x = x;
  this.y = y;
}

class GameObject {
  constructor(name) {
    cbn.addGameObject(this);
    this.name = name;
    this.position = new Vector2(0, 0);
    this.image = "../imgs/test.png";
  }

  preload() {}

  setup() {}

  update() {}

  draw() {}
}

class Cuben {
  constructor() {
    this.gameobjects = [];
    this.canvas = null;
    this.gl = null;
    this.textureResources = new Map();
    this.shaderResources = new Map();
    this.preloadingCallbacks = 0;
    this.globalFunctions = [];
    this.camera = null;
    this.background = null;

    this.initGlobalFunctions(); // @TODO use this?
  }

  init() {
    this.canvas = document.getElementById('canvas');
    this.initGL();

    this.camera = new Camera(this.canvas.width, this.canvas.height);


    if(typeof preload == "function") { // If there is a global function preload
      console.log("running preload");
      this.preload();
    }
  }

  initGL() {
    this.gl = canvas.getContext('webgl', {
      premultipliedAlpha: false  // Ask for non-premultiplied alpha
    });

    if(!this.gl) {
      console.log('Falling back on experiemental webgl');
      this.gl = canvas.getContext('experiemental-webgl');
    }

    if(!this.gl) {
      alert('Your browser does not support WebGL');
    }

    // this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);
    // this.gl.disable(this.gl.DEPTH_TEST);

    // Set the viewport
    this.gl.viewport(0, 0, canvas.width, canvas.height);
  }

  initGlobalFunctions() { // @TODO use this?
    if(typeof preload === "function") {
      this.globalFunctions.push(preload);
    }
    if(typeof setup === "function") {
      this.globalFunctions.push(setup);
    }
  }

  addGameObject(go) {
    this.gameobjects.push(go);
  }

  preload() {
    preload(); // The global function
    function waitPreload() {
      if(cbn.preloadingCallbacks === 0) {
        // Call the setup function if it exists
        if(typeof setup === "function") {
          cbn.setup();
        }
      } else {
        setTimeout(waitPreload, 10);
      }
    }
    waitPreload();
  }

  setup() {
    this.background = new Background(0.2, 0.4, 0.8);

    setup(); // The global function
    for(var go of this.gameobjects) {
      go.setup();
    }
    window.requestAnimationFrame(this.mainLoop);
  }

  mainLoop() {
    cbn.update();
    cbn.draw();
    window.requestAnimationFrame(cbn.mainLoop);
  }

  update() {
    this.camera.update();

    for(var go of this.gameobjects) {
      go.update();
    }
  }

  draw() {
    this.gl.clearColor(0.3, 0.8, 0.4, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.background.draw();
    for(var go of this.gameobjects) {
      go.draw();
    }

  }



  // GET FUNCTIONS
  getTexture(id) {
    return this.textureResources.get(id);
  }
}

var cbn = new Cuben();

window.onload = function() {
  cbn.init();
}
