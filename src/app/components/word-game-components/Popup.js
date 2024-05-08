import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useWordGame } from '@/app/context/WordGameContext';
import GameTitle from '../../components/word-game-components/GameTitle';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(var(--dark-navy), 0.6); 
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-wordGameFont);
`;

const PopupContainer = styled.div`
  width: 500px;
  background: rgba(var(--dark-navy), 0.8);
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  overflow: visible;
  gap: 1em;
  padding: 3em 2em;
`;

const Title = styled.h1`
  font-size: 90px;
  font-weight: bold;
  background-image: linear-gradient(to bottom, #67B6FF, #FFFFFF);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-family: inherit;
  text-transform: uppercase;
`;

const Button = styled.button`
  width: 80%;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background: ${props => props.color || '#fff'};
  color: #fff;
  font-size: 30px;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.1s ease-in-out;
  font-family: inherit;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const GradientButton = styled(Button)`
  background: linear-gradient(to bottom, #FE71FE, #7199FF);
  color: #fff;
`;
const PlayButton = styled.button`
  background: radial-gradient(circle at top, #FE71FE, #7199FF);
  border: 1px solid black;
  border-radius: 50%; 
  width: 200px; 
  height: 200px; 
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2), inset 0 -4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s, box-shadow 0.1s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25), inset 0 -4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 50%; 
    height: auto;
  }
`;


const CategorySelection = ({ onCategorySelect }) => {
  const categories = ["Minecraft", "Movies", "Countries", "Capital Cities", "Sports", "Animals"];

  return (
    <>
      <Title>Select a Category</Title>
      {categories.map((category, index) => (
        <Button key={index} color='rgb(var(--blue))' onClick={() => onCategorySelect(category)}>
          {category}
        </Button>
      ))}
    </>
  );
};

function Popup({ isVisible, onClose }) {
  const { progress, resetGame, guessedLetters, startGame, wordToPlay } = useWordGame();

  // State to control the popup visibility and category selection
  const [categorySelection, setCategorySelection] = useState(false);

  // Utility function to check if the player has won
  const hasPlayerWon = () => {
    // Flatten the `wordToPlay` array and filter out any guessed letters
    const wordLetters = wordToPlay.flat();
    return wordLetters.every(letter => guessedLetters.has(letter));
  };

  const handleStartGame = (category) => {
    startGame(category);
    onClose();       // Hide the popup when the game starts
    setCategorySelection(false); // Exit category selection
  };

  const initiateCategorySelection = () => {
    setCategorySelection(true);
    onClose(); // Ensure the popup remains visible during category selection
  };

  /*
  // Effect to control visibility based on win, lose, or selection state
  useEffect(() => {
    let timeout;

    if (progress <= 0 || categorySelection) {
      onClose();
    } else if (hasPlayerWon()) {
      timeout = setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      onClose();
    }

    //Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [progress, guessedLetters, wordToPlay, categorySelection]); */

  useEffect(() => {
    let timeout;

    // Show popup when progress is zero (lose condition) or during category selection
    if (progress <= 0 || categorySelection) {
      // Ensure popup is shown only once per condition
      if (!isVisible) onClose(false);
    } else if (hasPlayerWon()) {
      // Show popup after a delay if the player has won
      timeout = setTimeout(() => {
        if (!isVisible) onClose(true);
      }, 2000);
    } else {
      // Otherwise, ensure popup remains hidden
      if (isVisible) onClose(false);
    }

    return () => clearTimeout(timeout);
  }, [progress, guessedLetters, wordToPlay, categorySelection, isVisible]);


  // Define buttons for different game states
  let buttons = [
    { label: 'Continue', onClick: () => onClose(), color: 'rgb(var(--blue))' },
    { label: 'New Category', onClick: initiateCategorySelection, color: 'rgb(var(--blue))' },
    { label: 'Quit Game', onClick: () => { resetGame(); onClose(); }, type: 'gradient' }
  ];

  if (progress <= 0) {
    buttons = [
      { label: 'Try Again', onClick: () => { resetGame(); onClose(); }, color: 'rgb(var(--blue))' },
      { label: 'Quit', onClick: () => { onClose(); }, type: 'gradient' }
    ];
  } else if (guessedLetters.size === 0 && progress === 100) {
    buttons = [
      { label: 'How to Play', onClick: () => { }, color: 'rgb(var(--blue))' }
    ];
  } else if (hasPlayerWon()) {
    buttons = [
      { label: 'Play Again', onClick: () => { resetGame(); onClose(); }, color: 'rgb(var(--blue))' },
      { label: 'New Category', onClick: initiateCategorySelection, color: 'rgb(var(--blue))' },
      { label: 'Quit', onClick: () => onClose(), type: 'gradient' }
    ];
  }

  const svg = <svg xmlns="http://www.w3.org/2000/svg" width="67" height="64" fill="none" viewBox="0 0 67 64">
    <g filter="url(#a)">
      <path fill="#fff" d="m3.381 33.397-.283-1.845C.658 15.62-.563 7.654 4.026 3.32 8.616-1.013 16.31.84 31.7 4.545l2.035.49c21.007 5.058 31.51 7.587 33.051 15.019 1.541 7.431-7.06 14.08-24.26 27.376l-1.753 1.355c-13.98 10.808-20.972 16.212-27.15 13.67-6.18-2.543-7.534-11.382-10.242-29.058Z" />
    </g>
    <defs>
      <filter id="a" width="66.038" height="62.264" x=".925" y=".811" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="-6" />
        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.141176 0 0 0 0 0.188235 0 0 0 0 0.254902 0 0 0 1 0" />
        <feBlend in2="shape" result="effect1_innerShadow_15_637" />
      </filter>
    </defs>
  </svg>


  return (
    isVisible ? (
      <Overlay>
        <PopupContainer>
          {categorySelection ? (
            <CategorySelection onCategorySelect={handleStartGame} />
          ) : (
            <>
              {guessedLetters.size === 0 && progress === 100 ? <GameTitle /> :
                <Title>{progress <= 0 ? "You Lose" : hasPlayerWon() ? "You Win" : "Paused"}</Title>}
              {guessedLetters.size === 0 && progress === 100 && (
                <div>
                  <PlayButton key="start-game" onClick={initiateCategorySelection}>{svg}</PlayButton>
                </div>
              )}
              {buttons.map((button, index) => (
                button.type === 'gradient' ?
                  <GradientButton key={index} onClick={button.onClick}>
                    {button.label}
                  </GradientButton>
                  :
                  <Button key={index} color={button.color} onClick={button.onClick}>
                    {button.label}
                  </Button>
              ))}

            </>
          )}
        </PopupContainer>
      </Overlay>
    ) : null
  );
}

export default Popup;
