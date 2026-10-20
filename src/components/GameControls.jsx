/**
 * GameControls component - Reset button and difficulty selector
 * Props:
 * - onReset: Function to reset game
 * - difficulty: Current difficulty ('medium' or 'hard')
 * - onDifficultyChange: Function to change difficulty
 * - onClearScores: Function to clear scores
 * - disabled: Boolean to disable controls during AI turn
 */

import styles from '../styles/GameControls.module.css';

export function GameControls({
  onReset,
  difficulty,
  onDifficultyChange,
  onClearScores,
  disabled
}) {
  return (
    <div className={styles.controls}>
      <div className={styles.buttonGroup}>
        <button
          className={styles.resetButton}
          onClick={onReset}
          disabled={disabled}
          aria-label="Reset game"
        >
          Reset Game
        </button>

        <button
          className={styles.clearButton}
          onClick={onClearScores}
          disabled={disabled}
          aria-label="Clear scores"
        >
          Clear Scores
        </button>
      </div>

      <div className={styles.difficultySelector}>
        <label htmlFor="difficulty-select" className={styles.label}>
          Difficulty:
        </label>
        <select
          id="difficulty-select"
          className={styles.select}
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          disabled={disabled}
          aria-label="Select AI difficulty"
        >
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
}
