const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let oTurn;

const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
  oTurn = false;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.innerText = ''; // ✅ Clear previous text
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setMessage('');
}


function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? 'o' : 'x';

  cell.classList.add(currentClass);
  cell.innerText = currentClass.toUpperCase();  // 👈 This shows X or O in the box

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    oTurn = !oTurn;
  }
}

function endGame(draw) {
  if (draw) {
    setMessage("It's a draw!");
  } else {
    setMessage(`${oTurn ? "O's" : "X's"} wins!`);
  }
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function isDraw() {
  return [...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'));
}

function checkWin(currentClass) {
  return WIN_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function setMessage(text) {
  message.textContent = text;
}
