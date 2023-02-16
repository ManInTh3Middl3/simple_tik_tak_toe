// set up the game board
const board = document.getElementById('game-container');
const squares = Array.from(document.querySelectorAll('.square'));
const message = document.getElementById('message');

// set up the game state
let player = 'X';
let gameOver = false;

// set up event listeners for each square
squares.forEach(square => {
    square.addEventListener('click', () => {
        if (gameOver || square.textContent !== '') {
            return;
        }
        square.textContent = player;
        square.classList.add(player);
        checkForWin();
        togglePlayer();
    });
});

// switch to the other player's turn
function togglePlayer() {
    player = player === 'X' ? 'O' : 'X';
    message.textContent = `${player}'s turn`;
}

// check for a winner
function checkForWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (squares[a].textContent === player && squares[b].textContent === player && squares[c].textContent === player) {
            message.textContent = `${player} Wins!`;
            message.style.color = player === 'X' ? 'red' : 'blue';
            gameOver = true;
            break;
        } else if (!squares.some(square => square.textContent === '')) {
            message.textContent = 'Boo nobody won!';
            message.style.color = 'purple';
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        squares.forEach(square => {
            square.removeEventListener('click', handleClick);
        });
    }
}

// reset the game board
function resetGame() {
    squares.forEach(square => {
        square.textContent = '';
        square.classList.remove('X', 'O');
    });
    player = 'X';
    gameOver = false;
    message.textContent = `${player}'s turn`;
    message.style.color = 'black';
}

// set up the reset button
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);