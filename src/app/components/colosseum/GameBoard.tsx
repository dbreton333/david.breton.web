'use client';

import React from 'react';
import { GameState, Position, Direction, DIRECTION_UP, DIRECTION_RIGHT, DIRECTION_DOWN, DIRECTION_LEFT } from './types';
import styles from './GameBoard.module.css';

interface GameBoardProps {
  gameState: GameState;
  selectedCell: Position | null;
  onCellClick: (pos: Position) => void;
  onWallClick: (pos: Position, dir: Direction) => void;
  pendingMove: { pos: Position; dir: Direction } | null;
  player0AI: 'basic' | 'advanced' | null;
  player1AI: 'basic' | 'advanced';
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  selectedCell,
  onCellClick,
  onWallClick,
  pendingMove,
  player0AI,
  player1AI,
}) => {
  const { boardSize, chessBoard, p0Pos, p1Pos } = gameState;

  const isPlayer0 = (r: number, c: number) => p0Pos[0] === r && p0Pos[1] === c;
  const isPlayer1 = (r: number, c: number) => p1Pos[0] === r && p1Pos[1] === c;
  const isSelected = (r: number, c: number) => selectedCell && selectedCell[0] === r && selectedCell[1] === c;

  const renderCell = (r: number, c: number) => {
    const hasTopWall = chessBoard[r][c][DIRECTION_UP];
    const hasRightWall = chessBoard[r][c][DIRECTION_RIGHT];
    const hasBottomWall = chessBoard[r][c][DIRECTION_DOWN];
    const hasLeftWall = chessBoard[r][c][DIRECTION_LEFT];

    const isPendingWall = (dir: Direction) => {
      return pendingMove && pendingMove.pos[0] === r && pendingMove.pos[1] === c && pendingMove.dir === dir;
    };

    const cellIsSelected = isSelected(r, c);

    // Check if wall is on border
    const isTopBorder = r === 0;
    const isBottomBorder = r === boardSize - 1;
    const isLeftBorder = c === 0;
    const isRightBorder = c === boardSize - 1;

    return (
      <div
        key={`${r}-${c}`}
        className={`${styles.cell} ${cellIsSelected ? styles.selected : ''}`}
        onClick={() => onCellClick([r, c])}
      >
        {/* Only show interactive walls on selected cell - all 4 directions (excluding borders) */}
        {cellIsSelected && (
          <>
            {/* Top wall - skip if on top border */}
            {!isTopBorder && (
              <div
                className={`${styles.wall} ${styles.wallTop} ${hasTopWall ? styles.wallActive : styles.wallInteractive} ${isPendingWall(DIRECTION_UP) ? styles.wallPending : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!hasTopWall) onWallClick([r, c], DIRECTION_UP);
                }}
              />
            )}

            {/* Right wall - skip if on right border */}
            {!isRightBorder && (
              <div
                className={`${styles.wall} ${styles.wallRight} ${hasRightWall ? styles.wallActive : styles.wallInteractive} ${isPendingWall(DIRECTION_RIGHT) ? styles.wallPending : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!hasRightWall) onWallClick([r, c], DIRECTION_RIGHT);
                }}
              />
            )}

            {/* Bottom wall - skip if on bottom border */}
            {!isBottomBorder && (
              <div
                className={`${styles.wall} ${styles.wallBottom} ${hasBottomWall ? styles.wallActive : styles.wallInteractive} ${isPendingWall(DIRECTION_DOWN) ? styles.wallPending : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!hasBottomWall) onWallClick([r, c], DIRECTION_DOWN);
                }}
              />
            )}

            {/* Left wall - skip if on left border */}
            {!isLeftBorder && (
              <div
                className={`${styles.wall} ${styles.wallLeft} ${hasLeftWall ? styles.wallActive : styles.wallInteractive} ${isPendingWall(DIRECTION_LEFT) ? styles.wallPending : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!hasLeftWall) onWallClick([r, c], DIRECTION_LEFT);
                }}
              />
            )}
          </>
        )}

        {/* Show existing walls on non-selected cells - only render TOP and LEFT to avoid duplicates (excluding borders) */}
        {!cellIsSelected && (
          <>
            {hasTopWall && !isTopBorder && <div className={`${styles.wall} ${styles.wallTop} ${styles.wallActive}`} />}
            {hasLeftWall && !isLeftBorder && <div className={`${styles.wall} ${styles.wallLeft} ${styles.wallActive}`} />}
          </>
        )}

        {/* Player markers */}
        {isPlayer0(r, c) && (
          <div className={`${styles.player} ${styles.player0}`}>
            {player0AI ? (player0AI === 'advanced' ? 'Advanced AI' : 'Basic AI') : 'YOU'}
          </div>
        )}
        {isPlayer1(r, c) && (
          <div className={`${styles.player} ${styles.player1}`}>
            {player0AI ? (player1AI === 'advanced' ? 'Advanced AI' : 'Basic AI') : 'AI'}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.boardContainer}>
      <div
        className={styles.board}
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
          gridTemplateRows: `repeat(${boardSize}, 1fr)`,
        }}
      >
        {/* Render cells */}
        {Array.from({ length: boardSize }, (_, r) =>
          Array.from({ length: boardSize }, (_, c) => renderCell(r, c))
        )}
      </div>
    </div>
  );
};
