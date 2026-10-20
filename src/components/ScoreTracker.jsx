/**
 * ScoreTracker component - Displays persistent win/loss/draw counts
 * Props:
 * - scores: Object with { x: number, o: number, draws: number }
 */

import styles from '../styles/ScoreTracker.module.css';

export function ScoreTracker({ scores }) {
  return (
    <div className={styles.scoreTracker} role="region" aria-label="Score tracker">
      <div className={styles.scoreItem}>
        <span className={styles.scoreLabel}>You (X)</span>
        <span className={styles.scoreValue} aria-label={`Your wins: ${scores.x}`}>
          {scores.x}
        </span>
      </div>

      <div className={styles.scoreItem}>
        <span className={styles.scoreLabel}>Draws</span>
        <span className={styles.scoreValue} aria-label={`Draws: ${scores.draws}`}>
          {scores.draws}
        </span>
      </div>

      <div className={styles.scoreItem}>
        <span className={styles.scoreLabel}>AI (O)</span>
        <span className={styles.scoreValue} aria-label={`AI wins: ${scores.o}`}>
          {scores.o}
        </span>
      </div>
    </div>
  );
}
