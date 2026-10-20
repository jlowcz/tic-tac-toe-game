/**
 * Minimax algorithm with alpha-beta pruning for tic-tac-toe AI
 */

import { calculateWinner, getAvailableMoves, checkDraw } from './gameLogic.js';

/**
 * Evaluate the board position
 * @param {Array<string|null>} board - 9-element array representing the board
 * @param {string} aiPlayer - 'X' or 'O'
 * @returns {number} - Score: +10 for AI win, -10 for player win, 0 for draw
 */
function evaluateBoard(board, aiPlayer) {
  const result = calculateWinner(board);

  if (result) {
    return result.winner === aiPlayer ? 10 : -10;
  }

  if (checkDraw(board)) {
    return 0;
  }

  return null; // Game not finished
}

/**
 * Minimax algorithm with alpha-beta pruning
 * @param {Array<string|null>} board - Current board state
 * @param {number} depth - Current depth in game tree
 * @param {number} maxDepth - Maximum depth to search
 * @param {boolean} isMaximizing - True if maximizing player's turn
 * @param {string} aiPlayer - 'X' or 'O'
 * @param {string} humanPlayer - 'X' or 'O'
 * @param {number} alpha - Alpha value for pruning
 * @param {number} beta - Beta value for pruning
 * @returns {number} - Best score for current position
 */
function minimax(board, depth, maxDepth, isMaximizing, aiPlayer, humanPlayer, alpha, beta) {
  const score = evaluateBoard(board, aiPlayer);

  // Terminal conditions
  if (score !== null) {
    // Adjust score based on depth to prefer faster wins
    return score - (score > 0 ? depth : -depth);
  }

  if (depth >= maxDepth) {
    return 0; // Neutral score at depth limit
  }

  const availableMoves = getAvailableMoves(board);

  if (isMaximizing) {
    let maxScore = -Infinity;

    for (let move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = aiPlayer;
      const currentScore = minimax(newBoard, depth + 1, maxDepth, false, aiPlayer, humanPlayer, alpha, beta);

      maxScore = Math.max(maxScore, currentScore);
      alpha = Math.max(alpha, currentScore);

      if (beta <= alpha) {
        break; // Beta cutoff
      }
    }

    return maxScore;
  } else {
    let minScore = Infinity;

    for (let move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = humanPlayer;
      const currentScore = minimax(newBoard, depth + 1, maxDepth, true, aiPlayer, humanPlayer, alpha, beta);

      minScore = Math.min(minScore, currentScore);
      beta = Math.min(beta, currentScore);

      if (beta <= alpha) {
        break; // Alpha cutoff
      }
    }

    return minScore;
  }
}

/**
 * Find the best move for the AI
 * @param {Array<string|null>} board - Current board state
 * @param {string} aiPlayer - 'X' or 'O'
 * @param {string} difficulty - 'medium' or 'hard'
 * @returns {number} - Index of best move
 */
export function getBestMove(board, aiPlayer, difficulty = 'hard') {
  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
  const availableMoves = getAvailableMoves(board);

  if (availableMoves.length === 0) {
    return -1;
  }

  // First move optimization - pick random corner or center
  if (availableMoves.length === 9) {
    const firstMoves = [0, 2, 4, 6, 8]; // Corners and center
    return firstMoves[Math.floor(Math.random() * firstMoves.length)];
  }

  // Medium difficulty: inject randomness
  if (difficulty === 'medium' && Math.random() < 0.2) {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  // Hard difficulty: full depth, Medium: limited depth
  const maxDepth = difficulty === 'hard' ? Infinity : 4;

  let bestMove = availableMoves[0];
  let bestScore = -Infinity;

  for (let move of availableMoves) {
    const newBoard = [...board];
    newBoard[move] = aiPlayer;
    const score = minimax(newBoard, 0, maxDepth, false, aiPlayer, humanPlayer, -Infinity, Infinity);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
