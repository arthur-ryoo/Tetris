const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const ScoreDisplay = document.querySelector('#score');
const StartBotton = document.querySelector('#start-botton');
const width = 10;
let nextRandom = 0;

// The Tetrominoes
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

const theTetrominoes = [
  lTetromino,
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];

let currentPosition = 4;
let currentRotation = 0;

// Randomly select a tetromino and its first rotation
let random = Math.floor(Math.random() * theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];

// Draw the Tetromino
function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add('tetromino');
  });
}

draw();

// Undraw the Tetromino
function undraw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove('tetromino');
  });
}

// Make the tetromino move down every second
timerId = setInterval(moveDown, 1000);

// Assign function to keyCodes
function control(e) {
  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 38) {
    rotate();
  } else if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 40) {
    moveDown();
  }
}
document.addEventListener('keyup', control);

// Move down function
function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

// Freezz function
function freeze() {
  if (
    current.some((index) =>
      squares[currentPosition + index + width].classList.contains('taken')
    )
  ) {
    current.forEach((index) =>
      squares[currentPosition + index].classList.add('taken')
    );
    // Start a new tetromino falling
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
    displayShape();
  }
}

// Move the tetromino left, unless it is at the edge or there is a blockage
function moveLeft() {
  undraw();
  const isAtLeftEdge = current.some(
    (index) => (currentPosition + index) % width === 0
  );

  if (!isAtLeftEdge) currentPosition -= 1;

  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains('taken')
    )
  ) {
    currentPosition += 1;
  }

  draw();
}

// Move the tetromino right, unless it is at the edge or there is a blockage
function moveRight() {
  undraw();
  const isAtRightEdge = current.some(
    (index) => (currentPosition + index) % width === width - 1
  );

  if (!isAtRightEdge) currentPosition += 1;

  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains('taken')
    )
  ) {
    currentPosition -= 1;
  }
  draw();
}

// Rotate the tetromino

function rotate() {
  undraw();
  currentRotation++;
  if (currentRotation === current.length) {
    // If the current rotation gets to 4, make it go back to 0
    currentRotation = 0;
  }
  current = theTetrominoes[random][currentRotation];
  draw();
}

// Show up next tetromino in mini-grid
const displaySquares = document.querySelectorAll('.mini-grid div');
const displayWidth = 4;
let displayIndex = 0;

// The Tetrominos without rotations
const upNextTetrominoes = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2], // /Tetromino
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zTetromino
  [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTetromino
  [0, 1, displayWidth, displayWidth + 1], // oTetromino
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
];

// Display the shape in the mini-grid display
function displayShape() {
  displaySquares.forEach((square) => {
    square.classList.remove('tetromino');
  });
  upNextTetrominoes[nextRandom].forEach((index) => {
    displaySquares[displayIndex + index].classList.add('tetromino');
  });
}
