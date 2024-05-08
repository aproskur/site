'use client'
import React, { useState } from 'react';
import { useWordGame } from '../../context/WordGameContext';
import HeaderWordGame from '../../components/word-game-components/HeaderWordGame';
import GameLetter from '../../components/word-game-components/Letter';
import VirtualKeyboard from '../../components/word-game-components/VirtualKeyboard';
import Popup from '../../components/word-game-components/Popup';
import PausePopup from '../../components/word-game-components/PausePopup'
import styles from '../../pages/word-game/WordGamePage.module.css';
import styled from 'styled-components';


const StyledLetterContainer = styled.div`
  grid-area: word;
  display: flex;
  flex-wrap: wrap;  
  align-items: center;
  justify-content: center;
  padding: 1em;

  div.word {
    flex: 1 0 50%;  //Each word tries to take up half of the line
    display: flex;
    gap: .75em;  
    justify-content: center;
  }
`;

export default function WordGame({ }) {
    const { wordToPlay, guessedLetters } = useWordGame();

    const [isPauseVisible, setIsPauseVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => setIsPopupVisible(!isPopupVisible);



    const togglePausePopup = () => {
        setIsPauseVisible(!isPauseVisible);
    };


    // Callback functions for controlling the PausePopup
    const handleResume = () => setIsPauseVisible(false);

    const handleQuit = () => {
        // Logic to quit the game or redirect
        setIsPauseVisible(false);
        // Additional quitting logic can be included here
    };

    console.log("wordToPlay:", wordToPlay);
    console.log("guessedLetters:", guessedLetters);

    if (!wordToPlay) {
        console.error('WordGameContext not available or wordToPlay is undefined.');
        return <div>Unable to load the game. Please try reloading.</div>;
    }

    return (
        <div className={styles.wordGameContainer}>
            WORD GAME PAGE
            <svg className={styles.background} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"></svg>
            <HeaderWordGame onMenuClick={togglePausePopup} />
            <StyledLetterContainer>
                {wordToPlay.map((word, wordIndex) => (
                    <div key={wordIndex} className='word'>
                        {word.map((letter, letterIndex) => (
                            <GameLetter
                                key={`${letterIndex}-${letterIndex}`}
                                letterToGuess={letter}
                                isGuessed={guessedLetters.has(letter)}
                            />
                        ))}
                    </div>
                ))}
            </StyledLetterContainer>
            <VirtualKeyboard />
            <Popup isVisible={isPopupVisible} onClose={togglePopup} />
            <PausePopup
                isVisible={isPauseVisible}
                onResume={handleResume}
                onQuit={handleQuit}
            />        </div>
    );
}
