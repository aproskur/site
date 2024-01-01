import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InfoItem from "./InfoItem";

const GameInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 450px; 
  margin-top: 2.5em;
  gap: 1em;
  height: 15%;
`;

const GameInfo = ({ totalMoves, time }) => {


    const handleCardClick = () => {
        // Increment the number of moves when a card is clicked
        setMoves((prevMoves) => prevMoves + 1);
    };

    return (
        <GameInfoContainer>
            <InfoItem label="Time" value={formatTime(time)} />
            <InfoItem label="Moves" value={totalMoves} />
        </GameInfoContainer>
    );
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

export default GameInfo;
