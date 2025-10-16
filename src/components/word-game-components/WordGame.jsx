'use client';
import React, { useEffect } from 'react';
import { useWordGame } from '../../context/WordGameContext';
import HeaderWordGame from './HeaderWordGame';
import GameLetter from './Letter';
import VirtualKeyboard from './VirtualKeyboard';
import Popup from './Popup';
import styles from '@/components/word-game-components/WordGamePage.module.css';
import styled from 'styled-components';
import confetti from 'canvas-confetti';

const StyledLetterContainer = styled.div`
  grid-area: word;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 2em;


  @media (max-width: 480px){
   padding: .2em;
  }


  div.word {
    flex: 1 0 60%;
    display: flex;
    
    gap: 0.3rem;
    justify-content: center;

    @media (max-width: 480px){
        flex: 1 0 100%;
        flex-wrap: wrap;
        gap: 0.2em;
        padding: .2rem;
      }
  }


`;

const RESULT_POPUP_DELAY = 2000;

export default function WordGame() {
    const {
        wordToPlay,
        guessedLetters,
        isGameLost,
        isGameWon,
        isPopupVisible,
        setIsPopupVisible,
        popupMode,
        setPopupMode,
        isGameVisible
    } = useWordGame();

    const togglePopup = () => setIsPopupVisible(!isPopupVisible);

    useEffect(() => {
        if (!isGameLost) {
            return;
        }

        const timeoutId = setTimeout(() => {
            setPopupMode("lost");
            setIsPopupVisible(true);
        }, RESULT_POPUP_DELAY);

        return () => clearTimeout(timeoutId);
    }, [isGameLost, setIsPopupVisible, setPopupMode, RESULT_POPUP_DELAY]);

    useEffect(() => {
        if (!isGameWon) {
            return;
        }

        confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.6 }
        });

        const timeoutId = setTimeout(() => {
            setPopupMode("win");
            setIsPopupVisible(true);
        }, RESULT_POPUP_DELAY);

        return () => clearTimeout(timeoutId);
    }, [isGameWon, setIsPopupVisible, setPopupMode, RESULT_POPUP_DELAY]);

    const handleMenuClick = () => {
        setPopupMode("pause");
        setIsPopupVisible(true);
    };

    if (!wordToPlay) {
        console.error('WordGameContext not available or wordToPlay is undefined.');
        return <div>Unable to load the game. Please try reloading.</div>;
    }

    return (
        <div className={styles.wordGameContainer}>
            <picture className={styles.background} aria-hidden="true">
                <source
                    media="(min-width: 1024px)"
                    srcSet="/images/word-game-images/background-desktop.webp"
                    type="image/webp"
                />
                <source
                    media="(min-width: 768px)"
                    srcSet="/images/word-game-images/tablet-background.webp"
                    type="image/webp"
                />
                <img src="/images/word-game-images/mobile-background.webp" alt="" />
            </picture>
            <div className={styles.content}>
                <HeaderWordGame onMenuClick={handleMenuClick} />
                {isGameVisible && (
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
                )}
                <VirtualKeyboard />
                <Popup isVisible={isPopupVisible} onClose={togglePopup} mode={popupMode} handleMode={setPopupMode} />
            </div>
        </div>
    );
}
