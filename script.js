const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

// Elements
const cells = document.querySelectorAll(".cell");
const statusLabel = document.getElementById("status");
const resetButton = document.getElementById("reset-button");

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(index));
});

resetButton.addEventListener("click", resetGame);

function handleClick(index) {
    if (gameOver || board[index] !== "") return;

    // Player's turn
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWinner()) {
        statusLabel.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
    } else if (board.every(cell => cell !== "")) {
        statusLabel.textContent = "It's a draw!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusLabel.textContent = `Player ${currentPlayer}'s turn`;

        // AI makes a move if it's player O's turn
        if (currentPlayer === "O" && !gameOver) {
            aiMove();
        }
    }
}

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function aiMove() {
    const availableMoves = board.map((cell, index) => cell === "" ? index : null).filter(val => val !== null);
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[randomMove] = "O";
    cells[randomMove].textContent = "O";

    if (checkWinner()) {
        statusLabel.textContent = "Player O wins!";
        gameOver = true;
    } else if (board.every(cell => cell !== "")) {
        statusLabel.textContent = "It's a draw!";
        gameOver = true;
    } else {
        currentPlayer = "X";
        statusLabel.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board.fill("");
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    gameOver = false;
    statusLabel.textContent = "Player X's turn";
}
