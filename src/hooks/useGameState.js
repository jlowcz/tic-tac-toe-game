/**
 * Custom hook for managing game state
 */

import { useState, useCallback } from 'react';
import { calculateWinner, checkDraw, isValidMove } from '../utils/gameLogic.js';

export function useGameState() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X'); // Human is always X
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isDraw, setIsDraw] = useState(false);

  /**
   * Make a move on the board
   * @param {number} index - Cell index to place mark
   * @returns {boolean} - True if move was successful
   */
  const makeMove = useCallback((index) => {
    if (!isValidMove(board, index) || gameOver) {
      return false;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check for winner
    const winResult = calculateWinner(newBoard);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.line);
      setGameOver(true);
      return true;
    }

    // Check for draw
    if (checkDraw(newBoard)) {
      setIsDraw(true);
      setGameOver(true);
      return true;
    }

    // Switch player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    return true;
  }, [board, currentPlayer, gameOver]);

  /**
   * Reset the game to initial state
   */
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setGameOver(false);
    setIsDraw(false);
  }, []);

  return {
    board,
    currentPlayer,
    winner,
    winningLine,
    gameOver,
    isDraw,
    makeMove,
    resetGame,
  };
}
