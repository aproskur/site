import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: inherit;
  color: var(--dark);
  padding: 1em;
  text-align: center;
  font-size: 12px;
  margin-top: 1em;
  

  a {
    text-decoration: underline;
  }
`;


const GameFooter = () => {
  return (
    <FooterContainer>
      <p>This memo game creation was inspired by Frontend Mentor <a href="https://www.frontendmentor.io/challenges/memory-game-vse4WFPvM" rel="nofollow noopener noreferrer">challenge</a>. Return to ANNA's <a href="/">HOME PAGE</a></p>
    </FooterContainer>
  );
};

export default GameFooter;
