'use client'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useWordGame } from '@/app/context/WordGameContext';
import GameTitle from '../../components/word-game-components/GameTitle'


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
  padding: 5em 3em;
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

function Popup() {
  const { progress, resetGame, guessedLetters, startGame } = useWordGame();

  //State to control the popup
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if progress is less than or equal to 0
    if (progress <= 0) {
      setIsVisible(true); // Show the popup
    } else {
      setIsVisible(false); // Hide the popup
    }
  }, [progress]); // Run this effect whenever progress changes

  // Function to start the game and hide the popup
  const handleStartGame = () => {
    startGame();
    setIsVisible(false);
  };

  let buttons = [
    { label: 'Continue', onClick: () => setIsVisible(false), color: 'rgb(var(--blue))' },
    { label: 'New Category', onClick: () => { }, color: 'rgb(var(--blue))' },
    { label: 'Quit Game', onClick: () => { resetGame(); setIsVisible(false); }, type: 'gradient' }
  ];

  if (progress <= 0) {
    buttons = [
      { label: 'Try Again', onClick: () => { resetGame(); setIsVisible(false); }, color: 'rgb(var(--blue))' },
      { label: 'Quit', onClick: () => { setIsVisible(false); }, type: 'gradient' }
    ];
  } else if (guessedLetters.size === 0 && progress === 100) {
    buttons = [
      { label: 'Start Game', onClick: handleStartGame, color: 'rgb(var(--blue))' },
      { label: 'How to Play', onClick: () => { }, color: 'rgb(var(--blue))' }
    ];
  }

  return (
    isVisible ? (
      <Overlay>
        <PopupContainer>
          {guessedLetters.size === 0 && progress === 100 ? <GameTitle /> : <Title>{progress <= 0 ? "Game Over" : "Paused"}</Title>}
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
        </PopupContainer>
      </Overlay>
    ) : null
  );
}

export default Popup;