/**
 * GameBoard component - Main game container orchestrating game flow
 * Props:
 * - difficulty: AI difficulty setting ('medium' or 'hard')
 * - onScoreUpdate: Function to update scores when game ends
 */

import { useEffect } from 'react';
import { useGameState } from '../hooks/useGameState.js';
import { useAI } from '../hooks/useAI.js';
import { Board } from './Board.jsx';
import { StatusBar } from './StatusBar.jsx';
import { WinnerBanner } from './WinnerBanner.jsx';

export function GameBoard({ difficulty, onScoreUpdate }) {
  const {
    board,
    currentPlayer,
    winner,
    winningLine,
    gameOver,
    isDraw,
    makeMove,
    resetGame,
  } = useGameState();

  // Trigger AI moves when it's computer's turn
  useAI({
    board,
    currentPlayer,
    gameOver,
    makeMove,
    difficulty,
  });

  // Update scores when game ends
  useEffect(() => {
    if (gameOver) {
      if (winner) {
        onScoreUpdate(winner);
      } else if (isDraw) {
        onScoreUpdate('draw');
      }
    }
  }, [gameOver, winner, isDraw, onScoreUpdate]);

  const handleCellClick = (index) => {
    // Only allow human moves when it's X's turn and game is not over
    if (currentPlayer === 'X' && !gameOver) {
      makeMove(index);
    }
  };

  return (
    <div className="game-board">
      <StatusBar
        currentPlayer={currentPlayer}
        winner={winner}
        isDraw={isDraw}
        gameOver={gameOver}
      />

      <Board
        board={board}
        onCellClick={handleCellClick}
        winningLine={winningLine}
      />

      <WinnerBanner
        winner={winner}
        isDraw={isDraw}
        onPlayAgain={resetGame}
        show={gameOver}
      />
    </div>
  );
}
