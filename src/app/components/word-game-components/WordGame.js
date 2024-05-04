'use client'
import React from 'react';
import { useWordGame } from '../../context/WordGameContext';
import HeaderWordGame from '../../components/word-game-components/HeaderWordGame';
import GameLetter from '../../components/word-game-components/Letter';
import VirtualKeyboard from '../../components/word-game-components/VirtualKeyboard';
import Popup from '../../components/word-game-components/Popup';
import styles from '../../pages/word-game/WordGamePage.module.css';
import styled from 'styled-components';


const StyledLetterContainer = styled.div`
  grid-area: word;
  display: flex;
  flex-wrap: wrap;  
   gap: 20px 0px;
  align-items: center;
  justify-content: center;

  div.word {
    flex: 1 0 50%;  // Each word tries to take up half of the line
    display: flex;  
    gap: 1em;       
    justify-content: center;
  }
`;

export default function WordGame() {
    const { wordToPlay, guessedLetters } = useWordGame();

    if (!wordToPlay) {
        console.error('WordGameContext not available or wordToPlay is undefined.');
        return <div>Unable to load the game. Please try reloading.</div>;
    }

    return (
        <div className={styles.wordGameContainer}>
            WORD GAME PAGE
            <svg className={styles.background} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"></svg>
            <HeaderWordGame />
            <StyledLetterContainer>
                {wordToPlay.map((word, wordIndex) => (
                    <div key={wordIndex} className='word'>
                        {word.map((letter, letterIndex) => (
                            <GameLetter
                                key={letterIndex}
                                letterToGuess={letter}
                                isGuessed={guessedLetters.has(letter)}
                            />
                        ))}
                    </div>
                ))}
            </StyledLetterContainer>
            <VirtualKeyboard />
            <Popup />
        </div>
    );
}
