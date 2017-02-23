export default class Vector2 {
  // init with x and y or don't and it will be set to (0, 0)
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }
}
