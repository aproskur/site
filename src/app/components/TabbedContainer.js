import React, { useState } from 'react';
import styled from 'styled-components';

const TabWrapper = styled.div`
  display: flex;
  justify-content: left;
  border-bottom: 1px solid transparent; 
`;
const TabButton = styled.button`
  border: 1px solid #ddd;
  border-bottom: none; // Remove bottom border to blend with the content
  padding: 10px 20px;
  cursor: pointer;
  border-top-left-radius: 10px; // Rounded corners for the top
  border-top-right-radius: 3px;
  font-family: var(--font-text);
  background: var(--bgr-gradient);
  color: rgb(var(--clr-white));

  &:focus {
    outline: none;
  }

  // Styles for the active tab
  ${({ active }) =>
    active &&
    `
    background: inherit;
    border-color: #bbb;
    color: rgb(var(--clr-gray));
  `}
`;

const TabContentContainer = styled.div`
height: 50vh;
overflow-y: scroll;
`;


const TabbedContainer = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <div>
      <TabWrapper>
        {tabs.map(tab => (
          <TabButton
            key={tab.name}
            active={tab.name === activeTab}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </TabButton>
        ))}
      </TabWrapper>
      <TabContentContainer>
        {tabs.find(tab => tab.name === activeTab)?.content}
      </TabContentContainer>
    </div>
  );
};

export default TabbedContainer;

