import {
  GameState,
  Position,
  Direction,
  Move,
  DIRECTION_UP,
  DIRECTION_RIGHT,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  MIN_BOARD_SIZE,
  MAX_BOARD_SIZE,
} from './types';

export const MOVES: Position[] = [
  [-1, 0], // Up
  [0, 1],  // Right
  [1, 0],  // Down
  [0, -1], // Left
];

export const OPPOSITES: Record<Direction, Direction> = {
  0: 2, // Up <-> Down
  1: 3, // Right <-> Left
  2: 0,
  3: 1,
};

export function createInitialGameState(boardSize?: number): GameState {
  const size = boardSize || Math.floor(Math.random() * (MAX_BOARD_SIZE - MIN_BOARD_SIZE + 1)) + MIN_BOARD_SIZE;

  // Initialize chess board with walls
  const chessBoard: boolean[][][] = Array(size)
    .fill(null)
    .map(() =>
      Array(size)
        .fill(null)
        .map(() => [false, false, false, false])
    );

  // Set borders
  for (let i = 0; i < size; i++) {
    chessBoard[0][i][DIRECTION_UP] = true;        // Top border
    chessBoard[size - 1][i][DIRECTION_DOWN] = true;  // Bottom border
    chessBoard[i][0][DIRECTION_LEFT] = true;         // Left border
    chessBoard[i][size - 1][DIRECTION_RIGHT] = true; // Right border
  }

  const maxStep = Math.floor((size + 1) / 2);
  const numBarriers = Math.floor(size / 2) - 1;

  // Add random symmetric barriers
  for (let i = 0; i < numBarriers; i++) {
    let r = Math.floor(Math.random() * size);
    let c = Math.floor(Math.random() * size);
    let dir = Math.floor(Math.random() * 4) as Direction;

    while (chessBoard[r][c][dir]) {
      r = Math.floor(Math.random() * size);
      c = Math.floor(Math.random() * size);
      dir = Math.floor(Math.random() * 4) as Direction;
    }

    const antiR = size - 1 - r;
    const antiC = size - 1 - c;
    const antiDir = OPPOSITES[dir];

    setBarrier(chessBoard, r, c, dir, size);
    setBarrier(chessBoard, antiR, antiC, antiDir, size);
  }

  // Random start positions (symmetric but not overlapping)
  // For odd-sized boards, avoid placing p0 at the exact center
  const center = Math.floor(size / 2);
  let p0Pos: Position;
  let p1Pos: Position;

  do {
    p0Pos = [
      Math.floor(Math.random() * size),
      Math.floor(Math.random() * size),
    ];
    // On odd-sized boards, regenerate if p0 is at center
    if (size % 2 === 1 && p0Pos[0] === center && p0Pos[1] === center) {
      continue;
    }
    p1Pos = [size - 1 - p0Pos[0], size - 1 - p0Pos[1]];
    break;
  } while (true);

  // Ensure positions don't overlap and game isn't already over
  let initialEnd = checkEndgame(chessBoard, p0Pos, p1Pos, size);
  while (initialEnd.isEndgame) {
    do {
      p0Pos = [
        Math.floor(Math.random() * size),
        Math.floor(Math.random() * size),
      ];
      // On odd-sized boards, regenerate if p0 is at center
      if (size % 2 === 1 && p0Pos[0] === center && p0Pos[1] === center) {
        continue;
      }
      p1Pos = [size - 1 - p0Pos[0], size - 1 - p0Pos[1]];
      break;
    } while (true);
    initialEnd = checkEndgame(chessBoard, p0Pos, p1Pos, size);
  }

  return {
    boardSize: size,
    chessBoard,
    p0Pos,
    p1Pos,
    turn: 0,
    isGameOver: false,
    winner: null,
    p0Score: 0,
    p1Score: 0,
    maxStep,
  };
}

export function setBarrier(
  chessBoard: boolean[][][],
  r: number,
  c: number,
  dir: Direction,
  boardSize: number
): void {
  chessBoard[r][c][dir] = true;
  const move = MOVES[dir];
  const newR = r + move[0];
  const newC = c + move[1];
  if (newR >= 0 && newR < boardSize && newC >= 0 && newC < boardSize) {
    chessBoard[newR][newC][OPPOSITES[dir]] = true;
  }
}

export function removeBarrier(
  chessBoard: boolean[][][],
  r: number,
  c: number,
  dir: Direction,
  boardSize: number
): void {
  chessBoard[r][c][dir] = false;
  const move = MOVES[dir];
  const newR = r + move[0];
  const newC = c + move[1];
  if (newR >= 0 && newR < boardSize && newC >= 0 && newC < boardSize) {
    chessBoard[newR][newC][OPPOSITES[dir]] = false;
  }
}

