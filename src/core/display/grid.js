import Cell from './cell';

export default class Grid {
  constructor(width = 200, height = 100, cellWidth = 10, cellHeight = 10) {
    this.grid = [];
    this.width = width;
    this.height = height;
    for(let i = 0; i < width; i++) {
      this.grid[i] = [];
      for(let j = 0; j < height; j++) {
        this.grid[i][j] = new Cell(i, j, cellWidth, cellHeight);
      }
    }
  }

  getCell(x, y) {
    return this.grid[x][y];
  }

  add(renderable) {
    this.grid[renderable.x][renderable.y].add(renderable);
  }

  remove(renderable) {
    this.grid[renderable.x][renderable.y].remove(renderable);
  }
}
