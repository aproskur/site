import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Tools from './Tools';
import { useTranslations, useLocale } from 'next-intl';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleOption = styled.div`
        font-family: ${(props) =>
    props.$locale === 'ru' ? 'var(--font-exo2), Arial, sans-serif' : 'var(--font-poppins), Arial, sans-serif'};
  cursor: pointer;
  padding: 5px;
  margin: 5px;
  border-bottom: ${({ $isActive }) =>
    $isActive ? '1px solid rgb(var(--clr-torquoise));' : 'none'};
`;

const StyledService = styled.div`
        font-family: ${(props) =>
    props.$locale === 'ru' ? 'var(--font-exo2), Arial, sans-serif' : 'var(--font-poppins), Arial, sans-serif'};

  padding: 20px 0px;
  background: rgb(var(--clr-gray));
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: #fff;
    margin-bottom: 15px;
    text-align: center;
    text-transform: uppercase;
font-size: ${(props) =>
    props.$locale === 'ru' ? '2.5rem' : '3rem'};
  }

    @media (max-width: 600px){

        h2 {
        font-size: 2rem !important;
        }
    }


  h3 {
    text-transform: uppercase;
    text-align: center;
    margin-top: 2em;
    margin-bottom: 0.5em;
  }

  p {
    color: #fff;
    line-height: 1.6;
  }

  strong {
    text-transform: uppercase;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    color: #fff;
    line-height: 1.6;
    padding: 0.5em 0;
    border-bottom: 1px solid rgba(var(--clr-white), 0.2);
  }
`;

const StyledServiceContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;
       font-family: ${(props) =>
    props.$locale === 'ru' ? 'var(--font-exo2), Arial, sans-serif' : 'var(--font-poppins), Arial, sans-serif'};


  @media (max-width: 800px) {
    width: 90%;
  }
`;

const StyledShortDescription = styled.div`
  display: flex;
  padding-top: 3.5em;
  padding-bottom: 3.5em;
         font-family: ${(props) =>
    props.$locale === 'ru' ? 'var(--font-exo2), Arial, sans-serif' : 'var(--font-poppins), Arial, sans-serif'};


  @media (max-width: 635px) {
    flex-direction: column;
    align-items: center;

    strong {
      font-size: 0.75em;
    }
  }
`;

const Service = ({ id }) => {

  const t = useTranslations('Homepage.service')
  const locale = useLocale();
  const [descriptionLength, setDescriptionLength] = useState('long');
  const shortOptionRef = useRef(null);
  const longOptionRef = useRef(null);


  useEffect(() => {
    // Set focus to the body when the component mounts
    document.body.focus();
  }, []); // Run this effect only once, when the component mounts

  const handleKeyDown = (event, option) => {
    if (event.key === 'Enter') {
      setDescriptionLength(option);
    }
  };

  const longDescription = (
    <>
      <h3>{t('service-1')}</h3>
      <p><strong>{t('service-1-caption-1')}</strong> {t('service-1-description-1')}</p>
      <p><strong>{t('service-1-caption-2')}</strong> {t('service-1-description-2')}</p>
      <h3>{t('service-2')}</h3>
      <p><strong>{t('service-2-caption-1')}</strong>{t('service-2-description-1')}</p>
      <p><strong>{t('service-2-caption-2')}</strong>{t('service-2-description-2')}</p>
      <h3>{t('service-3')}</h3>
      <p><strong>{t('service-3-caption-1')}</strong>{t('service-3-description-1')}</p>
      <h3>{t('service-4')}</h3>
      <p><strong>{t('service-4-caption-1')}</strong>{t('service-4-description-1')} </p>
      <div style={{ marginBottom: '3em' }}>
        <h3>{t('service-5')}</h3>
        <ul>
          <li><strong>{t('service-5-caption-1')}</strong> {t('service-5-description-1')}</li>
          <li><strong>{t('service-5-caption-2')}</strong> {t('service-5-description-2')}</li>
          <li><strong>{t('service-5-caption-3')}</strong> {t('service-5-description-3')}</li>
          <li><strong>{t('service-5-caption-4')}</strong> {t('service-5-description-4')}</li>
          <li><strong>{t('service-5-caption-5')}</strong> {t('service-5-description-5')}</li>
        </ul>
      </div>
    </>);

  const shortDescription = (
    <>
      <StyledShortDescription>
        <p>
          <strong>{t('short-desc-caption')}</strong>
        </p>
        <p>&nbsp;{t('short-desc-description')}</p>
      </StyledShortDescription>
    </>
  );

  return (
    <>
      <StyledService $locale={locale} id={id}>
        <StyledServiceContainer>
          <h2>{t('section-title')}</h2>
          <ToggleContainer>
            <ToggleOption
              role="button"
              $isActive={descriptionLength === 'short'}
              onClick={() => setDescriptionLength('short')}
              ref={shortOptionRef}
              tabIndex={0}
              onKeyDown={(event) => handleKeyDown(event, 'short')}
            >
              {t('short-desc')}
            </ToggleOption>
            <span> | </span>
            <ToggleOption
              role="button"
              $isActive={descriptionLength === 'long'}
              onClick={() => setDescriptionLength('long')}
              ref={longOptionRef}
              tabIndex={0}
              onKeyDown={(event) => handleKeyDown(event, 'long')}
            >
              {t('long-desc')}
            </ToggleOption>
          </ToggleContainer>
          {descriptionLength === 'short' ? shortDescription : longDescription}
        </StyledServiceContainer>
      </StyledService>
      <Tools />
    </>
  );
};

export default Service;
