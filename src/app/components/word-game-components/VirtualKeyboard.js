'use client';

import React from 'react';
import styled from 'styled-components';
import { useWordGame } from '../../context/WordGameContext';

const StyledLetterKey = styled.button`
  width: 80px;
  height: 54px;
  border-radius: 24px;
  background-color: ${props => props.disabled ? 'rgba(var(--dark-navy), 0.8)' : '#fff'};
  color: rgb(var(--dark-navy));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border: none;
  cursor: pointer;
  font-family: inherit;
  box-sizing: border-box;

  &:disabled {
    cursor: not-allowed;
    outline: 1px solid rgb(var(--blue));
  }

  &:focus {
    outline: 2px solid rgb(var(--blue));
  }

  &:hover {
    color: #fff;
    background-color: rgb(var(--blue));
  }

  @media (max-width: 1025px) {
    width: 40px;
    height: 54px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 54px;
    border-radius: 10px;
  }


  @media (max-width: 375px) {
    width: 26px;
    height: 54px;
    border-radius: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  grid-area: keyboard;
  margin-top: 1em;


  @media (max-width: 480px) {
    margin-top: 5rem;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 1025px){
    justify-content: flex-start; 
    flex-wrap: wrap;
  }

`;

const LetterKey = ({ letter }) => {
    const { guessedLetters, addGuessedLetter } = useWordGame();

    const handleClick = () => {
        console.log(`Letter ${letter} clicked`);
        addGuessedLetter(letter);
    };

    const isGuessed = guessedLetters.has(letter);

    return (
        <StyledLetterKey onClick={handleClick} disabled={isGuessed}>
            {letter}
        </StyledLetterKey>
    );
};

const VirtualKeyboard = ({ onClick }) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const rowLength = Math.ceil(alphabet.length / 3);

    // Split the alphabet into three rows
    const rows = [
        alphabet.slice(0, rowLength),
        alphabet.slice(rowLength, rowLength * 2),
        alphabet.slice(rowLength * 2)
    ];

    return (
        <Container>
            {rows.map((row, index) => (
                <Row key={index}>
                    {row.split('').map(letter => (
                        <LetterKey key={letter} letter={letter} onClick={onClick} />
                    ))}
                </Row>
            ))}
        </Container>
    );
};

export default VirtualKeyboard;
