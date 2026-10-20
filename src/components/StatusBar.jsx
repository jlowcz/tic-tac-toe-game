/**
 * StatusBar component - Displays current game status
 * Props:
 * - currentPlayer: 'X' or 'O'
 * - winner: 'X', 'O', or null
 * - isDraw: Boolean
 * - gameOver: Boolean
 */

import styles from '../styles/StatusBar.module.css';

export function StatusBar({ currentPlayer, winner, isDraw, gameOver }) {
  let message;
  let statusClass = '';

  if (winner) {
    const playerName = winner === 'X' ? 'You' : 'AI';
    message = `${playerName} won!`;
    statusClass = winner === 'X' ? styles.playerWin : styles.aiWin;
  } else if (isDraw) {
    message = "It's a draw!";
    statusClass = styles.draw;
  } else {
    const playerName = currentPlayer === 'X' ? 'Your' : "AI's";
    message = `${playerName} turn`;
    statusClass = currentPlayer === 'X' ? styles.playerTurn : styles.aiTurn;
  }

  return (
    <div
      className={`${styles.statusBar} ${statusClass}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className={styles.statusText}>{message}</span>
      {!gameOver && (
        <span className={styles.playerIndicator} aria-hidden="true">
          {currentPlayer}
        </span>
      )}
    </div>
  );
}
