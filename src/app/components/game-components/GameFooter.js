// Import necessary dependencies
import React from 'react';
import styled from 'styled-components';

// Styled components for the GameFooter
const FooterContainer = styled.footer`
  background-color: inherit;
  color: var(--dark);
  padding: 10px;
  text-align: center;
  font-size: 12px;
  margin-top: 2em;

  a {
    text-decoration: underline;
  }
`;

// GameFooter component
const GameFooter = () => {
    return (
        <FooterContainer>
            <p>this memo game creation was inspired by Frontend Mentor <a href="https://www.frontendmentor.io/challenges/memory-game-vse4WFPvM">challenge</a></p>
            <p>return to ANNA's <a href="/">HOME PAGE</a></p>
        </FooterContainer>
    );
};

export default GameFooter;
