import React, { createContext, useState, useEffect, useContext } from 'react';

const GameSettingsContext = createContext();

export const useGameSettings = () => useContext(GameSettingsContext);

export const GameSettingsProvider = ({ children }) => {
    const [theme, setTheme] = useState('Numbers');
    const [gridSize, setGridSize] = useState(4);
    const [numPlayers, setNumPlayers] = useState(1);
    const [gameStarted, setGameStarted] = useState(false);
    const [playerData, setPlayerData] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    const startGame = (start) => {
        setGameStarted(start);
        if (start) {
            resetPlayerData(); // Reset player data to initial state
            setCurrentPlayerIndex(0); // Reset current player index to 0
        }

    }

    // Method to update the theme
    const changeTheme = (newTheme) => {
        setTheme(newTheme);
    };

    // Method to update the number of players
    const changePlayers = (newPlayers) => {
        setNumPlayers(newPlayers);
        //resetPlayerData(newPlayers);
    };


    const updatePlayerData = (newData) => {
        setPlayerData(newData);
    };

    /* v1
    const resetPlayerData = () => {
        // Create a new array with each element being a distinct object
        const initialData = Array.from({ length: numPlayers }, () => ({ pairs: 0 }));
        setPlayerData(initialData);
    }; */


    const resetPlayerData = () => {
        const initialData = Array.from({ length: numPlayers }, (_, index) => ({
            id: `Player ${index + 1}`,
            pairs: 0,
            moves: 0,
        }));
        setPlayerData(initialData);
    };


    // Use an effect to reset player data when numPlayers changes
    useEffect(() => {
        resetPlayerData(); // This ensures player data is reset with the correct number of players
    }, [numPlayers]); // Depend on numPlayers to automatically reset player data when it changes


    const updatePairsCount = (playerIndex, newPairsCount) => {
        setPlayerData(currentPlayerData =>
            currentPlayerData.map((data, index) =>
                index === playerIndex ? { ...data, pairs: newPairsCount } : data
            )
        );
    };




    // Method to update the grid size
    const changeGridSize = (newGridSize) => {
        setGridSize(newGridSize);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    return (
        <GameSettingsContext.Provider value={{
            theme,
            changeTheme,
            numPlayers,
            changePlayers,
            playerData,
            gridSize,
            changeGridSize,
            gameStarted,
            startGame,
            formatTime,
            updatePairsCount,
            resetPlayerData,
            currentPlayerIndex,
            updatePlayerData,
        }}>
            {children}
        </GameSettingsContext.Provider>
    );
};
