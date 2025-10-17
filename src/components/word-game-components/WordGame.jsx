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
import { Link } from '@/i18n/routing';

// Layout wrapper for the revealed words so multi-word phrases stay centered
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

// Floating logo that returns users to the main page
const HomeLogoLink = styled(Link)`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 767px){
    top: 1rem;
    left: 1rem;
  }
`;

const HomeLogoImage = styled.img`
  height: 56px;
  width: auto;

  @media (max-width: 767px){
    height: 42px;
  }

  @media (max-width: 480px){
    height: 36px;
  }
`;

// Delay before showing win/lose popups to let the animation breathe
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

    // Pause/resume popup visibility while keeping context in sync
    const togglePopup = () => setIsPopupVisible(!isPopupVisible);

    // Wait a moment after the final wrong guess before presenting the loss popup
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

    // Fire confetti on victory and surface the win popup after a short delay
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

    // Pause the game and expose the popup menu
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
            <HomeLogoLink href={{ pathname: '/' }} aria-label="Back to home" title="Return to main page">
                <HomeLogoImage src="/images/short-transparent-logo.webp" alt="Anna Web Dev logo" />
            </HomeLogoLink>
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
