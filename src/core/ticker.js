class Ticker {
  constructor() {
    this.updateFunctions = [];
    this.deltaTime = 0;
    this.lastTime = Date.now();
    this.elapsedMS = 0;
    requestAnimationFrame(this._tick.bind(this));
  }

  _tick() {
    let currentTime = Date.now();
    this.elapsedMS = currentTime - this.lastTime;
    // Run all the registered functions
    for(let func of this.updateFunctions) {
      func();
    }

    this.lastTime = currentTime;
    requestAnimationFrame(this._tick.bind(this));
  }

  get fps() {
    return 1000 / this.elapsedMS;
  }

  get deltatime() {
    // empty
  }

  add(func) {
    this.updateFunctions.push(func);
  }
}

const ticker = new Ticker();
export { ticker };
