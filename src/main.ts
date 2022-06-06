import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CANVAS_BACKGROUND,
  SNAKE_COLOR,
  SNAKE_SIZE,
  APPLE_COLOR,
  KEY_UP,
  KEY_DOWN,
  KEY_LEFT,
  KEY_RIGHT,
  TILE_SIZE,
} from "./constant";
import { Snake } from "./Snake";
import { SnakeBody } from "./SnakeBody";
import "./style.css";

/**
 * Game Variables
 */
let getApple = false;

const applePosition = {
  x: 20,
  y: 20,
};

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const context = canvas.getContext("2d")!;

const snake = new Snake(240, 240);

let gameStatus = "stop";

function setGameStatus(status: "start" | "stop" | "over") {
  gameStatus = status;
}

function render() {
  initializeCanvas();

  drawApple();
  drawSnake();

  checkCollision();

  const id = setTimeout(render, 1000 / 20);

  checkGameStatus(id);
}

function checkGameStatus(id: number) {
  if (gameStatus === "over") {
    clearTimeout(id);
    gameover();
  }
}

function gameover() {
  context.font = "36px Roboto";
  context.fillStyle = "#fff";
  context.fillText("GAME OVER", 150, 260, 200);
}

function initializeCanvas() {
  context.fillStyle = CANVAS_BACKGROUND;
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawSnake() {
  snake.calculatePosition();
  const head = snake.getHead();

  let currentBody: typeof head | null = head;
  if (currentBody) {
    do {
      const position = currentBody.getPosition();
      context.fillStyle = SNAKE_COLOR;
      context.fillRect(position.x, position.y, SNAKE_SIZE, SNAKE_SIZE);
      currentBody = currentBody.getPrevBody();

      console.log(currentBody?.getPosition());
    } while (currentBody !== null);
  }
}

function drawApple() {
  if (getApple) {
    applePosition.x = Math.floor((Math.random() * 1000) / 2 / 20) * 20;
    applePosition.y = Math.floor((Math.random() * 1000) / 2 / 20) * 20;
    getApple = false;
  }

  context.fillStyle = APPLE_COLOR;
  context.fillRect(applePosition.x, applePosition.y, TILE_SIZE, TILE_SIZE);
}

function checkCollision() {
  const head = snake.getHead();
  const position = head.getPosition();

  /**
   * If Get Apple
   */
  if (position.x === applePosition.x && position.y === applePosition.y) {
    snake.addLength();
    getApple = true;
  }

  /**
   * If hit the wall
   */
  if (
    position.x === 0 - TILE_SIZE ||
    position.x === CANVAS_WIDTH ||
    position.y === 0 - TILE_SIZE ||
    position.y === CANVAS_HEIGHT
  ) {
    setGameStatus("over");
  }

  /**
   * If hit snake body
   */
  if (snake.getHead() !== snake.getTail()) {
    let currentBody: SnakeBody = head;
    do {
      currentBody = currentBody.getPrevBody()!;

      const prevPosition = currentBody?.prevPosition!;

      if (prevPosition.x === position.x && prevPosition.y === position.y) {
        setGameStatus("over");
      }

      console.log(prevPosition.x, position.x);
    } while (currentBody.getPrevBody() !== null);
  }
}

render();

window.addEventListener("keydown", pressKeyHandler);

function pressKeyHandler(e: KeyboardEvent) {
  const { keyCode } = e;

  switch (keyCode) {
    case KEY_UP:
      if (snake.getMoveY() === 20) return;

      snake.clearMovement();
      snake.setDirection("UP");
      break;
    case KEY_DOWN:
      if (snake.getMoveY() === -20) return;

      snake.clearMovement();
      snake.setDirection("DOWN");
      break;
    case KEY_LEFT:
      if (snake.getMoveX() === 20) return;

      snake.clearMovement();
      snake.setDirection("LEFT");
      break;
    case KEY_RIGHT:
      if (snake.getMoveX() === -20) return;

      snake.clearMovement();
      snake.setDirection("RIGHT");
      break;
  }
}
