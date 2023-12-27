let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let scoreX = 0;
let scoreO = 0;
let playerXName = ''; // Variable to store Player X's name
let playerOName = ''; // Variable to store Player O's name

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    playerXName = document.getElementById('playerX').value.trim();
    playerOName = document.getElementById('playerO').value.trim();

    if (playerXName !== '' && playerOName !== '' && !gameActive) {
        gameActive = true;
        document.getElementById('playerX').disabled = true;
        document.getElementById('playerO').disabled = true;
        document.getElementById('startBtn').disabled = true;
        document.getElementById('status').innerText = `${playerXName}'s turn`;
    }
}

function handleCellClick(clickedCell, cellIndex) {
    if (!gameActive || gameBoard[cellIndex] !== '') return;

    gameBoard[cellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    checkWin();
    checkDraw();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').innerText = `${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
}

function checkWin() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            highlightWinningCells(a, b, c);
            updateScore(gameBoard[a]);
            document.getElementById('status').innerText = `${gameBoard[a] === 'X' ? playerXName : playerOName} wins!`;
            return;
        }
    }
}

function checkDraw() {
    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        document.getElementById('status').innerText = "It's a draw!";
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = false;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.style.removeProperty('background-color');
    });
    document.getElementById('playerX').disabled = false;
    document.getElementById('playerO').disabled = false;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('status').innerText = `${playerXName}'s turn`;
}

function highlightWinningCells(a, b, c) {
    const winningCells = [a, b, c];
    for (const cellIndex of winningCells) {
        const cell = document.querySelector(`[data-cell-index="${cellIndex}"]`);
        cell.style.backgroundColor = 'lightgreen';
    }
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        document.getElementById('scoreX').innerText = `${playerXName}: ${scoreX}`;
    } else {
        scoreO++;
        document.getElementById('scoreO').innerText = `${playerOName}: ${scoreO}`;
    }
}
function checkDraw() {
    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        document.getElementById('status').innerText = "It's a draw!";
    }
}

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('resetBtn').addEventListener('click', resetGame);

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        const cellIndex = parseInt(cell.getAttribute('data-cell-index'));
        handleCellClick(cell, cellIndex);
        checkDraw(); // Check for a draw after each move
    });
});

