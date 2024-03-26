import React from 'react';
import styled from 'styled-components';


const StyledToggleButton = styled.button`
background-color: ${(props) => (props.$active ? 'var(--dark)' : 'var(--idle)')};
font-family: "Atkinson Hyperlegible", sans-serif;
color: white;
font-weight: 700;
text-transform: capitalize;
border: none;
border-radius: 20px;
padding: .5em 2em;
font-size: 1em;
cursor: pointer;
transition: background-color 0.3s;
flex-grow: 1;
flex-shrink: 1;

  &:hover {
    background-color: ${(props) => (props.$active ? 'var(--hover)' : 'var(--idle)')};
}

  &:disabled {
    cursor: default;
    opacity: 0.7;
}

@media (max-width: 768px) {
  padding: 0.5em 1.5em; 
  font-size: 0.8em;
}
`;


const ToggleButton = ({ active, children, ...props }) => {
  return (
    <StyledToggleButton $active={active} {...props}>
      {children}
    </StyledToggleButton>
  );
};

export default ToggleButton;
