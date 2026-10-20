/**
 * WinnerBanner component - Animated result display with replay option
 * Props:
 * - winner: 'X', 'O', or null
 * - isDraw: Boolean
 * - onPlayAgain: Function to reset game
 * - show: Boolean to control visibility
 */

import styles from '../styles/WinnerBanner.module.css';

export function WinnerBanner({ winner, isDraw, onPlayAgain, show }) {
  if (!show) return null;

  let title;
  let emoji;
  let bannerClass = '';

  if (winner === 'X') {
    title = 'You Win!';
    emoji = '🎉';
    bannerClass = styles.playerWin;
  } else if (winner === 'O') {
    title = 'AI Wins!';
    emoji = '🤖';
    bannerClass = styles.aiWin;
  } else if (isDraw) {
    title = "It's a Draw!";
    emoji = '🤝';
    bannerClass = styles.draw;
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="winner-title"
    >
      <div className={`${styles.banner} ${bannerClass}`}>
        <div className={styles.emoji} aria-hidden="true">{emoji}</div>
        <h2 id="winner-title" className={styles.title}>{title}</h2>
        <button
          className={styles.playAgainButton}
          onClick={onPlayAgain}
          autoFocus
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
