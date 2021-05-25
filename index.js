const grid = document.querySelector(".grid");
const startButton = document.querySelector("#start");
const score = document.querySelector("#score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let width = 10;

function gridCreator() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}

gridCreator();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

function move() {
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  const head = currentSnake[0];
  squares[head].classList.add("snake");
}

const timerId = setInterval(move, 1000);

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
