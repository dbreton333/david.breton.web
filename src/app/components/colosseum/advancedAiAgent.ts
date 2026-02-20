import { GameState, Position, Direction, Move } from './types';
import { MOVES, setBarrier, removeBarrier, checkEndgame } from './gameLogic';

export class AdvancedAgent {
  private maxDepth: number = 4;
  private maxTime: number = 1950;
  private startTime: number = 0;

  constructor() {}

  public step(state: GameState, playerNumber: number = 1): Move {
    const { chessBoard, p0Pos, p1Pos, maxStep, boardSize } = state;

    // Use correct positions based on which player the AI is
    const myPos = playerNumber === 0 ? p0Pos : p1Pos;
    const advPos = playerNumber === 0 ? p1Pos : p0Pos;

    if (boardSize > 7) {
      this.maxDepth = 3;
    }

    if (boardSize > 11) {
      this.maxTime = 1925;
    }

    this.startTime = Date.now();
    const bestMove = this.alphaBeta(myPos, advPos, chessBoard, maxStep, boardSize);

    return bestMove;
  }

  private alphaBeta(
    myPos: Position,
    advPos: Position,
    chessBoard: boolean[][][],
    maxStep: number,
    boardSize: number
  ): Move {
    let bestMove: Move | null = null;
    let alpha = -Number.MAX_SAFE_INTEGER;
    const beta = Number.MAX_SAFE_INTEGER;

    const moves = this.generateAllMovesBFS(myPos, advPos, chessBoard, maxStep, boardSize);

    for (const move of moves) {
      const [newPos, newDir] = move;

      setBarrier(chessBoard, newPos[0], newPos[1], newDir, boardSize);

      const evalWinner = this.evaluateWinner(newPos, advPos, chessBoard, boardSize, this.maxDepth);
      let score: number;

      if (evalWinner !== null) {
        score = evalWinner;
      } else {
        score = this.minValue(
          newPos,
          advPos,
          chessBoard,
          maxStep,
          boardSize,
          this.maxDepth - 1,
          alpha,
          beta
        );
      }

      removeBarrier(chessBoard, newPos[0], newPos[1], newDir, boardSize);

      if (score > alpha) {
        bestMove = move;
        alpha = score;
      }
    }

    if (bestMove === null && moves.length > 0) {
      return moves[moves.length - 1];
    }

    return bestMove!;
  }

  private maxValue(
    myPos: Position,
    advPos: Position,
    chessBoard: boolean[][][],
    maxStep: number,
    boardSize: number,
    depth: number,
    alpha: number,
    beta: number
  ): number {
    if (depth === 0) {
      return this.evaluatePosition(myPos, advPos, chessBoard, maxStep, boardSize);
    }

    const moves = this.generateAllMovesBFS(myPos, advPos, chessBoard, maxStep, boardSize);

    if (moves.length === 0) {
      return this.evaluatePosition(myPos, advPos, chessBoard, maxStep, boardSize);
    }

    for (const move of moves) {
      const [newPos, newDir] = move;

      setBarrier(chessBoard, newPos[0], newPos[1], newDir, boardSize);

      const evalWinner = this.evaluateWinner(newPos, advPos, chessBoard, boardSize, depth);

      if (evalWinner !== null) {
        alpha = Math.max(alpha, evalWinner);
      } else {
        const value = this.minValue(
          newPos,
          advPos,
          chessBoard,
          maxStep,
          boardSize,
          depth - 1,
          alpha,
          beta
        );
        alpha = Math.max(alpha, value);
      }

      removeBarrier(chessBoard, newPos[0], newPos[1], newDir, boardSize);

      if (alpha >= beta) {
        return beta;
      }

      if (Date.now() - this.startTime > this.maxTime) {
        return alpha;
      }
    }

    return alpha;
  }

  private minValue(
    myPos: Position,
    advPos: Position,
    chessBoard: boolean[][][],
    maxStep: number,
    boardSize: number,
    depth: number,
    alpha: number,
    beta: number
  ): number {
    if (depth === 0) {
      return this.evaluatePosition(myPos, advPos, chessBoard, maxStep, boardSize);
    }

    const moves = this.generateAllMovesBFS(advPos, myPos, chessBoard, maxStep, boardSize);

    if (moves.length === 0) {
      return this.evaluatePosition(myPos, advPos, chessBoard, maxStep, boardSize);
    }

    for (const move of moves) {
      const [newPos, newDir] = move;

      setBarrier(chessBoard, newPos[0], newPos[1], newDir, boardSize);

      const evalWinner = this.evaluateWinner(myPos, newPos, chessBoard, boardSize, depth);

      if (evalWinner !== null) {
        beta = Math.min(beta, evalWinner);
      } else {
        const value = this.maxValue(
          myPos,
          newPos,
          chessBoard,
          maxStep,
          boardSize,
          depth - 1,
          alpha,
          beta
        );
        beta = Math.min(beta, value);
      }

      removeBarrier(chessBoard, newPos[0], newPos[1], newDir, boardSize);

      if (alpha >= beta) {
        return alpha;
      }

      if (Date.now() - this.startTime > this.maxTime) {
        return beta;
      }
    }

    return beta;
  }

