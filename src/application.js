import { ticker } from './core/ticker';
import { loadingManager } from './loaders/manager';
import { shaderManager } from './core/shader/manager';
import { camera } from './core/display/camera';
import Display from './core/display/display';

var vertexShaderString = [
  'precision mediump float;',
  'attribute vec2 vertPosition;',
  'attribute vec2 vertTexCoord;',
  'varying vec2 fragTexCoord;',
  'uniform mat4 p;',
  'void main() {',
    'fragTexCoord = vertTexCoord;',
    'gl_Position = p * vec4(vertPosition, 0.0, 1.0);',
  '}'
].join('\n');

var fragmentShaderString = [
  'precision mediump float;',
  'varying vec2 fragTexCoord;',
  'uniform sampler2D sampler;',
  'void main() {',
    'gl_FragColor = texture2D(sampler, fragTexCoord);',
    // 'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
  '}'
].join('\n');

export default class Application {
  constructor(width = 800, height = 400) {
    console.log("init application");

    this.ticker = ticker;

    this.scene = new Display(width, height);

    // @TODO For some reason I can't start the application in the constructor
    // this._init();
  }


  start() {
    if(typeof global.preload === "function") { // If there is a global function preload
      console.log("application preload");
      this._preload();
    }
  }

  _preload() {
    // Default preloading of shaders
    shaderManager.createShader("spriteShader", vertexShaderString, fragmentShaderString);

    global.preload();

    this._waitPreload = () => {
      if(loadingManager.count === 0) {
        // Call the setup function if it exists
        if(typeof global.setup === "function") {
          this._setup();
        }
      } else {
        setTimeout(this._waitPreload, 10);
      }
    }
    this._waitPreload();
  }

  _setup() {
    console.log("application setup");
    global.setup();

    if(typeof global.update === "function") {
      this._start();
    }
  }

  _start() {
    window.requestAnimationFrame(this._update.bind(this));
  }

  _update() {
    global.update();
    this.scene.update();
    this._draw();
    window.requestAnimationFrame(this._update.bind(this));
  }

  _draw() {

    console.log("draw");
    // this.scene.draw();
    this.scene.draw();
  }
}
