'use client'
import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

function EmailIcon() {
  return (
    <a
      href="mailto:annapro.webdev@gmail.com"
      aria-label="Email Anna"
    >
      <FontAwesomeIcon icon={faEnvelope} size="1x" />
      <SrOnly>Email Anna</SrOnly>
    </a>
  )
}

function LinkedInIcon() {
  return (
    <div>
      <a
        href="https://www.linkedin.com/in/anna-proskurina-b08337281/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
      >
        <FontAwesomeIcon icon={faLinkedin} size="1x" />
      </a>
    </div>
  )
}

const FooterContainer = styled.footer`
  background-color: rgb(var(--clr-gray)); 
  color: rgb(var(--clr-torquoise));
  padding: 20px;
  text-align: center;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.2);
`;

const CopyrightText = styled.p`
  font-size: 14px;
`;

const SocialIcons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const SocialIcon = styled.div`
  font-size: 20px;
  margin: 0 10px;
  color: rgb(var(--clr-torquoise));
  text-decoration: none;

  &:hover {
    color: rgb(var(--clr-gold));
  }
`;

const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <CopyrightText>&copy; {currentYear} ANNA WEBDEV</CopyrightText>
      <SocialIcons>
        <SocialIcon><LinkedInIcon /></SocialIcon>
        <SocialIcon><EmailIcon /></SocialIcon>
      </SocialIcons>
    </FooterContainer>
  );
};

export default Footer;
