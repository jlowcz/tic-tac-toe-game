/**
 * Board component - 3x3 CSS Grid layout with cells
 * Props:
 * - board: Array of 9 elements ('X', 'O', or null)
 * - onCellClick: Function to handle cell clicks
 * - winningLine: Array of 3 indices representing winning combination, or null
 */

import { Cell } from './Cell.jsx';
import styles from '../styles/Board.module.css';

export function Board({ board, onCellClick, winningLine }) {
  const isWinningCell = (index) => {
    return winningLine && winningLine.includes(index);
  };

  return (
    <div
      className={styles.board}
      role="grid"
      aria-label="Tic Tac Toe board"
    >
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          isWinningCell={isWinningCell(index)}
          index={index}
        />
      ))}

      {winningLine && (
        <div
          className={`${styles.winLine} ${styles[`winLine${winningLine.join('-')}`]}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
