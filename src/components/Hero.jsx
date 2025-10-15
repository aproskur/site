'use client'
import React from 'react'
import styled from 'styled-components'
import Button from './Button.jsx'
import { useTranslations, useLocale } from 'next-intl';


const HeroContainer = styled.div`
  display: flex;
  flex-direction: row;
font-size: ${(props) =>
        props.$locale === 'ru' ? '2rem' : '2.5rem'};

  align-items: center;
  height: 80%;
  padding: 1em;
  margin-top: 0.4em;

  @media (max-width: 1000px){
    flex-direction: column;
    padding: .35em;
}
`;

const HeroText = styled.div`
   
      line-height: ${(props) =>
        props.$locale === 'ru' ? '1.2' : '1.3'};
     font-family: ${(props) =>
        props.$locale === 'ru' ? 'var(--font-exo2), Arial, sans-serif' : 'var(--font-rajdhani), Arial, sans-serif'};
        
    h1,h2 {
        font-size: ${(props) =>
        props.$locale === 'ru' ? '2.75rem' : '3.5rem'};
        margin-bottom: 0.1em;

    }

    h2{
        margin-bottom: .75em;
        font-size: ${(props) =>
        props.$locale === 'ru' ? '2rem' : '2rem'};
        color: rgb(var(--clr-gold));
        text-transform: uppercase;
    }

    p {
        font-size: ${(props) =>
        props.$locale === 'ru' ? '1.35rem' : '1.5rem'};
     font-family: ${(props) =>
        props.$locale === 'ru' ? 'var(--font-exo2), Arial, sans-serif' : 'var(--font-rajdhani), Arial, sans-serif'};
        margin-bottom: 0.75em;
    }
    

    p:last-of-type {
        margin-bottom: 1em;
    }

    @media (max-width: 600px){
        h1 {
              font-size: ${(props) =>
        props.$locale === 'ru' ? '2rem' : '2.25rem'};
        }

        h2 {
        font-size: 1.75rem !important;
        }
    }


    @media (max-width: 1000px){
        width: 100%;
    }


    @media (max-width: 600px){
               button {
            display: block;
            margin: 0 auto; 
        }
            }


`;

const HeroImage = styled.div`
   width: 40%;

img {

   max-width: 100%;
    border-radius: 10px;  
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);  
    display: none;
  }

@media (max-width: 1000px){
    display: none;
}

`;


function Hero({ title, subtitle, p1 }) {

    const t = useTranslations('Homepage.hero');
    const locale = useLocale();

    const scrollToSection = (event, sectionId) => {
        event.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'auto' });
        }
    };

    return (
        <HeroContainer>
            <HeroText $locale={locale}>
                <h1>{title} </h1>
                <h2>{subtitle}</h2>
                <p> {p1}</p>
                <p>{t('p2-1')} <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>{t('span1')}</span> {t('p2-2')}</p>
                <p>  {t('p3-1')} <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>{t('span2')}</span> {t('p3-2')} <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>{t('span3')}</span>{t('p3-3')}</p>
                {locale === 'ru' && (
                    <p>{t('extraParagraphForRus')}</p>
                )}
                <p>{t('p4')}</p>
                <Button style={{ fontFamily: 'var(--font-poppins), Arial, sans-serif' }} onClick={(e) => scrollToSection(e, 'contact-anna')} aria-label="View contact section">{t('button')}</Button>
            </HeroText>
        </HeroContainer>
    );
}

export default Hero;
