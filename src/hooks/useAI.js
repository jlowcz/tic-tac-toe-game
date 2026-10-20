/**
 * Custom hook for AI move logic
 */

import { useEffect } from 'react';
import { getBestMove } from '../utils/minimax.js';

/**
 * Hook that triggers AI moves when it's the computer's turn
 * @param {Object} params - Hook parameters
 * @param {Array<string|null>} params.board - Current board state
 * @param {string} params.currentPlayer - Current player ('X' or 'O')
 * @param {boolean} params.gameOver - Whether game is over
 * @param {Function} params.makeMove - Function to make a move
 * @param {string} params.difficulty - AI difficulty ('medium' or 'hard')
 */
export function useAI({ board, currentPlayer, gameOver, makeMove, difficulty }) {
  useEffect(() => {
    // Only make move if it's AI's turn (O) and game is not over
    if (currentPlayer === 'O' && !gameOver) {
      // Add slight delay for better UX (makes AI feel more natural)
      const timeoutId = setTimeout(() => {
        const bestMove = getBestMove(board, 'O', difficulty);
        if (bestMove !== -1) {
          makeMove(bestMove);
        }
      }, 500); // 500ms delay

      return () => clearTimeout(timeoutId);
    }
  }, [currentPlayer, gameOver, board, makeMove, difficulty]);
}
