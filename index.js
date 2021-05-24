const grid = document.querySelector(".grid");
const startButton = document.querySelector("#start");
const score = document.querySelector("#score");
const width = 10;
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let foodIndex = 0;

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

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || // hits bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || // hits right wall
    (currentSnake[0] % width === 0 && direction === -1) || // hits left wall
    (currentSnake[0] - width < 0 && direction === -width) || // hits top
    squares[currentSnake[0] + direction].classList.contains("snake") // is part of the snake
  ) {
    return clearInterval(timerId);
  }

  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  const head = currentSnake[0];
  squares[head].classList.add("snake");
}

const timerId = setInterval(move, 1000);

function generateFood() {
  do {
    foodIndex = Math.floor(Math.random() * squares.length);
  } while (squares[foodIndex].classList.contains("snake"));
  squares[foodIndex].classList.add("food");
}

generateFood();

function control(e) {
  switch (e.key) {
    case "Down": // IE/Edge specific value
    case "ArrowDown":
      direction = +width;
      break;
    case "Up": // IE/Edge specific value
    case "ArrowUp":
      direction = -width;
      break;
    case "Left": // IE/Edge specific value
    case "ArrowLeft":
      direction = -1;
      break;
    case "Right": // IE/Edge specific value
    case "ArrowRight":
      direction = 1;
      break;
    default:
      return;
  }
}

document.addEventListener("keyup", control);
