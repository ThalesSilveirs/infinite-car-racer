
export enum GameState {
  Start,
  Playing,
  GameOver,
}

export interface Obstacle {
  id: number;
  lane: number;
  y: number;
}
