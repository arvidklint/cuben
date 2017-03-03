export default class Cell {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // this.background = new

    this.renderables = [];
  }

  add(renderable){
    this.renderables.push(renderable);
  }

  remove(renderable) {
    let index = this.renderable.indexOf(renderable);
    if(index === -1) {
      return;
    }
    this.renderables.splice(index, 1);
  }

  render() {

    for(let renderable of this.renderables) {
      renderable.render();
    }
  }

  getRenderables() {
    return this.renderables;
  }
}
