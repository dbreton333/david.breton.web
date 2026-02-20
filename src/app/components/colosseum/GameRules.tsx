'use client';

import React from 'react';
import styles from './GameRules.module.css';

export const GameRules: React.FC = () => {
  return (
    <div className={styles.rulesContainer}>
      <h2 className={styles.title}>Game Rules</h2>

      <div className={styles.section}>
        <h3>Objective</h3>
        <p>
          Think you can outsmart my AI? Good luck with that! Your mission is to control more territory than
          my personally developed bot by strategically moving around the board and placing walls. When the
          board is divided into separate territories, whoever controls the most cells wins. Spoiler alert:
          my AI doesn&apos;t lose often.
        </p>
      </div>

      <div className={styles.section}>
        <h3>How to Play</h3>
        <ol className={styles.list}>
          <li>
            <strong>Movement:</strong> On your turn, you can move up to a certain number of steps (based on board size).
            Click on any reachable cell to select where you want to move.
          </li>
          <li>
            <strong>Placing Walls:</strong> After selecting your position, you must place a wall on one of the four sides
            of your cell (up, down, left, or right). Walls block movement for both players.
          </li>
          <li>
            <strong>Restrictions:</strong> You cannot move through walls or through your opponent. You cannot place a wall
            where one already exists.
          </li>
          <li>
            <strong>AI Turn:</strong> After you confirm your move, the AI will automatically make its move and place a wall.
          </li>
        </ol>
      </div>

      <div className={styles.section}>
        <h3>Winning the Game</h3>
        <p>
          The game ends when you and your opponent are completely separated into different territories (cannot reach each other).
          At that point, the board is divided and each player&apos;s score is calculated based on how many cells they control.
          The player with the higher score wins!
        </p>
        <ul className={styles.list}>
          <li>Your territory includes all cells you can reach from your current position</li>
          <li>The AI&apos;s territory includes all cells it can reach from its position</li>
          <li>If both players control the same number of cells, the game is a tie</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3>Strategy Tips</h3>
        <ul className={styles.list}>
          <li>Try to claim as much open space as possible before getting separated</li>
          <li>Use walls strategically to trap the AI in a smaller area (it&apos;s trying to do the same to you!)</li>
          <li>Plan several moves ahead - once a wall is placed, it cannot be removed</li>
          <li>Remember: my AI thinks 2-3 moves ahead using alpha-beta pruning, so you&apos;ll need to be clever</li>
          <li>Don&apos;t say I didn&apos;t warn you when it corners you!</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3>About the AI</h3>
        <p>
          You&apos;re playing against my custom-built AI bot that I developed during my McGill University COMP 424
          course. This isn&apos;t your average opponent - it uses the minimax algorithm with alpha-beta pruning
          to calculate optimal moves several steps ahead. I engineered this AI to be ruthless: it&apos;s constantly
          evaluating the board to maximize its territory while trapping you in the smallest space possible.
          Think you can beat it? Many have tried...
        </p>
      </div>
    </div>
  );
};
