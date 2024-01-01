'use client'
import React from 'react';
import { GameSettingsProvider, useGameSettings } from '../context/GameSettingsContext';
import styles from './GamePage.module.css';
import GameBoard from '../components/game-components/GameBoard';
import ThemeSelector from '../components/game-components/ThemeSelector';

const GameContent = () => {
    const { gameStarted, gridSize, theme } = useGameSettings();

    return (
        <div className={styles.gameContainer}>
            {gameStarted ? (
                <GameBoard size={gridSize} theme={theme} />
            ) : (
                <ThemeSelector />
            )}
        </div>
    );
};

export default function GamePage() {
    return (
        <GameSettingsProvider>
            <GameContent />
        </GameSettingsProvider>
    );
}
