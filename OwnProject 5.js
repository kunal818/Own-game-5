let player;
let obstacles = [];
let score = 0;
let isGameOver = false;

function setup() {
  createCanvas(400, 400);
  player = new Player();
}

function draw() {
  background(220);
  if (!isGameOver) {
    player.update();
    player.show();
    spawnObstacles();
    updateObstacles();
    handleCollision();
    displayScore();
  } else {
    gameOver();
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    let obstacle = new Obstacles();
    obstacles.push(obstacle);
  }
}

function updateObstacles() {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
    }
  }
}

function displayScore() {
  fill(0);
  textSize(25);
  textAlign(CENTER);
  text(score, width / 2, height / 2);
}

function gameOver() {
  fill(255, 0, 0);
  textSize(35);
  textAlign(CENTER);
  text("GameOver", width / 2, height / 2);
}

class Player {
  constructor() {
    this.x = 50;
    this.y = height / 2;
    this.size = 20;
    this.velocityY = 0;
    this.gravity = 0.6;
  }

  update() {
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    if (this.y >= height - this.size) {
      this.y = height - this.size;
      this.velocityY = 0;
    }
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.size, this.size);
  }

  jump() {
    if (this.y === height - this.size) {
      this.velocityY = -15;
    }
  }

  collideWith(obstacle) {
    let playerLeft = this.x;
    let playerRight = this.x + this.size;
    let playerTop = this.y;
    let playerBottom = this.y + this.size;

    let obstacleLeft = obstacle.x;
    let obstacleRight = obstacle.x + obstacle.width;
    let obstacleTop = obstacle.y;
    let obstacleBottom = obstacle.y + obstacle.height;

    return (
      playerLeft < obstacleRight &&
      playerRight > obstacleLeft &&
      playerTop < obstacleBottom &&
      playerBottom > obstacleTop
    );
  }
}

class Obstacles {
  constructor() {
    this.x = width;
    this.y = height - 30;
    this.width = 30;
    this.height = 30;
    this.speed = 5;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill(0);
    rect(this.x, this.y, this.width, this.height);
  }

  offscreen() {
    return this.x + this.width < 0;
  }
}

function keyPressed() {
  if (keyCode === 32) {
    player.jump();
  }
}