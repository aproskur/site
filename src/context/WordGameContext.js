import React, { createContext, useState, useContext, useEffect } from 'react';
import data from '../data/data.json';

const WordGameContext = createContext();

export function useWordGame() {
    return useContext(WordGameContext);
}

export const WordGameProvider = ({ children }) => {
    // Split an incoming phrase into an array of uppercase letter arrays
    const initializeWords = (phrase) => {
        return phrase.split(' ').map(word => word.toUpperCase().split(''));
    };

    // Core game state shared across all word-game components
    const [wordToPlay, setWordToPlay] = useState([]);
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [progress, setProgress] = useState(100);
    const [category, setCategory] = useState('');
    const [isGameWon, setIsGameWon] = useState(false);
    const [isGameLost, setIsGameLost] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(true);
    const [popupMode, setPopupMode] = useState('start');
    const [isGameVisible, setIsGameVisible] = useState(false);
    const [lastWord, setLastWord] = useState(null);

    // Allow ten incorrect attempts before the player loses
    const totalGuesses = 10;

    // Read a random word from the active category in data.json with basic validation and repeat avoidance
    function getRandomWordFromCategory(category, previousWord) {
        if (!category) {
            console.error('No category provided.');
            return null;
        }

        const categoryWords = data?.categories?.[category];

        if (!Array.isArray(categoryWords)) {
            console.error(`Category "${category}" not found.`);
            return null;
        }

        const validWords = categoryWords
            .map(entry => entry?.name?.trim())
            .filter(name => typeof name === 'string' && name.length > 0);

        if (validWords.length === 0) {
            console.error(`Category "${category}" has no valid words.`);
            return null;
        }

        const candidates = previousWord && validWords.length > 1
            ? validWords.filter(name => name.toLowerCase() !== previousWord.toLowerCase())
            : validWords;

        const pool = candidates.length > 0 ? candidates : validWords;
        const randomWord = pool[Math.floor(Math.random() * pool.length)];
        return randomWord;
    }

    // Kick off a new round for a selected category
    const startGame = (category) => {
        setCategory(category);
        const newToGuess = getRandomWordFromCategory(category, lastWord);
        if (newToGuess) {
            setWordToPlay(initializeWords(newToGuess));
            setGuessedLetters(new Set());
            setWrongGuesses(0);
            setProgress(100);
            setIsGameLost(false);
            setIsGameWon(false);
            setIsPopupVisible(false);
            setIsGameVisible(true);
            setLastWord(newToGuess);
        }
    };

    // Track a newly guessed letter, updating win/loss state as needed
    const addGuessedLetter = (letter) => {
        setGuessedLetters(currentGuessed => {
            const letterUpper = letter.toUpperCase();
            if (currentGuessed.has(letterUpper)) {
                return currentGuessed;
            }
            const updatedGuessed = new Set(currentGuessed);
            updatedGuessed.add(letterUpper);

            const wordLetters = wordToPlay.flat();
            let didLose = false;
            if (!wordLetters.includes(letterUpper)) {
                setWrongGuesses(prevWrongGuesses => {
                    const nextWrongGuesses = prevWrongGuesses + 1;
                    updateProgress(nextWrongGuesses);

                    if (nextWrongGuesses >= totalGuesses) {
                        setIsGameLost(true);
                        setPopupMode("lost");
                        didLose = true;
                    }

                    return nextWrongGuesses;
                });
            }

            if (!didLose && wordLetters.every(char => updatedGuessed.has(char))) {
                setIsGameWon(true);
                setPopupMode("win");
            }

            return updatedGuessed;
        });
    };

    // Shrink the health bar in proportion to wrong guesses
    const updateProgress = (wrong) => {
        const newProgress = Math.max(0, 100 - (wrong / totalGuesses * 100));
        setProgress(newProgress);
    };

    // Restart using the same category if the player wants to replay
    const resetGame = () => {
        if (category) {
            startGame(category);
        } else {
            console.error('No category selected. Unable to reset the game.');
        }
    };

    // Show the start popup when the component first mounts
    useEffect(() => {
        setPopupMode('start');
        setIsPopupVisible(true);
    }, []);

    return (
        <WordGameContext.Provider value={{
            guessedLetters,
            wordToPlay,
            addGuessedLetter,
            startGame,
            resetGame,
            progress,
            category,
            isGameWon,
            isGameLost,
            isPopupVisible,
            setIsPopupVisible,
            popupMode,
            setPopupMode,
            isGameVisible,
            setIsGameVisible
        }}>
            {children}
        </WordGameContext.Provider>
    );
};
