
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div 
        className="flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-2xl p-8"
        style={{width: '300px', height: '600px'}}
    >
      <div className="w-full h-full flex flex-col items-center justify-center border-4 border-dashed border-gray-600 rounded-lg p-4">
        <h2 className="text-4xl font-bold font-orbitron text-white mb-8">Ready?</h2>
        <button
          onClick={onStart}
          className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold py-4 px-10 rounded-lg text-2xl font-orbitron transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-lg"
        >
          START
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
