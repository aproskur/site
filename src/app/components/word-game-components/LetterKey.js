'use client'
import React from 'react';
import { useWordGame } from '../../context/WordGameContext'; // Adjust the import path as needed
import styled from 'styled-components';

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

  &:disabled {
    cursor: not-allowed;
    outline: 1px solid rgb(var(--blue));

  }

  &:focus {
    outline: 2px solid rgb(var(--blue));
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

export default LetterKey;
