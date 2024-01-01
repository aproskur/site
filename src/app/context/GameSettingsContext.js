import React, { createContext, useState, useContext } from 'react';

const GameSettingsContext = createContext();

export const useGameSettings = () => useContext(GameSettingsContext);

export const GameSettingsProvider = ({ children }) => {
    const [theme, setTheme] = useState('Numbers');
    const [players, setPlayers] = useState(1);
    const [gridSize, setGridSize] = useState(4);


    const [gameStarted, setGameStarted] = useState(false);

    const startGame = (start) => {
        setGameStarted(start);
    }

    // Method to update the theme
    const changeTheme = (newTheme) => {
        setTheme(newTheme);
    };

    // Method to update the number of players
    const changePlayers = (newPlayers) => {
        setPlayers(newPlayers);
    };

    // Method to update the grid size
    const changeGridSize = (newGridSize) => {
        setGridSize(newGridSize);
    };

    return (
        <GameSettingsContext.Provider value={{
            theme,
            changeTheme,
            players,
            changePlayers,
            gridSize,
            changeGridSize,
            gameStarted,
            startGame,
        }}>
            {children}
        </GameSettingsContext.Provider>
    );
};
