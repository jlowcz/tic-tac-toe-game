/**
 * App component - Root component providing game state and rendering main game
 */

import { useState } from 'react';
import { GameBoard } from './components/GameBoard.jsx';
import { GameControls } from './components/GameControls.jsx';
import { ScoreTracker } from './components/ScoreTracker.jsx';
import { usePersistence } from './hooks/usePersistence.js';
import './styles/App.css';

function App() {
  const [difficulty, setDifficulty] = useState('hard');
  const [gameKey, setGameKey] = useState(0); // Key to force GameBoard remount
  const { scores, updateScores, clearScores } = usePersistence();

  const handleReset = () => {
    // Force remount of GameBoard by changing key
    setGameKey((prev) => prev + 1);
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    // Reset game when difficulty changes
    setGameKey((prev) => prev + 1);
  };

  const handleClearScores = () => {
    if (window.confirm('Are you sure you want to clear all scores?')) {
      clearScores();
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Tic Tac Toe</h1>
        <p className="app-subtitle">Play against AI</p>
      </header>

      <main className="app-main">
        <ScoreTracker scores={scores} />

        <GameBoard
          key={gameKey}
          difficulty={difficulty}
          onScoreUpdate={updateScores}
        />

        <GameControls
          onReset={handleReset}
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          onClearScores={handleClearScores}
          disabled={false}
        />
      </main>

      <footer className="app-footer">
        <p>Use keyboard to navigate. Press Enter or Space to select cells.</p>
      </footer>
    </div>
  );
}

export default App;
