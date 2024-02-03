import React from "react";
import styled from "styled-components";

const InfoItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  background-color: ${(props) => props.highlight ? 'var(--accent-yellow)' : '#DFE7EC'}; // Conditional background color
  padding: 0.75em 0.75em;
  border-radius: 10px;
  padding: 1.5em 1.25em;
`;

const Label = styled.div`
  font-weight: bold;
  color: ${(props) => props.highlight ? '#ffffff' : '#7191A5'}; 
  margin-right: 18px;
`;

const Value = styled.div`
  font-size: 32px;
  color: ${(props) => props.highlight ? '#ffffff' : '#7191A5'}; 
`;

const InfoItem = ({ label, value, highlight = false }) => (
  <InfoItemContainer highlight={highlight}>
    <Label highlight={highlight}>{label}</Label>
    <Value highlight={highlight}>{value}</Value>
  </InfoItemContainer>
);

export default InfoItem;

