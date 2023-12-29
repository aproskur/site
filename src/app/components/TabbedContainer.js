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
    outline: none;  // Remove default browser outline
    box-shadow: 0 0 0 2px #007bff;  // Add a custom focus style, like a blue outline
  }

  // Styles for the active tab
  ${({ $active }) =>
    $active &&
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


  //accessibility. Moving through tabs with keyboard
  const handleKeyDown = (e, tabName) => {
    const currentIndex = tabs.findIndex(tab => tab.name === activeTab);
    let newIndex = currentIndex;

    if (e.key === 'ArrowRight') {
      newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    } else if (e.key === 'ArrowLeft') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    } else if (e.key === 'Enter' || e.key === ' ') {
      setActiveTab(tabName);
      return;
    }

    setActiveTab(tabs[newIndex].name);
  };


  return (
    <div>
      <TabWrapper>
        {tabs.map(tab => (
          <TabButton
            key={tab.name}
            $active={tab.name === activeTab}
            onClick={() => setActiveTab(tab.name)}
            tabIndex="0"
            role="tab"
            aria-selected={tab.name === activeTab}
            onKeyDown={(e) => handleKeyDown(e, tab.name)}
            aria-label={`Tab for ${tab.name}`}
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