  private evaluateWinner(
    myPos: Position,
    advPos: Position,
    chessBoard: boolean[][][],
    boardSize: number,
    depth: number
  ): number | null {
    const endgame = checkEndgame(chessBoard, myPos, advPos, boardSize);

    if (endgame.isEndgame) {
      if (endgame.p0Score === endgame.p1Score) {
        return 0;
      }
      if (endgame.p0Score > endgame.p1Score) {
        return 1000 - (this.maxDepth - depth);
      } else {
        return -1000 + (this.maxDepth - depth);
      }
    }

    return null;
  }

  private generateAllMovesBFS(
    myPos: Position,
    advPos: Position,
    chessBoard: boolean[][][],
    maxStep: number,
    boardSize: number
  ): Move[] {
    const moves: Move[] = [];
    const queue: [Position, number][] = [[myPos, maxStep]];
    const visitedPositions: boolean[][] = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(false));

    visitedPositions[myPos[0]][myPos[1]] = true;

    while (queue.length > 0) {
      const [currentPos, stepsRemaining] = queue.shift()!;
      const [r, c] = currentPos;

      const allowedBarriers: Direction[] = [];
      for (let i = 0; i < 4; i++) {
        if (!chessBoard[r][c][i]) {
          allowedBarriers.push(i as Direction);
        }
      }

      for (const barrierDir of allowedBarriers) {
        moves.push([currentPos, barrierDir]);
      }

      if (stepsRemaining <= 0) {
        continue;
      }

      for (let dir = 0; dir < 4; dir++) {
        if (chessBoard[r][c][dir]) continue;

        const move = MOVES[dir];
        const newR = r + move[0];
        const newC = c + move[1];

        if (newR === advPos[0] && newC === advPos[1]) continue;
        if (newR < 0 || newR >= boardSize || newC < 0 || newC >= boardSize) continue;
        if (visitedPositions[newR][newC]) continue;

        const myNewPos: Position = [newR, newC];
        visitedPositions[newR][newC] = true;
        queue.push([myNewPos, stepsRemaining - 1]);
      }
    }

    return moves;
  }

  private countAllMoves(
    myPos: Position,
    advPos: Position,
    chessBoard: boolean[][][],
    maxStep: number,
    boardSize: number
  ): number {
    let moveCount = 0;
    const queue: [Position, number][] = [[myPos, maxStep]];
    const visitedPositions: boolean[][] = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(false));

    visitedPositions[myPos[0]][myPos[1]] = true;

    while (queue.length > 0) {
      const [currentPos, stepsRemaining] = queue.shift()!;
      const [r, c] = currentPos;

      for (let i = 0; i < 4; i++) {
        if (!chessBoard[r][c][i]) {
          moveCount++;
        }
      }

      if (stepsRemaining <= 0) {
        continue;
      }

      for (let dir = 0; dir < 4; dir++) {
        if (chessBoard[r][c][dir]) continue;

        const move = MOVES[dir];
        const newR = r + move[0];
        const newC = c + move[1];

        if (newR === advPos[0] && newC === advPos[1]) continue;
        if (newR < 0 || newR >= boardSize || newC < 0 || newC >= boardSize) continue;
        if (visitedPositions[newR][newC]) continue;

        const myNewPos: Position = [newR, newC];
        visitedPositions[newR][newC] = true;
        queue.push([myNewPos, stepsRemaining - 1]);
      }
    }

    return moveCount;
  }

  private evaluatePosition(
    myPos: Position,
    advPos: Position,
    chessBoard: boolean[][][],
    maxStep: number,
    boardSize: number
  ): number {
    const moveCount = this.countAllMoves(myPos, advPos, chessBoard, maxStep, boardSize);
    const advMoveCount = this.countAllMoves(advPos, myPos, chessBoard, maxStep, boardSize);

    return moveCount - advMoveCount;
  }
}
