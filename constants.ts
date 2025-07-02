
export const LANES = 3;
export const LANE_WIDTH_PX = 100;
export const ROAD_WIDTH_PX = LANES * LANE_WIDTH_PX;
export const ROAD_HEIGHT_PX = 600;

export const CAR_HEIGHT_PX = 70;
export const CAR_WIDTH_PX = 45;

export const PLAYER_INITIAL_LANE = 1;
export const PLAYER_Y_POSITION = ROAD_HEIGHT_PX - CAR_HEIGHT_PX - 20;

export const INITIAL_GAME_SPEED = 4;
export const SPEED_INCREMENT_INTERVAL = 500; // Increase speed every 500 score points
export const SPEED_INCREMENT_AMOUNT = 0.2;

// O contador de spawn é incrementado pela velocidade do jogo a cada quadro.
// Isso significa que o valor da taxa de spawn é efetivamente a distância mínima em pixels entre os obstáculos gerados.
export const OBSTACLE_SPAWN_RATE_INITIAL = 350; // Distância inicial entre os obstáculos. Menor é mais difícil.
export const OBSTACLE_SPAWN_RATE_MIN = 175; // Distância mínima entre os obstáculos no final do jogo. Deve ser > CAR_HEIGHT_PX.
export const OBSTACLE_SPAWN_ACCELERATION = 0.997; // Multiplicador para diminuir a distância de spawn ao longo do tempo. Mais perto de 1 é uma aceleração mais lenta.
