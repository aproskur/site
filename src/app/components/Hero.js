'use client'
import React from 'react'
import styled from 'styled-components'
import Button from './Button.js'


const HeroContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 2.5rem;
  align-items: center;
  height: 80%;
  padding: 1em;
  margin-top: 0.4em;

  @media (max-width: 1000px){
    flex-direction: column;
}
`;

const HeroText = styled.div`
   
    line-height: 1.3;

    h1,h2 {
        font-size: 3.5rem;
        margin-bottom: 0.1em;
    }

    h3 {
        margin-bottom: .75em;
        font-size: 2rem;
        color: rgb(var(--clr-gold));
        text-transform: uppercase;
    }

    p {
        font-size: 1.5rem;
        font-family: var(--font-text);
        margin-bottom: 0.75em;
    }

    p:last-of-type {
        margin-bottom: 1em;
    }

    @media (max-width: 600px){
        h1,h2 {
            font-size: 2.25rem;
        }

        h3 {
            font-size: 1.75rem;
        p {
            font-size: 1.5rem;
        }
    }


    @media (max-width: 1000px){
        width: 100%;
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


function Hero() {

    const scrollToSection = (event, sectionId) => {
        event.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'auto' });
        }
    };

    return (
        <HeroContainer>
            <HeroText>
                <h1>WEB DEVELOPER </h1>
                <h3>Based in Cardiff, working worldwide</h3>
                <p> Hi, my name is Anna and I am a freelance web developer.</p>
                <p>Crafting engaging <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>websites</span> with a tech-savvy touch.</p>
                <p>  From <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>creation</span> to ongoing <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>support</span>, I'm here for your small business or collaborative team. </p>
                <p>Here coding meets creativity!</p>
                <Button onClick={(e) => scrollToSection(e, 'contact-anna')} aria-label="View contact section">Discuss a project</Button>
            </HeroText>
            <HeroImage>
                <img src='./images/work-hero-img-ai.png'></img>
            </HeroImage>
        </HeroContainer>
    );
}

export default Hero;