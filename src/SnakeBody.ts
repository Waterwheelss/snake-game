export class SnakeBody {
  position = {
    x: 0,
    y: 0,
  };

  prevPosition = {
    x: 0,
    y: 0,
  };

  prev: SnakeBody | null = null;

  constructor(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
  }

  getPosition() {
    return this.position;
  }

  setPosition(x: number, y: number) {
    this.prevPosition = { ...this.position };
    const prevBody = this.getPrevBody();

    if (prevBody) {
      prevBody.setPosition(this.prevPosition.x, this.prevPosition.y);
    }

    this.position.x = x;
    this.position.y = y;
  }

  getPrevBody() {
    return this.prev;
  }

  addSnakeBody() {
    if (!this.prev) {
      console.log("snake add!");
      this.prev = new SnakeBody(this.prevPosition.x, this.prevPosition.y);

      return this.prev;
    }

    throw new Error("wtf");
  }
}
