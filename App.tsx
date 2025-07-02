
import React, { useState, useCallback } from 'react';
import Game from './components/Game';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [score, setScore] = useState<number>(0);

  const handleStartGame = useCallback(() => {
    setScore(0);
    setGameState(GameState.Playing);
  }, []);

  const handleGameOver = useCallback((finalScore: number) => {
    setScore(finalScore);
    setGameState(GameState.GameOver);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
        return <Game onGameOver={handleGameOver} />;
      case GameState.GameOver:
        return <GameOverScreen score={score} onRestart={handleStartGame} />;
      case GameState.Start:
      default:
        return <StartScreen onStart={handleStartGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
       <h1 className="text-5xl md:text-6xl font-bold font-orbitron text-cyan-400 mb-2 tracking-widest text-shadow">
        INFINITE RACER
      </h1>
      <p className="text-gray-400 mb-8">Use Arrow Keys (← →) or A/D to move</p>
      {renderContent()}
    </div>
  );
};

export default App;
