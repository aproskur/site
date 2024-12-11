'use client'
import React, { useState } from 'react';
import { WordGameProvider, useWordGame } from '../../../context/WordGameContext';
import styles from './WordGamePage.module.css';
import styled from 'styled-components';
import WordGame from "../../../components/word-game-components/WordGame"




const StyledLetterContainer = styled.div`
  grid-area: word;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

export default function WordGamePage() {

    return (
        <WordGameProvider>
            <WordGame />
        </WordGameProvider>
    );
}
