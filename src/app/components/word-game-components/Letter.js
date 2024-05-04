'use client'
import React from 'react';
import styled from 'styled-components';
import { useWordGame } from '../../context/WordGameContext'; // Adjust the import path as needed

const StyledLetter = styled.span`
  width: 60px;
  height: 74px;
  border-radius: 24px;
  background-color: ${props => props.$isGuessed ? 'rgb(var(--blue))' : 'rgba(var(--dark-navy), 0.8)'};
  color: rgb(var(--white));
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  box-shadow: ${props => props.$isGuessed ? '0px 4px 6px rgba(var(--dark-navy), 0.8)' : '0px 4px 6px rgba(var(--dark-navy), 0.2)'};
`;

const Letter = ({ letterToGuess }) => {
    const { guessedLetters } = useWordGame();

    const isGuessed = guessedLetters.has(letterToGuess);

    return (
        <StyledLetter $isGuessed={isGuessed}>
            {isGuessed ? letterToGuess : ''}
        </StyledLetter>
    );
};

export default Letter;
