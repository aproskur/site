import React, { createContext, useState, useContext } from 'react';
import data from '../data/data.json';

const WordGameContext = createContext();

export function useWordGame() {
    return useContext(WordGameContext);
}

export const WordGameProvider = ({ children }) => {



    const startGame = () => {
        const newToGuess = getRandomWordFromCategory("Minecraft");
        setWordToPlay(initializeWords(newToGuess));
        setGuessedLetters(new Set());
        setWrongGuesses(0);
        setProgress(100);
    };






    const totalGuesses = 10; // Total wrong guesses allowed
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [progress, setProgress] = useState(100); // Progress starts at 100%

    function getRandomWordFromCategory(category) {
        if (category in data.categories) {
            const words = data.categories[category];
            const randomWord = words[Math.floor(Math.random() * words.length)].name;
            return randomWord;
        } else {
            console.error(`Category "${category}" not found.`);
            return null;
        }
    }

    const toGuess = getRandomWordFromCategory("Minecraft");
    const initializeWords = (phrase) => {
        return phrase.split(' ').map(word => word.toUpperCase().split(''));
    };

    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [wordToPlay, setWordToPlay] = useState(initializeWords(toGuess));

    const addGuessedLetter = letter => {
        setGuessedLetters(currentGuessed => {
            const updatedGuessed = new Set(currentGuessed);
            const letterUpper = letter.toUpperCase();
            updatedGuessed.add(letterUpper);

            // Check if the guessed letter is in the word to play.
            // Convert entire wordToPlay to a flat list of letters to compare easily.
            const wordLetters = wordToPlay.flat(); // Flatten the array of arrays into a single array of letters
            if (!wordLetters.includes(letterUpper)) {
                // If the letter is not included in the word, increase wrong guesses.
                const newWrongGuesses = wrongGuesses + 1;
                setWrongGuesses(newWrongGuesses);
                updateProgress(newWrongGuesses);
            }

            return updatedGuessed;
        });
    };

    const updateProgress = (wrong) => {
        const newProgress = Math.max(0, 100 - (wrong / totalGuesses * 100));
        setProgress(newProgress);
    };

    const resetGame = () => {
        const newToGuess = getRandomWordFromCategory("Minecraft");
        setWordToPlay(initializeWords(newToGuess));
        setGuessedLetters(new Set());
        setWrongGuesses(0);
        setProgress(100);
    };

    return (
        <WordGameContext.Provider value={{ guessedLetters, wordToPlay, addGuessedLetter, startGame, resetGame, progress }}>
            {children}
        </WordGameContext.Provider>
    );
};
