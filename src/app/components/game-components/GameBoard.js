import React, { useState, useEffect } from "react";
import { useGameSettings } from '../../context/GameSettingsContext';
import styled, { css } from "styled-components";
import Card from "./Card";
import GameInfo from "./GameInfo";
import GameHeader from './GameHeader'
import ToggleButton from "./ToggleButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faAppleWhole, faPoo, faRecycle, faMoon, faHouse, faCar, faSun, faBug, faSnowflake, faFutbol, faFish, faBath, faDumpster, faTrashCan, faSackDollar, faSocks } from '@fortawesome/free-solid-svg-icons';


const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  
  @media (max-width: 900px){
    justify-content: flex-start;
    gap: 2.5em;
}
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 500px) {
    

  }
  `;

const BoardContainer = styled.div
    .withConfig({ shouldForwardProp: (prop) => prop !== "columns" })`
    display: grid;
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
    gap: 8px;
    @media (max-width: 400px) {
        width: 98%;
        justify-content: center;
        padding: .75em;
      }
    
  `;

const CenteredBoardContainer = styled(BoardContainer)`
  max-width: 600px; 
  @media (max-width: 400px) {
    width: 100%;
    justify-content: center;
    gap: 1px;
  }
`;

const GameInfoContainer = styled.div`   
display: flex;
justify-content: center; 
align-items: center;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const PopupBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const PopupContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 11;

  p {
    color: rgba(48, 72, 89, 0.8);
    text-align: center;
  }

  h2 {
    text-transform: none;
    font-size: 33px;
    text-align: center;
  }

  > * {
    margin-bottom: 10px; 
  }
`;


const StyledResult = styled.div`
    padding: 1em;
    background-color: ${(props) => props.winner ? 'rgba(21, 41, 56, .9)' : 'rgb(var(--greyish-blue), .5)'};
    border-radius: 5px;
    display: flex;
    justify-content: space-between;

    p {
        color:${(props) => props.winner ? '#ffffff' : 'rgba(48, 72, 89, 0.8)'};
    }

    span {
        color:${(props) => props.winner ? '#ffffff' : 'rgba(48, 72, 89)'};
    }
`;

const StyledYellowButton = styled(ToggleButton)`
    background-color: var(--accent-yellow);
     
    &:hover {
        background-color: rgba(253, 162, 20, 0.8);
    }
  `;


const ButtonsFlexContainer = styled.div`
  display: flex;
  gap: 1em;
  `;

const StyledGameButton = styled(ToggleButton)`
    color: var(--dark);
