import React, { useEffect, useId, useRef, useState } from 'react';
import styled from 'styled-components';

const TabWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid transparent;
`;

const TabButton = styled.button`
  border: 1px solid #ddd;
  border-bottom: none;
  padding: 10px 20px;
  cursor: pointer;
  border-top-left-radius: 10px;
  border-top-right-radius: 3px;
          font-family: ${(props) =>
    props.$locale === 'ru' ? 'var(--font-exo2), Arial, sans-serif' : 'var(--font-rajdhani), Arial, sans-serif'};

  background: var(--bgr-gradient);
  color: rgb(var(--clr-white));

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #007bff;
  }

     @media (max-width: 768px) {
    flex: 1;
  }

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
            font-family: ${(props) =>
    props.$locale === 'ru' ? 'var(--font-exo2), Arial, sans-serif' : 'var(--font-poppins), Arial, sans-serif'};


    @media (max-width: 768px) {
    height: 60vh; 
    font-size: 1rem;
  }
`;

const TabbedContainer = ({ tabs = [] }) => {
  const [activeTab, setActiveTab] = useState(() => {
    return tabs.length > 0 ? tabs[0].name : ""; // Prevents selecting a missing tab
  });
  const tabRefs = useRef([]);
  const baseId = useId();

  useEffect(() => {
    if (tabs.length === 0) return;
    if (!tabs.find(tab => tab.name === activeTab)) {
      setActiveTab(tabs[0].name);
    }
  }, [tabs, activeTab]);

  useEffect(() => {
    tabRefs.current = tabs.map((_, index) => tabRefs.current[index] || null);
  }, [tabs]);





  useEffect(() => {
    const currentIndex = tabs.findIndex(tab => tab.name === activeTab);
    if (currentIndex !== -1) {
      tabRefs.current[currentIndex]?.focus();
    }
  }, [activeTab, tabs]);

  const handleKeyDown = (e, index) => {
    const currentIndex = index;
    let newIndex = currentIndex;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tabs[currentIndex].name);
      return;
    } else {
      return;
    }

    setActiveTab(tabs[newIndex].name);
  };

  if (!tabs || tabs.length === 0) {
    return <div>No tabs available</div>; // Handles the case where tabs is empty
  }

  const getTabId = (index) => `${baseId}-tab-${index}`;
  const getPanelId = (index) => `${baseId}-panel-${index}`;

  const activeIndex = tabs.findIndex(tab => tab.name === activeTab);
  const activeTabData = activeIndex !== -1 ? tabs[activeIndex] : null;
  const panelId = activeIndex !== -1 ? getPanelId(activeIndex) : undefined;
  const activeTabId = activeIndex !== -1 ? getTabId(activeIndex) : undefined;

  return (



    <div>
      <TabWrapper role="tablist">
        {tabs.map((tab, index) => (
          <TabButton
            key={tab.name}
            type="button"
            id={getTabId(index)}
            aria-controls={getPanelId(index)}
            $active={index === activeIndex}
            onClick={() => setActiveTab(tab.name)}
            tabIndex={0}
            role="tab"
            aria-selected={index === activeIndex}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-label={`Tab for ${tab.name}`}
            ref={element => {
              tabRefs.current[index] = element;
            }}
          >
            {tab.name}
          </TabButton>
        ))}
      </TabWrapper>
      <TabContentContainer
        role="tabpanel"
        id={panelId}
        aria-labelledby={activeTabId}
      >
        {activeTabData?.content || (
          <p></p>
        )}
      </TabContentContainer>
    </div>
  );
};

export default TabbedContainer;