export function checkBoundary(pos: Position, boardSize: number): boolean {
  return pos[0] >= 0 && pos[0] < boardSize && pos[1] >= 0 && pos[1] < boardSize;
}

export function checkValidStep(
  chessBoard: boolean[][][],
  startPos: Position,
  endPos: Position,
  barrierDir: Direction,
  advPos: Position,
  maxStep: number,
  boardSize: number
): boolean {
  const [r, c] = endPos;

  // Endpoint already has barrier
  if (chessBoard[r][c][barrierDir]) {
    return false;
  }

  // No movement, just placing barrier
  if (startPos[0] === endPos[0] && startPos[1] === endPos[1]) {
    return true;
  }

  // BFS to check if endPos is reachable
  const queue: [Position, number][] = [[startPos, 0]];
  const visited = new Set<string>([`${startPos[0]},${startPos[1]}`]);

  while (queue.length > 0) {
    const [curPos, curStep] = queue.shift()!;
    const [curR, curC] = curPos;

    if (curStep === maxStep) {
      break;
    }

    for (let dir = 0; dir < 4; dir++) {
      if (chessBoard[curR][curC][dir]) {
        continue;
      }

      const move = MOVES[dir];
      const nextPos: Position = [curR + move[0], curC + move[1]];
      const key = `${nextPos[0]},${nextPos[1]}`;

      // Can't move through adversary
      if (nextPos[0] === advPos[0] && nextPos[1] === advPos[1]) {
        continue;
      }

      if (visited.has(key)) {
        continue;
      }

      // Found the end position
      if (nextPos[0] === endPos[0] && nextPos[1] === endPos[1]) {
        return true;
      }

      visited.add(key);
      queue.push([nextPos, curStep + 1]);
    }
  }

  return false;
}

export function checkEndgame(
  chessBoard: boolean[][][],
  p0Pos: Position,
  p1Pos: Position,
  boardSize: number
): { isEndgame: boolean; p0Score: number; p1Score: number } {
  // Union-Find algorithm
  const father: Record<string, string> = {};

  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      const key = `${r},${c}`;
      father[key] = key;
    }
  }

  function find(pos: string): string {
    if (father[pos] !== pos) {
      father[pos] = find(father[pos]);
    }
    return father[pos];
  }

  function union(pos1: string, pos2: string): void {
    father[pos1] = pos2;
  }

  // Check connections (only right and down to avoid duplicates)
  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      // Check right
      if (c < boardSize - 1 && !chessBoard[r][c][DIRECTION_RIGHT]) {
        const posA = find(`${r},${c}`);
        const posB = find(`${r},${c + 1}`);
        if (posA !== posB) {
          union(posA, posB);
        }
      }
      // Check down
      if (r < boardSize - 1 && !chessBoard[r][c][DIRECTION_DOWN]) {
        const posA = find(`${r},${c}`);
        const posB = find(`${r + 1},${c}`);
        if (posA !== posB) {
          union(posA, posB);
        }
      }
    }
  }

  // Finalize all finds
  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      find(`${r},${c}`);
    }
  }

  const p0Root = find(`${p0Pos[0]},${p0Pos[1]}`);
  const p1Root = find(`${p1Pos[0]},${p1Pos[1]}`);

  const p0Score = Object.values(father).filter(v => v === p0Root).length;
  const p1Score = Object.values(father).filter(v => v === p1Root).length;

  if (p0Root === p1Root) {
    return { isEndgame: false, p0Score, p1Score };
  }

  return { isEndgame: true, p0Score, p1Score };
}

export function applyMove(state: GameState, pos: Position, dir: Direction): GameState {
  const newState = { ...state };
  newState.chessBoard = state.chessBoard.map(row =>
    row.map(cell => [...cell])
  );

  if (state.turn === 0) {
    newState.p0Pos = pos;
  } else {
    newState.p1Pos = pos;
  }

  const [r, c] = pos;
  setBarrier(newState.chessBoard, r, c, dir, state.boardSize);

  newState.turn = 1 - state.turn;

  const endgame = checkEndgame(
    newState.chessBoard,
    newState.p0Pos,
    newState.p1Pos,
    newState.boardSize
  );

  newState.isGameOver = endgame.isEndgame;
  newState.p0Score = endgame.p0Score;
  newState.p1Score = endgame.p1Score;

  if (endgame.isEndgame) {
    if (endgame.p0Score > endgame.p1Score) {
      newState.winner = 0;
    } else if (endgame.p1Score > endgame.p0Score) {
      newState.winner = 1;
    } else {
      newState.winner = null; // Tie
    }
  }

  return newState;
}
