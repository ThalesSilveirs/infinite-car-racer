import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  const staticMessages = [
    "Even the best drivers hit a bump.",
    "The finish line was just a new beginning.",
    "Sometimes you're the windshield, sometimes you're the bug.",
    "The road to success is paved with... practice.",
    "Wrong way! Or was it?"
  ];
  // Pick a random message on each game over screen
  const message = staticMessages[Math.floor(Math.random() * staticMessages.length)];

  return (
    <div 
        className="flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-2xl p-8"
        style={{width: '300px', height: '600px'}}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-center border-4 border-dashed border-red-500 rounded-lg p-4">
        <h2 className="text-5xl font-bold font-orbitron text-red-500 mb-4">GAME OVER</h2>
        <p className="text-xl text-gray-300 mb-2">Final Score:</p>
        <p className="text-6xl font-bold font-orbitron text-cyan-400 mb-8">{Math.floor(score)}</p>

        <div className="bg-gray-700 p-4 rounded-lg min-h-[80px] w-full flex items-center justify-center mb-8">
            <p className="text-lg text-yellow-300 italic">
                "{message}"
            </p>
        </div>

        <button
          onClick={onRestart}
          className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold py-4 px-10 rounded-lg text-2xl font-orbitron transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-lg"
        >
          RESTART
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;