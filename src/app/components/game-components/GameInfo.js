import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InfoItem from "./InfoItem";
import { useGameSettings } from "@/app/context/GameSettingsContext";

const GameInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1em;
  height: 15%;
`;


const GameInfo = ({ totalMoves, time, currentPlayerIndex }) => {

    const { formatTime, numPlayers, playerData } = useGameSettings();


    const renderOnePlayerInfo = () => {
        return (
            <>
                <InfoItem label="Time" value={formatTime(time)} />
                <InfoItem label="Moves" value={totalMoves} />
            </>
        )
    }

    const renderMultiPlayerInfo = () => (
        playerData.map((data, index) => (
            <div key={index}>
                <InfoItem
                    label={window.innerWidth > 768 ? `Player ${index + 1}` : `P${index + 1}`}
                    value={data.pairs}
                    highlight={index === currentPlayerIndex}
                    currentPlayer={index === currentPlayerIndex}

                />
            </div>
        ))
    );

    return (
        <GameInfoContainer>
            {numPlayers > 1 ? renderMultiPlayerInfo() : renderOnePlayerInfo()}
        </GameInfoContainer>
    );
};



export default GameInfo;
