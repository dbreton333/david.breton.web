// Game constants and types for Colosseum Survival

export const MIN_BOARD_SIZE = 6;
export const MAX_BOARD_SIZE = 12;

export const DIRECTION_UP = 0;
export const DIRECTION_RIGHT = 1;
export const DIRECTION_DOWN = 2;
export const DIRECTION_LEFT = 3;

export const DIRECTION_NAMES = ["Up", "Right", "Down", "Left"];

export const PLAYER_1_ID = 0;
export const PLAYER_2_ID = 1;

export const PLAYER_1_NAME = "You";
export const PLAYER_2_NAME = "AI Bot";

export type Position = [number, number];
export type Direction = 0 | 1 | 2 | 3;
export type Move = [Position, Direction];

export interface GameState {
  boardSize: number;
  chessBoard: boolean[][][]; // [row][col][direction] - walls
  p0Pos: Position;
  p1Pos: Position;
  turn: number; // 0 or 1
  isGameOver: boolean;
  winner: number | null; // 0, 1, or null for tie
  p0Score: number;
  p1Score: number;
  maxStep: number;
}
