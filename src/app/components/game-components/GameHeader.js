'use client'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ToggleButton from './ToggleButton'
import { useGameSettings } from '../../context/GameSettingsContext';


const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;  
`;

const Title = styled.div`
  font-size: 44px;
  font-weight: bold;
  display: flex;

  


  @media (min-width:  450px){
    div {
      margin-left: 2em;
    }
  }

  
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
`;

const StyledFlexContainer = styled.div`
display: flex;
gap: 1em;
align-items: center;
`;

const StyledYellowButton = styled(ToggleButton)`
background-color: var(--accent-yellow);
padding: .5em 1.25em;
  
    &:hover {
        background-color: rgba(253, 162, 20, 0.8);
    }
    @media screen and (max-width: 594px) {
      display: none;
    }

  `;

const StyledSmallScreenMenuButton = styled(ToggleButton)`
  background-color: var(--accent-yellow);
  margin-bottom: 1em;


  

  &:hover {
    background-color: rgba(253, 162, 20, 0.8);
  }

  @media screen and (min-width: 594px) {
    display: none;
  }
`;




const StyledGameButton = styled(ToggleButton)`
    color: var(--accent-dark);
    font-weight: bold;
    padding: .5em 1.25em;

    @media screen and (max-width: 594px) {
      display: none;
    }
  `;

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const OffcanvasMenu = styled.div`
  background-color: white;
  width: 90%;
  padding: 20px;
  border-radius: 10px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledOffcanvasButton = styled(StyledYellowButton)`
display:none;
@media screen and (max-width: 594px) {
  display: inline-block;
}
`;




const GameHeader = ({ onRestart, pauseTimer, resumeTimer }) => {

  const { startGame } = useGameSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    pauseTimer();
  };

  const handleOffcanvasRestart = () => {
    setIsMenuOpen(false);
    onRestart();
  };

  const handleResume = () => {
    setIsMenuOpen(false);
    resumeTimer();
  }

  return (
    <>
      <HeaderContainer>

        <Title><a href="/"><img src="../images/Favicon_3.png" width="60px" /></a><div>memo</div></Title>
        <StyledFlexContainer>
          <StyledSmallScreenMenuButton onClick={toggleMenu} className="menu-button">
            Menu
          </StyledSmallScreenMenuButton>
          <StyledYellowButton onClick={onRestart}>Restart</StyledYellowButton>
          <StyledGameButton onClick={() => { startGame(false) }}>New Game</StyledGameButton>
        </StyledFlexContainer>
      </HeaderContainer>
      {isMenuOpen && (
        <MenuContainer>
          <OffcanvasMenu>
            <StyledOffcanvasButton onClick={handleOffcanvasRestart}>Restart</StyledOffcanvasButton>
            <StyledOffcanvasButton onClick={() => startGame(false)}>New Game</StyledOffcanvasButton>
            <StyledOffcanvasButton onClick={handleResume}>Resume Game</StyledOffcanvasButton>
          </OffcanvasMenu>
        </MenuContainer>
      )}
    </>
  );
}

export default GameHeader;