'use client'
import { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 150px;
`;

const Selected = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.5em 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

const OptionsList = styled.ul`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  max-height: 150px;
  z-index: 10;
`;

const OptionItem = styled.li`
  padding: 0.5em 1em;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

export default function CustomDropdown({ options, currentLocale, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (locale) => {
    setIsOpen(false);
    onSelect(locale);
  };

  return (
    <DropdownContainer>
      {/* Hidden input field to satisfy form requirements */}
      <input type="hidden" id="language" name="language" value={currentLocale} />

      <Selected id="language-selector" aria-haspopup="listbox" onClick={() => setIsOpen(!isOpen)}>
        {currentLocale.toUpperCase()}
      </Selected>

      {isOpen && (
        <OptionsList id="language-options" role="listbox" aria-labelledby="language-selector">
          {options.map((locale) => (
            <OptionItem
              id={`option-${locale}`}
              aria-selected={locale === currentLocale}
              key={locale}
              onClick={() => handleSelect(locale)}
            >
              {locale.toUpperCase()}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </DropdownContainer>
  );
}
