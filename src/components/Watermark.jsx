'use client'
import React from 'react';
import styled from 'styled-components';

const WatermarkContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 12%;
  left: 3%;
  z-index: 999;
  opacity: .7;
`;

const Word = styled.span`
  color: ${props => props.color};
  font-size: 1.25rem;
`

const Watermark = ({ words, colors }) => {
    return (
        <WatermarkContainer>
            {words.map((word, index) => (
                <Word key={index} color={colors[index % colors.length]}>
                    {word}{' '}
                </Word>
            ))}
        </WatermarkContainer>
    );
};

export default Watermark;