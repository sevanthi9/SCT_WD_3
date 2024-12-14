
const board = document.getElementById('board');
const status = document.getElementById('status');
let gameBoard = Array(9).fill(null); 
let currentPlayer = 'X'; 
let gameActive = true;


const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]            
];

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (value) cell.classList.add('taken');
        cell.textContent = value;
        cell.addEventListener('click', () => handleClick(index));
        board.appendChild(cell);
    });
}


function handleClick(index) {
    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    renderBoard();
    checkGameState();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = currentPlayer === 'X' ? 'Your turn: X' : 'Computer is thinking...';

        if (currentPlayer === 'O') {
            setTimeout(makeComputerMove, 500); 
        }
    }
}


function makeComputerMove() {
    const emptyCells = gameBoard.map((value, index) => value === null ? index : null).filter(v => v !== null);
    const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameBoard[randomMove] = 'O';
    renderBoard();
    checkGameState();

    if (gameActive) {
        currentPlayer = 'X';
        status.textContent = 'Your turn: X';
    }
}


function checkGameState() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            status.textContent = `${gameBoard[a]} wins!`;
            return;
        }
    }

    if (!gameBoard.includes(null)) {
        gameActive = false;
        status.textContent = 'It\'s a draw!';
    }
}


renderBoard();
