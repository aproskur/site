import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Card from "./Card";
import { faStar, faHeart, faApple, faPoo, faHippo, faMoon, faHouse, faCar } from '@fortawesome/free-solid-svg-icons';


const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh; 
`;

const BoardContainer = styled.div
    .withConfig({ shouldForwardProp: (prop) => prop !== "columns" })`
    display: grid;
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
    gap: 8px;
  `;

const CenteredBoardContainer = styled(BoardContainer)`
  max-width: 600px; 
`;

const GameBoard = ({ size, theme }) => {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [isChecking, setIsChecking] = useState(false);
    const [numbersArray, setNumbersArray] = useState([]);


    const iconsArray = [faStar, faHeart, faApple, faPoo, faHippo, faMoon, faHouse, faCar];

    useEffect(() => {
        // Generate an array of shuffled pairs of numbers
        const generatedNumbersArray = generateNumbersArray();
        setNumbersArray(generatedNumbersArray);
    }, [size]);

    useEffect(() => {
        // Check for a match when two cards are flipped
        if (flippedCards.length === 2) {
            setIsChecking(true);

            setTimeout(() => {
                checkForMatch();
                setIsChecking(false);
            }, 1000); // Adjust the delay as needed
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

    const checkForMatch = () => {
        const [firstIndex, secondIndex] = flippedCards;

        if (numbersArray[firstIndex] === numbersArray[secondIndex]) {
            setMatchedPairs((prevMatchedPairs) => [
                ...prevMatchedPairs,
                numbersArray[firstIndex],
            ]);
        }

        // Reset the flipped cards array
        setFlippedCards([]);
    };

    // Function to generate an array of pairs of numbers based on the size of the board
    const generateNumbersArray = () => {
        const totalPairs = (size * size) / 2;
        // Creating an array of pairs of numbers from 1 to totalPairs
        const pairsArray = Array.from({ length: totalPairs }, (_, index) => index + 1);
        console.log("GameBoard, pairs array", pairsArray);
        // Duplicate the pairs to create the full array of numbers
        const numbersArray = [...pairsArray, ...pairsArray];
        // Shuffle the array to randomize the placement of numbers on the board
        return shuffleArray(numbersArray);
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
        // Map over the numbers array and create a Card component for each number
        return numbersArray.map((number, index) => (
            <Card
                key={index}
                content={theme === 'Icons' ? <FontAwesomeIcon icon={content} /> : content}
                isFlipped={flippedCards.includes(index) || matchedPairs.includes(number)}
                isIdle={matchedPairs.includes(number)}
                onClick={() => handleCardClick(index, number)}
            />
        ));
    };

    // Render the game board container with columns set based on the size prop
    return (
        <CenteredContainer>
            <CenteredBoardContainer columns={size}>{renderBoard()}</CenteredBoardContainer>
        </CenteredContainer>
    );
};

export default GameBoard;
