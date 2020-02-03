/* Javascript */

import { snacke } from './snacke'

class Food {
  constructor(snacke, special) {
    this.timeInit = 0;
    this.timeEnd = 0;
    this.x = 0;
    this.y = 0;
    this.special = special;
    this.randomColor = this.generateColor();
    this.createFood(snacke);
  }

  generateColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getColor() {
    return this.special ? this.randomColor : "orange";
  }

  createFood(snacke) {
    const limit = Math.floor(table.x / box);
    const foodX = Math.floor(Math.random() * limit) * box;
    const foodY = Math.floor(Math.random() * limit) * box;
    if (snacke.getSnacke().find(item => item.x === foodX && item.y === foodY)) {
      return this.createFood(snacke);
    }
    this.x = foodX;
    this.y = foodY;
    this.timeInit = performance.now();
  }

  changesFood(snacke) {
    this.timeEnd = performance.now();
    let limitEnd = 6;
    let limitInit = 4;
    if (this.special) {
      limitEnd = 4;
      limitInit = 1;
    }
    if (
      this.timeEnd - this.timeInit >
      (Math.random() * limitEnd + limitInit) * 1000
    ) {
      this.createFood(snacke);
    }
  }
}
const box = 16;
let table = { x: 800, y: 800 };
let snacke = new Snacke();
let foodInstance = new Food(snacke, false);
let specialFood = new Food(snacke, true);

const RIGHT = { x: box, y: 0 };
const LEFT = { x: -box, y: 0 };
const UP = { x: 0, y: -box };
const DOWN = { x: 0, y: box };
let direction = RIGHT;
let score = 0;
let prevScore = 0;

document.addEventListener("keydown", setDirection);

function setDirection(event) {
  if (event.keyCode === 37 && direction !== RIGHT) {
    direction = LEFT;
  }
  if (event.keyCode === 38 && direction !== DOWN) {
    direction = UP;
  }
  if (event.keyCode === 39 && direction !== LEFT) {
    direction = RIGHT;
  }
  if (event.keyCode === 40 && direction !== UP) {
    direction = DOWN;
  }
}

function collisionChanges(snacke, x, y) {
  snacke.setHeadPosition(x, y);
  foodInstance = new Food(snacke, false);
  specialFood = new Food(snacke, true);
}

function collision(snacke) {
  let XPosition = snacke.getSnacke()[0].x;
  let YPosition = snacke.getSnacke()[0].y;

  if (XPosition < 0) {
    resizeTable();
    direction = RIGHT;
    XPosition = 0;
    YPosition = YPosition > table.y ? table.y - (table.y % box) : YPosition-box;
    collisionChanges(snacke, XPosition, YPosition);
  } else if (XPosition > table.x) {
    resizeTable();
    direction = LEFT;
    XPosition = table.x - (table.x % box);
    YPosition = YPosition > table.y ? table.y - (table.y % box) : YPosition-box;
    collisionChanges(snacke, XPosition, YPosition);
  } else if (YPosition < 0) {
    resizeTable();
    direction = DOWN;
    YPosition = 0;
    XPosition = XPosition > table.x ? table.x - (table.x % box) : XPosition-box;
    collisionChanges(snacke, XPosition, YPosition);
  } else if (YPosition > table.y) {
    resizeTable();
    direction = UP;
    YPosition = table.y - (table.y % box);
    XPosition = XPosition > table.x ? table.x - (table.x % box) : XPosition-box;
    collisionChanges(snacke, XPosition, YPosition);
  }
}

function resizeTable() {
  table.y -= 113;
  table.x -= 113;
  if (table.y < 0 || table.x < 0) {
    return drawGameOver();
  }
  const c = document.getElementById("tableGame");
  c.width = table.x;
  c.height = table.y;
}

function gameOver() {
  const snackeBody = snacke.getSnacke();
  for (let i = 1; i < snackeBody.length; i++) {
    if (
      snackeBody[i].x === snackeBody[0].x &&
      snackeBody[i].y === snackeBody[0].y
    ) {
      drawGameOver();
    }
  }
}

function draw() {
  const c = document.getElementById("tableGame");
  const ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  const sn = snacke.getSnacke();
  //draw snacke
  for (let i = 0; i < sn.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = i === 0 ? "black" : "blue";
    ctx.fillRect(sn[i].x, sn[i].y, box, box);
    ctx.strokeStyle = "black";
    ctx.strokeRect(sn[i].x, sn[i].y, box, box);
    ctx.stroke();
  }
  //draw food
  ctx.beginPath();
  ctx.fillStyle = foodInstance.getColor();
  ctx.fillRect(foodInstance.x, foodInstance.y, box, box);
  ctx.strokeStyle = "black";
  ctx.strokeRect(foodInstance.x, foodInstance.y, box, box);
  ctx.stroke();

  //draw special food
  ctx.beginPath();
  ctx.arc(specialFood.x + 14, specialFood.y + 14, 14, 0, 2 * Math.PI, false);
  ctx.fillStyle = specialFood.getColor();
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  //draw score
  ctx.fillStyle = score > prevScore && prevScore !== 0 ? "blue" : "grey";
  ctx.font = `${box * 2}px Arial`;
  ctx.fillText(`score: ${score}`, c.width - box * 10, box * 2);
  ctx.stroke();

  gameOver();
  snacke.moveSnacke();
  collision(snacke);
  if (snacke.eatFood(foodInstance)) {
    foodInstance = new Food(snacke, false);
  } else {
    foodInstance.changesFood(snacke);
  }
  if (snacke.eatFood(specialFood)) {
    specialFood = new Food(snacke, true);
  } else {
    specialFood.changesFood(snacke);
  }
}

function drawGameOver() {
  //draw Game Over
  clearInterval(game);
  const c = document.getElementById("tableGame");
  c.width = 800;
  c.height = 800;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "red";
  ctx.font = `${box * 4}px Arial`;
  ctx.fillText("GAME OVER", c.width / 4, c.height / 2);
  ctx.stroke();
  document.getElementById("playAgain").style.display = "inline-block";
}

function reboot() {
  document.getElementById("playAgain").style.display = "none";
  prevScore = score;
  table.y = 800;
  table.x = 800;
  snacke = new Snacke();
  foodInstance = new Food(snacke);
  direction = RIGHT;
  score = 0;
  game = setInterval(draw, 125);
}

let game = setInterval(draw, 125);
