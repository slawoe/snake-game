const grid = document.querySelector(".grid");
const gameover = document.querySelector(".gameover");
const startButton = document.querySelector("#start");
const movementButtons = document.querySelector(".movement-buttons");
const score = document.querySelector("#score");
const width = 20;
let timerId = 0;
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let foodIndex = 0;
let intervalTime = 500;
let speed = 0.98;
let actualScore = 0;

function gridCreator() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}
gridCreator();

currentSnake.forEach((index) => squares[index].classList.add("snake"));
function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[foodIndex].classList.remove("food");
  clearInterval(timerId);
  gameover.style.display = "none";
  currentSnake = [2, 1, 0];
  actualScore = 0;
  score.innerText = actualScore;
  direction = 1;
  intervalTime = 500;
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  generateFood();
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || // hits bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || // hits right wall
    (currentSnake[0] % width === 0 && direction === -1) || // hits left wall
    (currentSnake[0] - width < 0 && direction === -width) || // hits top
    squares[currentSnake[0] + direction].classList.contains("snake") // is part of the snake
  ) {
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[foodIndex].classList.remove("food");
    gameover.style.display = "block";
    return clearInterval(timerId);
  }
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  actualScore++;
  score.innerText = actualScore;
  if (squares[currentSnake[0]].classList.contains("food")) {
    squares[currentSnake[0]].classList.remove("food");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    generateFood();
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
    actualScore += 75;
    score.innerText = actualScore;
  }
  squares[currentSnake[0]].classList.add("snake");
}

function generateFood() {
  do {
    foodIndex = Math.floor(Math.random() * squares.length);
  } while (squares[foodIndex].classList.contains("snake"));
  squares[foodIndex].classList.add("food");
}
generateFood();

function control(e) {
  switch (e.key || e.target.id) {
    case "Down": // IE/Edge specific value
    case "ArrowDown":
    case "down":
      direction = +width;
      break;
    case "Up": // IE/Edge specific value
    case "ArrowUp":
    case "up":
      direction = -width;
      break;
    case "Left": // IE/Edge specific value
    case "ArrowLeft":
    case "left":
      direction = -1;
      break;
    case "Right": // IE/Edge specific value
    case "ArrowRight":
    case "right":
      direction = 1;
      break;
  }
}

document.addEventListener("keyup", control);
startButton.addEventListener("click", startGame);
movementButtons.addEventListener("click", control);
