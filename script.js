const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let oTurn;
let scores = { x: 0, o: 0 };
let gameActive = true;

startGame();

resetButton.addEventListener('click', startGame);

function startGame() {
    gameActive = true;
    oTurn = false;
    statusElement.innerText = `Turno de X`;
    board.classList.add(X_CLASS);
    board.classList.remove(O_CLASS);
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
}

function handleClick(e) {
    if (!gameActive) return;
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        statusElement.innerText = '¡Empate!';
    } else {
        const winner = oTurn ? 'O' : 'X';
        statusElement.innerText = `¡Jugador ${winner} Gana!`;
        updateScore(winner);
    }
    // Remove hover classes so they don't appear after game ends
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
    statusElement.innerText = `Turno de ${oTurn ? 'O' : 'X'}`;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function updateScore(winner) {
    if (winner === 'X') {
        scores.x++;
        scoreXElement.innerText = scores.x;
    } else {
        scores.o++;
        scoreOElement.innerText = scores.o;
    }
}
