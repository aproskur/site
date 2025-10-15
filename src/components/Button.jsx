import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for shine animation
const shine = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

const StyledButton = styled.button`
  font-size: 1.25rem;
  font-family: var(--font);
  padding: 1em 1.25em;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  position: relative;
  overflow: hidden;
  background:rgb(72, 170, 170);
  color: #fff;
  text-transform: uppercase;
  min-width: 5em;
    box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.4),
    0 0 15px rgba(72, 170, 170, 0.6);


  // Adding shine effect on hover
  &:hover::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%);
    animation: ${shine} 0.75s;
  }
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;


