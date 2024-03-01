'use client'
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #555769; 
  color: rgb(var(--clr-torquoise));
  padding: 20px;
  text-align: center;
`;

const CopyrightText = styled.p`
  font-size: 14px;
`;

const SocialIcons = styled.div`
  margin-top: 20px;
`;

const SocialIcon = styled.a`
  font-size: 20px;
  margin: 0 10px;
  color: rgb(var(--clr-torquoise));
  text-decoration: none;

  &:hover {
    color: rgb(var(--clr-gold));
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <CopyrightText>&copy; {currentYear} ANNA WEBDEV</CopyrightText>
      <SocialIcons>
        <SocialIcon href="https://www.linkedin.com/in/anna-proskurina-b08337281/" className="fab fa-linkedin"></SocialIcon>
        <SocialIcon href="mailto:annapro.webdev@gmail.com" className="fa fa-envelope"></SocialIcon>
      </SocialIcons>
    </FooterContainer>
  );
};

export default Footer;
