import React from "react";
import styled from "styled-components";

const InfoItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  background-color: ${(props) => props.$highlight ? 'var(--accent-yellow)' : '#DFE7EC'};
  border-radius: 10px;
  padding:  1em 0.75em;
  position: relative; 

  @media (max-width: 450px){
    flex-direction: column;
    justify-content: center;
    font-size: 18px;
  }

  ${(props) => props.$highlight && `
  ::before {
    content: '';
    position: absolute;
    top: -10px; // Position the triangle above the container
    left: 50%; // Center the triangle horizontally
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent; 
    border-right: 10px solid transparent; 
    border-bottom: 10px solid var(--accent-yellow); 
    z-index: 1; // Add z-index to ensure visibility
  }
`}
`;


const Label = styled.div`
  font-weight: bold;
  color: ${(props) => props.$highlight ? '#ffffff' : '#7191A5'}; 
  margin-right: 18px;

  @media (max-width: 450px){
    margin-right: 0; 
    text-align: center;
  }
`;

const Value = styled.div`
  font-size: 27px;
  color: ${(props) => props.$highlight ? '#ffffff' : '#7191A5'}; 
  @media (max-width: 450px){
    font-size: 25px;
  }
`;

const CurrentPlayer = styled.div`
font-size: 16px;
color: var(--dark);
text-transform: uppercase;
margin: 10px;
text-align: center;
letter-spacing: 2px;

@media (max-width:700px) {
  display: none;
}
`;

const InfoItem = ({ label, value, highlight = false, currentPlayer = false }) => (
  <div>
    <InfoItemContainer $highlight={highlight}>
      <Label $highlight={highlight}>{label}</Label>
      <Value $highlight={highlight}>{value}</Value>
    </InfoItemContainer>
    {currentPlayer && <CurrentPlayer>Current turn</CurrentPlayer>}
  </div>
);

export default InfoItem;


