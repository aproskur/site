import React from 'react';
import ToggleButton from './ToggleButton';
import { useGameSettings } from '../../context/GameSettingsContext';
import styled from 'styled-components';



const StyledThemeSelectorWrapper = styled.div`
display: flex;
flex-direction: column;
background-color: var(--dark);
height: 100vh;
justify-content: center;
align-items: center;
`

const StyledMemoTitle = styled.div`
    font-size: 2em; 
    color: #fff;
    font-weight: bold;
    margin-bottom: 1em; 
    text-align: center;
`;

const StyledThemeSelector = styled.div`
    display: flex;
    background-color: #fff;
    flex-direction: column;
    border-radius: 10px;
    width: 50%;
    padding: 2em;
    gap: 1em;
    
    
    `;

const StyledItemsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1em;

    div {
        color: var(--greyish-blue);
    }

    & > * {
        flex: 1; 
    }
    `;


const StyledYellowButton = styled(ToggleButton)`
    background-color: var(--accent-yellow);
  
    &:hover {
        background-color: rgba(253, 162, 20, 0.8);
    }
  `;





const ThemeSelector = () => {

    const { theme, changeTheme, startGame, changeGridSize, gridSize, players } = useGameSettings();

    return (
        <StyledThemeSelectorWrapper>
            <StyledMemoTitle>memo</StyledMemoTitle>
            <StyledThemeSelector>
                <StyledItemsWrapper>
                    <div>Select Theme</div>
                </StyledItemsWrapper>
                <StyledItemsWrapper>
                    <ToggleButton active={theme === 'Numbers'} onClick={() => changeTheme('Numbers')}>
                        Numbers
                    </ToggleButton>
                    <ToggleButton active={theme === 'Icons'} onClick={() => changeTheme('Icons')}>
                        Icons
                    </ToggleButton>
                </StyledItemsWrapper>
                <StyledItemsWrapper>
                    <div>Select Players</div>
                </StyledItemsWrapper>
                <StyledItemsWrapper>
                    <ToggleButton active={players === 1} >
                        1
                    </ToggleButton>
                    <ToggleButton active={players === 2}>
                        2
                    </ToggleButton>
                    <ToggleButton active={players === 3}>
                        3
                    </ToggleButton>
                    <ToggleButton active={players === 3}>
                        4
                    </ToggleButton>
                </StyledItemsWrapper>
                <StyledItemsWrapper>
                    <div>Grid Size</div>
                </StyledItemsWrapper>
                <StyledItemsWrapper>
                    <ToggleButton active={gridSize === 4} onClick={() => changeGridSize(4)}>
                        4 x 4
                    </ToggleButton>
                    <ToggleButton active={gridSize === 6} onClick={() => changeGridSize(6)}>
                        6 x 6
                    </ToggleButton>
                </StyledItemsWrapper>
                <StyledYellowButton onClick={() => startGame(true)}>
                    Start
                </StyledYellowButton>
            </StyledThemeSelector>
        </StyledThemeSelectorWrapper>
    );
};

export default ThemeSelector;
