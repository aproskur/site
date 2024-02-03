import React from "react";
import styled from "styled-components";

const InfoItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  background-color: #DFE7EC;
  padding: 0.75em 0.75em;
  border-radius: 10px;
  padding: 1.5em 1.25em;
`;

const Label = styled.div`
  font-weight: bold;
  color: #7191A5;
  margin-right: 18px;
`;

const Value = styled.div`
  font-size: 32px;
  color: #7191A5;
`;

const InfoItem = ({ label, value }) => (
  <InfoItemContainer>
    <Label>{label}</Label>
    <Value>{value}</Value>
  </InfoItemContainer>
);

export default InfoItem;

