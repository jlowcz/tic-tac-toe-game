/**
 * Pure functions for game logic - win detection, draw checking, and move validation
 */

const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

/**
 * Check if there's a winner on the board
 * @param {Array<string|null>} board - 9-element array representing the board
 * @returns {Object|null} - {winner: 'X'|'O', line: [indices]} or null
 */
export function calculateWinner(board) {
  for (let combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        line: combination,
      };
    }
  }
  return null;
}

/**
 * Check if the game is a draw (board full with no winner)
 * @param {Array<string|null>} board - 9-element array representing the board
 * @returns {boolean}
 */
export function checkDraw(board) {
  return board.every((cell) => cell !== null) && !calculateWinner(board);
}

/**
 * Get all available moves (empty cells)
 * @param {Array<string|null>} board - 9-element array representing the board
 * @returns {Array<number>} - Array of empty cell indices
 */
export function getAvailableMoves(board) {
  return board.reduce((moves, cell, index) => {
    if (cell === null) {
      moves.push(index);
    }
    return moves;
  }, []);
}

/**
 * Check if a move is valid
 * @param {Array<string|null>} board - 9-element array representing the board
 * @param {number} index - Cell index to check
 * @returns {boolean}
 */
export function isValidMove(board, index) {
  return index >= 0 && index < 9 && board[index] === null;
}
