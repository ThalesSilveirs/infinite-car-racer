import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Obstacle } from '../types';
import {
  LANES,
  LANE_WIDTH_PX,
  ROAD_WIDTH_PX,
  ROAD_HEIGHT_PX,
  CAR_HEIGHT_PX,
  CAR_WIDTH_PX,
  PLAYER_INITIAL_LANE,
  PLAYER_Y_POSITION,
  INITIAL_GAME_SPEED,
  SPEED_INCREMENT_INTERVAL,
  SPEED_INCREMENT_AMOUNT,
  OBSTACLE_SPAWN_RATE_INITIAL,
  OBSTACLE_SPAWN_RATE_MIN,
  OBSTACLE_SPAWN_ACCELERATION,
} from '../constants';

interface GameProps {
  onGameOver: (score: number) => void;
}

const lanePositions = Array.from({ length: LANES }, (_, i) => 
  (i * LANE_WIDTH_PX) + (LANE_WIDTH_PX / 2) - (CAR_WIDTH_PX / 2)
);

const Game: React.FC<GameProps> = ({ onGameOver }) => {
  const [playerLane, setPlayerLane] = useState(PLAYER_INITIAL_LANE);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(INITIAL_GAME_SPEED);
  
  const gameLoopRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const obstacleSpawnCounterRef = useRef<number>(0);
  const obstacleSpawnRateRef = useRef<number>(OBSTACLE_SPAWN_RATE_INITIAL);
  const nextSpeedIncrementScoreRef = useRef<number>(SPEED_INCREMENT_INTERVAL);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    setPlayerLane(prevLane => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        return prevLane > 0 ? prevLane - 1 : 0;
      }
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        return prevLane < LANES - 1 ? prevLane + 1 : LANES - 1;
      }
      return prevLane;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const gameLoop = useCallback((timestamp: number) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = timestamp;
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    const deltaTime = (timestamp - lastTimeRef.current) / 16.67; // Normalize to 60fps
    lastTimeRef.current = timestamp;

    // Update Score
    setScore(prev => prev + (gameSpeed / 10) * deltaTime);

    // Update Game Speed
    if (score > nextSpeedIncrementScoreRef.current) {
        setGameSpeed(prev => prev + SPEED_INCREMENT_AMOUNT);
        nextSpeedIncrementScoreRef.current += SPEED_INCREMENT_INTERVAL;
    }

    // Update and Spawn Obstacles
    let newObstacles = obstacles
      .map(o => ({ ...o, y: o.y + gameSpeed * deltaTime }))
      .filter(o => o.y < ROAD_HEIGHT_PX);

    obstacleSpawnCounterRef.current += gameSpeed * deltaTime;
    if (obstacleSpawnCounterRef.current > obstacleSpawnRateRef.current) {
      obstacleSpawnCounterRef.current = 0;
      obstacleSpawnRateRef.current = Math.max(OBSTACLE_SPAWN_RATE_MIN, obstacleSpawnRateRef.current * OBSTACLE_SPAWN_ACCELERATION);
      const newLane = Math.floor(Math.random() * LANES);
      newObstacles.push({ id: Date.now(), lane: newLane, y: -CAR_HEIGHT_PX });
    }
    
    // Set new state for obstacles
    setObstacles(newObstacles);
    
    // Collision Detection (using the new positions)
    for (const obstacle of newObstacles) {
        if (
            obstacle.lane === playerLane &&
            obstacle.y + CAR_HEIGHT_PX > PLAYER_Y_POSITION &&
            obstacle.y < PLAYER_Y_POSITION + CAR_HEIGHT_PX
        ) {
            onGameOver(score);
            return; // Stop the game loop
        }
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameSpeed, score, onGameOver, obstacles, playerLane]);

  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameLoop]);

  return (
    <div
      className="bg-gray-800 rounded-lg shadow-2xl p-2 overflow-hidden relative"
      style={{ width: ROAD_WIDTH_PX, height: ROAD_HEIGHT_PX }}
    >
        {/* Score Display */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 bg-gray-900 bg-opacity-70 px-4 py-1 rounded-lg">
            <p className="text-2xl font-orbitron font-bold text-white tracking-widest">{Math.floor(score)}</p>
        </div>

        {/* Road and Lane Markings */}
        <div className="absolute inset-0 bg-gray-700">
            {Array.from({length: LANES - 1}).map((_, i) => (
                <div key={i} className="absolute h-full border-r-4 border-dashed border-gray-500" style={{left: `${(i+1) * LANE_WIDTH_PX}px`}}></div>
            ))}
        </div>

        {/* Player Car */}
        <div
            className="absolute bg-cyan-400 rounded-t-md rounded-b-sm shadow-lg transition-all duration-100 ease-linear"
            style={{
            width: CAR_WIDTH_PX,
            height: CAR_HEIGHT_PX,
            top: PLAYER_Y_POSITION,
            left: lanePositions[playerLane],
            willChange: 'left',
            }}
        >
             <div className="absolute inset-x-1 top-3 h-4 bg-gray-900 opacity-80 rounded-sm"></div>
        </div>

        {/* Obstacles */}
        {obstacles.map(obstacle => (
            <div
            key={obstacle.id}
            className="absolute bg-red-500 rounded-t-md rounded-b-sm shadow-md"
            style={{
                width: CAR_WIDTH_PX,
                height: CAR_HEIGHT_PX,
                top: obstacle.y,
                left: lanePositions[obstacle.lane],
                willChange: 'top',
            }}
            >
                <div className="absolute inset-x-1 top-3 h-4 bg-gray-900 opacity-60 rounded-sm"></div>
            </div>
        ))}
    </div>
  );
};

export default Game;