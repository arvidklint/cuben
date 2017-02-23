// GameObject
// namespace CBN
export default class GameObject {
  constructor(name) {
    this.name = name;
    this.position = 2
    this.image = "./imgs/test.png";
  }

  preload() {}

  setup() {}

  update() {}

  draw() {}

  static addGameObject(go) {
    gameobjects.push(go);
  }

  static getGameObjects() {
    return gameobjects;
  }
}

var gameobjects = [];
