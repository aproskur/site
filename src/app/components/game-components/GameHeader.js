import React from 'react';
import styled from 'styled-components';
import ToggleButton from './ToggleButton'
import { useGameSettings } from '../../context/GameSettingsContext';


const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em
  height: 15%;
`;

const Title = styled.div`
  font-size: 44px;
  font-weight: bold;
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
`;

const StyledYellowButton = styled(ToggleButton)`
    background-color: var(--accent-yellow);
  
    &:hover {
        background-color: rgba(253, 162, 20, 0.8);
    }
  `;



const GameHeader = ({ onRestart }) => {

    const { startGame } = useGameSettings();

    return (
        <HeaderContainer>
            <Title>memo</Title>
            <StyledFlexContainer>
                <StyledYellowButton onClick={onRestart}>Restart</StyledYellowButton>
                <ToggleButton onClick={() => { startGame(false) }}>New Game</ToggleButton>
            </StyledFlexContainer>
        </HeaderContainer>
    );
}

export default GameHeader;