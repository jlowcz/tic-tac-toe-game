/**
 * Cell component - Individual square in the tic-tac-toe board
 * Props:
 * - value: 'X', 'O', or null
 * - onClick: Function to handle cell click
 * - isWinningCell: Boolean indicating if this cell is part of winning line
 * - index: Cell index (0-8) for accessibility
 */

import styles from '../styles/Cell.module.css';

export function Cell({ value, onClick, isWinningCell, index }) {
  return (
    <button
      className={`${styles.cell} ${isWinningCell ? styles.winning : ''} ${value ? styles.filled : ''}`}
      onClick={onClick}
      disabled={value !== null}
      aria-label={`Cell ${index + 1}${value ? `, filled with ${value}` : ', empty'}`}
      aria-pressed={value !== null}
    >
      <span className={styles.mark} aria-hidden="true">
        {value}
      </span>
    </button>
  );
}
