/**
 * Custom hook for persisting scores to localStorage
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'tictactoe_scores';

/**
 * Hook for managing persistent score state
 * @returns {Object} - {scores, updateScores, clearScores}
 */
export function usePersistence() {
  const [scores, setScores] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : { x: 0, o: 0, draws: 0 };
    } catch (error) {
      console.error('Failed to load scores from localStorage:', error);
      return { x: 0, o: 0, draws: 0 };
    }
  });

  // Sync scores to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch (error) {
      console.error('Failed to save scores to localStorage:', error);
    }
  }, [scores]);

  /**
   * Update scores
   * @param {string} winner - 'X', 'O', or 'draw'
   */
  const updateScores = useCallback((winner) => {
    setScores((prev) => {
      if (winner === 'X') {
        return { ...prev, x: prev.x + 1 };
      } else if (winner === 'O') {
        return { ...prev, o: prev.o + 1 };
      } else if (winner === 'draw') {
        return { ...prev, draws: prev.draws + 1 };
      }
      return prev;
    });
  }, []);

  /**
   * Clear all scores
   */
  const clearScores = useCallback(() => {
    setScores({ x: 0, o: 0, draws: 0 });
  }, []);

  return {
    scores,
    updateScores,
    clearScores,
  };
}
