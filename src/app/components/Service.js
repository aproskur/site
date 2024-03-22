'use client'
import React from 'react';
import styled, { keyframes } from 'styled-components';
import Tools from './Tools'
import { useState } from 'react';


const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`
const ToggleOption = styled.div`
  cursor: pointer;
  padding: 5px;
  margin: 5px;
  border-bottom: ${({ $isActive }) => $isActive ? '1px solid rgb(var(--clr-torquoise));' : 'none'};
`;


const StyledService = styled.div`
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
    font-size: 3rem;
  }

  h3 {
    text-transform: uppercase;
    text-align: center;
    margin-top: .9em; 
    margin-bottom: .75em;  
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

  @media (max-width: 800px) {
    width: 90%;
  }
`;

const StyledShortDescription = styled.div`
display:flex;
padding-top: 3.5em;
padding-bottom: 3.5em;
@media (max-width: 635px) {
  flex-direction: column;
  align-items: center;

  strong {
    font-size: .75em;
  }
}
`

const Service = ({ id }) => {
  const [descriptionLength, setDescriptionLength] = useState('long');

  const longDescription = (
    <>
      <h3>Custom web development</h3>
      <p><strong>From Scratch to Excellence:</strong> I specialize in creating websites using HTML, CSS, and JavaScript, ensuring each site is tailored to your unique needs with custom functionalities.</p>
      <p><strong>React Development:</strong> I'm proficient in building dynamic, responsive websites using React framework, and I'm adept at working with other React-based frameworks.</p>
      <h3>Wordpress development</h3>
      <p><strong>Theme Customization & Development</strong> Whether you need to tweak an existing theme or create a new custom WordPress theme, I have the skills to deliver exactly what your brand requires.</p>
      <p><strong>Custom Plugin Development:</strong> I can develop bespoke WordPress plugins, enhancing your site's functionality with tailored PHP solutions.</p>
      <h3>CMS Flexibility</h3>
      <p><strong>Versatile CMS Expertise:</strong> If you prefer a different CMS, let's discuss it! I'm open to working with various CMS platforms to find the perfect fit for your project.</p>
      <h3>Website Migration</h3>
      <p><strong>Relocate your website to a new host:</strong> I can manage the migration process smoothly, ensuring your site's integrity and minimizing downtime.</p>
      <div style={{ marginBottom: '3em' }}>
        <h3>Comprehensive Care for Your Online Presence:</h3>
        <ul>
          <li><strong>Hosting & Server Management:</strong> Expert support with hosting and server settings to ensure your website's robust performance.</li>
          <li><strong>Troubleshooting:</strong> efficient troubleshooting to tackle any challenges.</li>
          <li><strong>Custom Script Creation:</strong> Tailored script development for unique website functionalities.</li>
          <li><strong>Database Management:</strong> Specialized in MySQL for robust database solutions.</li>
          <li><strong>Proactive Website Maintenance:</strong> Regular updates and maintenance for a seamless online experience.</li>
          <li><strong>Regular Backups & Recovery Solutions:</strong> Reliable backup systems and quick recovery processes to protect your digital assets.</li>
        </ul>
      </div>
    </>);

  const shortDescription = (
    <>
      <StyledShortDescription><p><strong>Efficient Web Development & Support: </strong></p> <p>&nbsp; I build and support websites</p></StyledShortDescription>
    </>

  );



  return (
    <>
      <StyledService id={id}>
        <StyledServiceContainer>
          <h2>WHAT I DO</h2>
          <ToggleContainer>
            <ToggleOption $isActive={descriptionLength === 'short'} onClick={() => setDescriptionLength('short')}>
              Short
            </ToggleOption>
            <span> | </span>
            <ToggleOption $isActive={descriptionLength === 'long'} onClick={() => setDescriptionLength('long')}>
              Long
            </ToggleOption>
          </ToggleContainer>
          {descriptionLength === 'short' ? shortDescription : longDescription}
        </StyledServiceContainer>
      </StyledService>
      <Tools />
      {/*descriptionLength === 'short' ? <Tools /> : null*/}
    </>
  );
};

export default Service;