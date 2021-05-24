const grid = document.querySelector(".grid");
const startButton = document.querySelector("#start");
const score = document.querySelector("#score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;

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

move();
