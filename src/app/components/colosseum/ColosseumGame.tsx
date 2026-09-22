'use client';

import React, { useState, useEffect } from 'react';
import { GameState, Position, Direction } from './types';
import { createInitialGameState, applyMove, checkValidStep, MOVES } from './gameLogic';
import { BasicAgent } from './aiAgent';
import { AdvancedAgent } from './advancedAiAgent';
import { GameBoard } from './GameBoard';
import styles from './ColosseumGame.module.css';

interface ReachableCells {
  [key: string]: boolean;
}

type AIType = 'basic' | 'advanced';

export const ColosseumGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedCell, setSelectedCell] = useState<Position | null>(null);
  const [pendingMove, setPendingMove] = useState<{ pos: Position; dir: Direction } | null>(null);
  const [player1AI, setPlayer1AI] = useState<AIType>('advanced');
  const [player0AI, setPlayer0AI] = useState<AIType | null>(null); // null means human player
  const [selectedOpponentAI, setSelectedOpponentAI] = useState<AIType>('advanced');
  const [selectedBoardSize, setSelectedBoardSize] = useState<number | undefined>(6);
  const [basicAgent] = useState(() => new BasicAgent());
  const [advancedAgent] = useState(() => new AdvancedAgent());
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [reachableCells, setReachableCells] = useState<ReachableCells>({});
  const [message, setMessage] = useState<string>('');
  const [aiSpeed, setAiSpeed] = useState<number>(800); // milliseconds between AI moves
  const [winStats, setWinStats] = useState({ advancedWins: 0, basicWins: 0, humanWins: 0, ties: 0 });

  const startNewGame = (boardSize?: number) => {
    const newState = createInitialGameState(boardSize);
    setGameState(newState);
    setSelectedCell(null);
    setPendingMove(null);
    setReachableCells({});
    setMessage('Your turn! Click on a cell to move, then click on a wall to place it.');
  };

  useEffect(() => {
    if (!gameState || gameState.isGameOver || isAiThinking) return;

    const isPlayer0AI = player0AI !== null;
    const isPlayer1AI = true; // Player 1 is always AI

    const currentPlayerIsAI = (gameState.turn === 0 && isPlayer0AI) || (gameState.turn === 1 && isPlayer1AI);

    if (currentPlayerIsAI) {
      setIsAiThinking(true);

      const currentAIType = gameState.turn === 0 ? player0AI : player1AI;
      const aiName = currentAIType === 'advanced' ? 'Advanced AI' : 'Basic AI';
      const playerName = gameState.turn === 0 ? 'Player 1 (You)' : 'Player 2 (AI)';

      setMessage(`${isPlayer0AI && gameState.turn === 0 ? 'AI 1' : isPlayer0AI ? 'AI 2' : aiName} is thinking...`);

      setTimeout(() => {
        const currentAgent = currentAIType === 'advanced' ? advancedAgent : basicAgent;
        const move = currentAgent.step(gameState, gameState.turn);
        const [pos, dir] = move;

        const newState = applyMove(gameState, pos, dir);
        setGameState(newState);
        setIsAiThinking(false);

        if (newState.isGameOver) {
          setMessage('');
          updateWinStats(newState);
        } else if (!isPlayer0AI && newState.turn === 0) {
          setMessage('Your turn! Click on a cell to move, then click on a wall to place it.');
        }
      }, isPlayer0AI ? aiSpeed : 500); // Use aiSpeed for AI vs AI
    }
  }, [gameState, isAiThinking, player0AI, player1AI, basicAgent, advancedAgent, aiSpeed]);

  const updateWinStats = (endedGameState: GameState) => {
    if (endedGameState.winner === null) {
      setWinStats(prev => ({ ...prev, ties: prev.ties + 1 }));
    } else if (endedGameState.winner === 0) {
      // Player 0 won
      if (player0AI === null) {
        setWinStats(prev => ({ ...prev, humanWins: prev.humanWins + 1 }));
      } else if (player0AI === 'advanced') {
        setWinStats(prev => ({ ...prev, advancedWins: prev.advancedWins + 1 }));
      } else {
        setWinStats(prev => ({ ...prev, basicWins: prev.basicWins + 1 }));
      }
    } else {
      // Player 1 won
      if (player1AI === 'advanced') {
        setWinStats(prev => ({ ...prev, advancedWins: prev.advancedWins + 1 }));
      } else {
        setWinStats(prev => ({ ...prev, basicWins: prev.basicWins + 1 }));
      }
    }
  };

  const calculateReachableCells = (fromPos: Position): ReachableCells => {
    if (!gameState) return {};

    const { chessBoard, maxStep, boardSize, p1Pos } = gameState;
    const advPos = p1Pos;
    const reachable: ReachableCells = {};

    const queue: [Position, number][] = [[fromPos, 0]];
    const visited = new Set<string>([`${fromPos[0]},${fromPos[1]}`]);
    reachable[`${fromPos[0]},${fromPos[1]}`] = true;

    while (queue.length > 0) {
      const [curPos, steps] = queue.shift()!;
      const [r, c] = curPos;

      if (steps >= maxStep) continue;

      for (let dir = 0; dir < 4; dir++) {
        if (chessBoard[r][c][dir]) continue;

        const move = MOVES[dir];
        const nextPos: Position = [r + move[0], c + move[1]];
        const key = `${nextPos[0]},${nextPos[1]}`;

        // Can't move through adversary
        if (nextPos[0] === advPos[0] && nextPos[1] === advPos[1]) continue;

        // Out of bounds
        if (nextPos[0] < 0 || nextPos[0] >= boardSize || nextPos[1] < 0 || nextPos[1] >= boardSize) continue;

        if (visited.has(key)) continue;

        visited.add(key);
        reachable[key] = true;
        queue.push([nextPos, steps + 1]);
      }
    }

    return reachable;
  };

  const handleCellClick = (pos: Position) => {
    if (!gameState || gameState.isGameOver || gameState.turn !== 0 || isAiThinking || player0AI !== null) return;

    const key = `${pos[0]},${pos[1]}`;

    // If no cell selected, select this one (if reachable from current position)
    if (!selectedCell) {
      const reachable = calculateReachableCells(gameState.p0Pos);
      if (reachable[key]) {
        setSelectedCell(pos);
        setPendingMove(null);
        setReachableCells(reachable);
        setMessage('Now click on a wall around your selected position to place it.');
      }
      return;
    }

    // If clicking the same cell, deselect
    if (selectedCell[0] === pos[0] && selectedCell[1] === pos[1]) {
      setSelectedCell(null);
      setPendingMove(null);
      setReachableCells({});
      setMessage('Your turn! Click on a cell to move, then click on a wall to place it.');
      return;
    }

    // If clicking a different reachable cell, select it
    if (reachableCells[key]) {
      setSelectedCell(pos);
      setPendingMove(null);
      setMessage('Now click on a wall around your selected position to place it.');
    }
  };

  const handleWallClick = (pos: Position, dir: Direction) => {
    if (!gameState || gameState.isGameOver || gameState.turn !== 0 || isAiThinking || player0AI !== null) return;
    if (!selectedCell) return;

    // Wall must be placed at the selected cell
    if (selectedCell[0] !== pos[0] || selectedCell[1] !== pos[1]) return;

    // Check if wall already exists
    if (gameState.chessBoard[pos[0]][pos[1]][dir]) return;

    // Validate the move
    const isValid = checkValidStep(
      gameState.chessBoard,
      gameState.p0Pos,
      pos,
      dir,
      gameState.p1Pos,
      gameState.maxStep,
      gameState.boardSize
    );

    if (!isValid) {
      setMessage('Invalid move! Try a different position or wall.');
      return;
    }

    // Set pending move to show preview
    setPendingMove({ pos, dir });
    setMessage('Click "Confirm Move" to place your wall, or select a different wall.');
  };

  const confirmMove = () => {
    if (!gameState || !pendingMove) return;

    const { pos, dir } = pendingMove;
    const newState = applyMove(gameState, pos, dir);

    setGameState(newState);
    setSelectedCell(null);
    setPendingMove(null);
    setReachableCells({});

    if (newState.isGameOver) {
      updateWinStats(newState);
    } else {
      setMessage('AI is making its move...');
    }
  };

  const cancelMove = () => {
    setPendingMove(null);
    setMessage('Select a different wall or cell.');
  };

  const backToStart = () => {
    setGameState(null);
    setSelectedCell(null);
    setPendingMove(null);
    setReachableCells({});
    setMessage('');
    setPlayer0AI(null); // Reset to human mode
    setSelectedOpponentAI('advanced');
    setSelectedBoardSize(6);
    setWinStats({ advancedWins: 0, basicWins: 0, humanWins: 0, ties: 0 });
  };

  if (!gameState) {
    return (
      <div className={styles.container}>
        <div className={styles.startScreen}>
          <h1>Colosseum Survival</h1>
          <p>Choose your settings and start playing!</p>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px' }}>Select AI Opponent:</h3>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => setSelectedOpponentAI('basic')}
                className={`${styles.button} ${selectedOpponentAI === 'basic' ? styles.selectedAIButton : ''}`}
              >
                Basic AI
              </button>
              <button
                onClick={() => setSelectedOpponentAI('advanced')}
                className={`${styles.button} ${selectedOpponentAI === 'advanced' ? styles.selectedAIButton : ''}`}
              >
                Advanced AI ⭐
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px' }}>Select Board Size:</h3>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => setSelectedBoardSize(6)}
                className={`${styles.button} ${selectedBoardSize === 6 ? styles.selectedAIButton : ''}`}
              >
                6x6
              </button>
              <button
                onClick={() => setSelectedBoardSize(8)}
                className={`${styles.button} ${selectedBoardSize === 8 ? styles.selectedAIButton : ''}`}
              >
                8x8
              </button>
              <button
                onClick={() => setSelectedBoardSize(10)}
                className={`${styles.button} ${selectedBoardSize === 10 ? styles.selectedAIButton : ''}`}
              >
                10x10
              </button>
              <button
                onClick={() => setSelectedBoardSize(undefined)}
                className={`${styles.button} ${selectedBoardSize === undefined ? styles.selectedAIButton : ''}`}
              >
                Random
              </button>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '15px' }}>Start Game:</h3>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => {
                  setPlayer0AI(null);
                  setPlayer1AI(selectedOpponentAI);
                  startNewGame(selectedBoardSize);
                }}
                className={styles.button}
              >
                Play Against AI
              </button>
              <button
                onClick={() => {
                  setPlayer0AI('advanced');
                  setPlayer1AI('basic');
                  startNewGame(selectedBoardSize);
                }}
                className={`${styles.button} ${styles.aiVsAiButton}`}
              >
                Watch AI vs AI
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.gameHeader}>
        <h2>Colosseum Survival</h2>
        <div className={styles.gameInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Board Size:</span>
            <span className={styles.value}>{gameState.boardSize}x{gameState.boardSize}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Max Steps:</span>
            <span className={styles.value}>{gameState.maxStep}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>
              {player0AI ? `${player0AI === 'advanced' ? 'Advanced' : 'Basic'} AI:` : 'Your Score:'}
            </span>
            <span className={styles.value}>{gameState.p0Score}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>
              {player0AI ? `${player1AI === 'advanced' ? 'Advanced' : 'Basic'} AI:` : 'AI Score:'}
            </span>
            <span className={styles.value}>{gameState.p1Score}</span>
          </div>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {player0AI !== null && (
              <>
                <div style={{ opacity: 0.65, fontSize: '0.9rem' }}>
                  <strong style={{ opacity: 1 }}>Advanced AI:</strong> {winStats.advancedWins} wins
                </div>
                <div style={{ opacity: 0.65, fontSize: '0.9rem' }}>
                  <strong style={{ opacity: 1 }}>Basic AI:</strong> {winStats.basicWins} wins
                </div>
                <div style={{ opacity: 0.65, fontSize: '0.9rem' }}>
                  <strong style={{ opacity: 1 }}>Ties:</strong> {winStats.ties}
                </div>
              </>
            )}
            {player0AI === null && (
              <>
                <div style={{ opacity: 0.65, fontSize: '0.9rem' }}>
                  <strong style={{ opacity: 1 }}>You:</strong> {winStats.humanWins} wins
                </div>
                <div style={{ opacity: 0.65, fontSize: '0.9rem' }}>
                  <strong style={{ opacity: 1 }}>AI:</strong> {player1AI === 'advanced' ? winStats.advancedWins : winStats.basicWins} wins
                </div>
                <div style={{ opacity: 0.65, fontSize: '0.9rem' }}>
                  <strong style={{ opacity: 1 }}>Ties:</strong> {winStats.ties}
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setWinStats({ advancedWins: 0, basicWins: 0, humanWins: 0, ties: 0 })}
            className={styles.button}
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            Reset Stats
          </button>
        </div>
      </div>

      {player0AI && (
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <span style={{ opacity: 0.65, marginRight: '10px', fontSize: '0.9rem' }}>AI Speed:</span>
          <button
            onClick={() => setAiSpeed(1500)}
            className={`${styles.button} ${aiSpeed === 1500 ? styles.selectedSpeedButton : ''}`}
            style={{ padding: '8px 16px', fontSize: '0.9rem', marginRight: '8px' }}
          >
            Slow
          </button>
          <button
            onClick={() => setAiSpeed(800)}
            className={`${styles.button} ${aiSpeed === 800 ? styles.selectedSpeedButton : ''}`}
            style={{ padding: '8px 16px', fontSize: '0.9rem', marginRight: '8px' }}
          >
            Normal
          </button>
          <button
            onClick={() => setAiSpeed(300)}
            className={`${styles.button} ${aiSpeed === 300 ? styles.selectedSpeedButton : ''}`}
            style={{ padding: '8px 16px', fontSize: '0.9rem', marginRight: '8px' }}
          >
            Fast
          </button>
          <button
            onClick={() => setAiSpeed(50)}
            className={`${styles.button} ${aiSpeed === 50 ? styles.selectedSpeedButton : ''}`}
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            Ultra Fast
          </button>
        </div>
      )}

      {message && <div className={styles.message}>{message}</div>}

      {gameState.isGameOver && (
        <div className={styles.gameOver}>
          <h2>Game Over!</h2>
          {player0AI ? (
            <>
              {gameState.winner === 0 && (
                <p className={styles.winText}>
                  🎉 {player0AI === 'advanced' ? 'Advanced' : 'Basic'} AI Wins! 🎉
                </p>
              )}
              {gameState.winner === 1 && (
                <p className={styles.winText}>
                  🎉 {player1AI === 'advanced' ? 'Advanced' : 'Basic'} AI Wins! 🎉
                </p>
              )}
              {gameState.winner === null && <p>It&apos;s a Tie!</p>}
              <p>
                Final Score - {player0AI === 'advanced' ? 'Advanced' : 'Basic'}: {gameState.p0Score} | {player1AI === 'advanced' ? 'Advanced' : 'Basic'}: {gameState.p1Score}
              </p>
            </>
          ) : (
            <>
              {gameState.winner === 0 && <p className={styles.winText}>🎉 You Win! 🎉</p>}
              {gameState.winner === 1 && <p className={styles.loseText}>AI Wins!</p>}
              {gameState.winner === null && <p>It&apos;s a Tie!</p>}
              <p>
                Final Score - You: {gameState.p0Score} | AI: {gameState.p1Score}
              </p>
            </>
          )}
        </div>
      )}

      <GameBoard
        gameState={gameState}
        selectedCell={selectedCell}
        onCellClick={handleCellClick}
        onWallClick={handleWallClick}
        pendingMove={pendingMove}
        player0AI={player0AI}
        player1AI={player1AI}
      />

      <div className={styles.controls}>
        {pendingMove && (
          <>
            <button onClick={confirmMove} className={`${styles.button} ${styles.confirmButton}`}>
              Confirm Move
            </button>
            <button onClick={cancelMove} className={`${styles.button} ${styles.cancelButton}`}>
              Cancel
            </button>
          </>
        )}
        <button onClick={() => startNewGame(gameState.boardSize)} className={styles.button}>
          New Game
        </button>
        <button onClick={backToStart} className={styles.button}>
          Change Size
        </button>
      </div>
    </div>
  );
};
