import React, { createContext, useState, useContext } from 'react';
import data from '../data/data.json';

const WordGameContext = createContext();

export function useWordGame() {
    return useContext(WordGameContext);
}

export const WordGameProvider = ({ children }) => {
    const initializeWords = (phrase) => {
        return phrase.split(' ').map(word => word.toUpperCase().split(''));
    };

    const [wordToPlay, setWordToPlay] = useState([]);
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [progress, setProgress] = useState(100);
    const [category, setCategory] = useState('');

    const totalGuesses = 10;

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

    const startGame = (category) => {
        setCategory(category);
        const newToGuess = getRandomWordFromCategory(category);
        if (newToGuess) {
            setWordToPlay(initializeWords(newToGuess));
            setGuessedLetters(new Set());
            setWrongGuesses(0);
            setProgress(100);
        }
    };

    const addGuessedLetter = (letter) => {
        setGuessedLetters(currentGuessed => {
            const updatedGuessed = new Set(currentGuessed);
            const letterUpper = letter.toUpperCase();
            updatedGuessed.add(letterUpper);

            //Flatten the word arrays to compare against guessed letters
            const wordLetters = wordToPlay.flat();
            if (!wordLetters.includes(letterUpper)) {
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

    //Corrected resetGame function to reuse the current category
    const resetGame = () => {
        if (category) {
            startGame(category);  //current category to restart with the same one
        } else {
            console.error('No category selected. Unable to reset the game.');
        }
    };

    return (
        <WordGameContext.Provider value={{
            guessedLetters, wordToPlay, addGuessedLetter, startGame, resetGame, progress, category
        }}>
            {children}
        </WordGameContext.Provider>
    );
};