`



const GameEndPopup = ({ totalTime, totalMoves, onRestart, onNewGame }) => {
    const { formatTime, playerData, resetPlayerData } = useGameSettings();
    const isMultiplayer = playerData && playerData.length > 1;

    // Sort players by the number of pairs found
    let sortedPlayers = [...playerData].sort((a, b) => b.pairs - a.pairs);

    // Determine the highest number of pairs found
    const highestPairs = sortedPlayers.length > 0 ? sortedPlayers[0].pairs : 0;

    // Identify all players who have matched the highest number of pairs
    const topPlayers = sortedPlayers.filter(player => player.pairs === highestPairs);

    let titleMessage = "Game Over!"; // Default message
    if (isMultiplayer) {
        if (topPlayers.length > 1) {
            // If more than one player has the top number of pairs, it's a tie
            titleMessage = "It's a tie!";
        } else {
            // Single top player
            titleMessage = `${topPlayers[0].id} Wins!`;
        }
    } else {
        titleMessage = "You did it!"; // Message for single player
    }

    return (
        <PopupContainer>
            <PopupContent>
                <h2>{titleMessage}</h2>
                {isMultiplayer ? (
                    <>
                        <p>Here are the results...</p>
                        {sortedPlayers.map((player) => (
                            <StyledResult key={player.id}
                                winner={topPlayers.find(winner => winner.id === player.id) !== undefined}>
                                <p>{player.id}{topPlayers.find(winner => winner.id === player.id) ? " (winner)" : ""}:</p>
                                <span>{player.pairs} Pairs</span>
                            </StyledResult>
                        ))}
                    </>
                ) : (
                    <>
                        <p>Here is what you got...</p>
                        <StyledResult>
                            <p>Time Elapsed:</p>
                            <span>{formatTime(totalTime)}</span>
                        </StyledResult>
                        <StyledResult>
                            <p>Moves Taken:</p>
                            <span>{totalMoves} Moves</span>
                        </StyledResult>
                    </>
                )}
                <ButtonsFlexContainer>
                    <StyledYellowButton onClick={onRestart}>Restart</StyledYellowButton>
                    <StyledGameButton onClick={onNewGame}>Setup New Game</StyledGameButton>
                </ButtonsFlexContainer>
            </PopupContent>
            <PopupBackground />
        </PopupContainer>
    );
};









const GameBoard = ({ size, theme }) => {

    const { startGame, updatePairsCount, numPlayers, playerData, resetPlayerData } = useGameSettings();

    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [isChecking, setIsChecking] = useState(false);
    const [contentArray, setContentArray] = useState([]);
    const [movesCounter, setMovesCounter] = useState(0);
    const [time, setTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(0);

    useEffect(() => {
        const generatedContentArray = generateContentArray();
        setContentArray(generatedContentArray);
    }, [size, theme]);

    useEffect(() => {
        if (matchedPairs.length === (size * size) / 2) {
            setGameOver(true);
        }
    }, [matchedPairs]);


    useEffect(() => {
        let timer;
        if (!gameOver && !isPaused) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }

        // Cleanup the interval on component unmount or when the game ends
        return () => clearInterval(timer);
    }, [gameOver, isPaused]);

    const pauseTimer = () => {
        setIsPaused(!isPaused);
        console.log("Is Paused:", !isPaused);
    };

    const resumeTimer = () => {
        setIsPaused(false);
    };


    useEffect(() => {
        // Check for a match when two cards are flipped and count moves
        if (flippedCards.length === 2) {
            setIsChecking(true);
            setMovesCounter(prevCount => prevCount + 1);

            setTimeout(() => {
                checkForMatch();
                setIsChecking(false);
            }, 1000);
        }
    }, [flippedCards]);


    const handleCardClick = (index, value) => {
        // Ignore clicks on already flipped or matched cards
        console.log("FROM handleCARDCLICK func: Card clicked", index, value);

        if (
            flippedCards.length === 2 ||
            flippedCards.includes(index) ||
            matchedPairs.includes(value)
        ) {

            return;
        }
        setFlippedCards((prevFlippedCards) => [...prevFlippedCards, index]);
    };

    //const handlePairFound = (playerIndex) => {
    // Assuming I have logic to determine the new pairs count
    // const newPairsCount = /* logic to determine new pairs count */;
    // updatePairsCount(playerIndex, newPairsCount);
    //};


    const checkForMatch = () => {
        const [firstIndex, secondIndex] = flippedCards;

        if (contentArray[firstIndex].id === contentArray[secondIndex].id) {
            setMatchedPairs(prevMatchedPairs => [
                ...prevMatchedPairs,
                contentArray[firstIndex].id,
            ]);

            // Increment pair count for the current player
            updatePairsCount(currentPlayer, playerData[currentPlayer].pairs + 1);

            // Do not change currentPlayer if a match is found
        } else {
            // Only change the currentPlayer if no match is found, and if there are more than one player
            if (numPlayers > 1) {
                setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % numPlayers);
            }
        }

        // Reset the flipped cards array after checking for a match or no match
        setFlippedCards([]);
    };


    // Function to generate an array of pairs of numbers based on the size of the board
    const generateContentArray = () => {
        let contentArray = [];
        const totalPairs = (size * size) / 2;

        if (theme === 'Icons') {
            const iconsArray = [faStar, faHeart, faAppleWhole, faPoo, faBath, faMoon, faHouse, faCar, faSun, faBug, faSnowflake, faFutbol, faFish, faRecycle, faDumpster, faTrashCan, faSackDollar, faSocks];
            const shuffledIcons = shuffleArray(iconsArray);
            const selectedIcons = shuffledIcons.slice(0, totalPairs);
            contentArray = selectedIcons.map((icon, index) => ({ id: `icon-${index}`, content: icon }));
        } else {
            // Numbers
            contentArray = Array.from({ length: totalPairs }, (_, index) => ({ id: index, content: index + 1 }));
        }

        return shuffleArray([...contentArray, ...contentArray]); // Duplicate and shuffle
    };


    // Function to shuffle the array using Fisher-Yates algorithm
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Function to render the game board based on the generated numbers array
    const renderBoard = () => {
        return contentArray.map((item, index) => (
            <Card
                key={index}
                content={theme === 'Icons' ? <FontAwesomeIcon icon={item.content} /> : item.content}
                isFlipped={flippedCards.includes(index) || matchedPairs.includes(item.id)}
                isIdle={matchedPairs.includes(item.id)}
                onClick={() => handleCardClick(index, item.id)}
            />
        ));
    };

    const restartGame = () => {
        setFlippedCards([]);
        setMatchedPairs([]);
        setIsChecking(false);
        setMovesCounter(0);
        setGameOver(false);
        setTime(0);
        setContentArray(generateContentArray());
        setCurrentPlayer(0);
        resetPlayerData();
    };



    // Render the game board container with columns set based on the size prop
    return (
        <StyledMainContainer>
            <GameHeader onRestart={restartGame} resumeTimer={resumeTimer} pauseTimer={pauseTimer} />
            <CenteredContainer>
                <CenteredBoardContainer columns={size}>{renderBoard()}</CenteredBoardContainer>
            </CenteredContainer>
            <GameInfoContainer>
                <GameInfo totalMoves={movesCounter}
                    time={time}
                    currentPlayerIndex={currentPlayer}>
                </GameInfo>
            </GameInfoContainer>
            {gameOver && (
                <GameEndPopup
                    totalTime={time}
                    totalMoves={movesCounter}
                    onRestart={restartGame}
                    onNewGame={() => startGame(false)}
                />
            )}
        </StyledMainContainer>
    );
};

export default GameBoard; 
