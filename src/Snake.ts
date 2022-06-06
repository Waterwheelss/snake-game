import { SnakeBody } from "./SnakeBody";

export class Snake {
  length = 1;
  speed = 20;

  moveX = 0;
  moveY = 0;

  snakeHead: SnakeBody;
  snakeTail: SnakeBody;

  constructor(x: number, y: number) {
    this.snakeHead = new SnakeBody(x, y);
    this.snakeTail = this.snakeHead;
  }

  getHead() {
    return this.snakeHead;
  }

  getTail() {
    return this.snakeTail;
  }

  addLength() {
    const newTail = this.snakeTail.addSnakeBody();

    this.snakeTail = newTail;
  }

  getLength() {
    return this.length;
  }

  calculatePosition() {
    const newPosition = { ...this.snakeHead.getPosition() };

    newPosition.x += this.moveX;
    newPosition.y += this.moveY;

    this.snakeHead.setPosition(newPosition.x, newPosition.y);
  }

  setDirection(diection: "UP" | "DOWN" | "LEFT" | "RIGHT") {
    switch (diection) {
      case "UP":
        this.setMoveY(-1 * this.speed);
        break;
      case "DOWN":
        this.setMoveY(this.speed);
        break;
      case "LEFT":
        this.setMoveX(-1 * this.speed);
        break;
      case "RIGHT":
        this.setMoveX(this.speed);
        break;
    }
  }

  clearMovement() {
    this.moveX = 0;
    this.moveY = 0;
  }

  setMoveX(value: number) {
    this.moveX = value;
  }

  setMoveY(value: number) {
    this.moveY = value;
  }

  getMoveX() {
    return this.moveX;
  }

  getMoveY() {
    return this.moveY;
  }
}
