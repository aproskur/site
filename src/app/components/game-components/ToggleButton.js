import React from 'react';
import styled from 'styled-components';

// Styled component for the button
const StyledToggleButton = styled.button`
background-color: ${(props) => (props.active ? 'var(--dark)' : 'var(--idle)')};
color: white;
font-weight: bold;
text-transform: capitalize;
border: none;
border-radius: 20px;
padding: .5em 3em;
font-size: 1em;
cursor: pointer;
transition: background-color 0.3s;
flex-grow: 1;

  &:hover {
    background-color: ${(props) => (props.active ? 'var(--hover)' : 'var(--idle)')};
}

  &:disabled {
    cursor: default ;
    opacity: 0.7;
}
`;


const ToggleButton = ({ active, children, ...props }) => {
  return (
    <StyledToggleButton active={active} {...props}>
      {children}
    </StyledToggleButton>
  );
};

export default ToggleButton;
