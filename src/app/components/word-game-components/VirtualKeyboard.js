'use client'
import React from 'react';
import styled from 'styled-components';
import LetterKey from './LetterKey';

const VirtualKeyboard = ({ onClick }) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const rowLength = Math.ceil(alphabet.length / 3);

    //Split the alphabet into three rows
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px; 
    grid-area: keyboard;
    margin-top: 1em;
`;

const Row = styled.div`
    display: flex;
    gap: 10px; 
`;

export default VirtualKeyboard;
