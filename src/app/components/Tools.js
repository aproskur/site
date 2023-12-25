'use client'
import React from 'react';
import styled from 'styled-components';


const ToolsContainer = styled.div`
    background: rgb(44, 62, 80);
    display: flex;
    flex-direction: column;
    justify-content: center; 
    padding-bottom: 3em;
    padding-top:1em;

    h2 {
        padding: 1em;
        text-align: center;
    }
`;

const IconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-self: center;
  justify-content: center;
  background: inherit; 
  gap: 5em;
  width: 80%;
`;

const Icon = styled.i`
  font-size: 5rem;
  &:hover {
    
  }
`;

const Tools = () => {
    return (
        <ToolsContainer>
            <h2>Tools & Experience</h2>
            <IconsContainer>
                <Icon className="devicon-html5-plain"></Icon>
                <Icon className="devicon-css3-plain"></Icon>
                <Icon className="devicon-javascript-plain"></Icon>
                <Icon className="devicon-react-original"></Icon>
                <Icon className="devicon-mysql-plain"></Icon>
                <Icon className="devicon-linux-plain"></Icon>
                <Icon className="devicon-github-original"></Icon>
                <Icon className="devicon-wordpress-plain"></Icon>
                <Icon className="devicon-tailwindcss-plain"></Icon>
                <Icon className="devicon-bootstrap-plain"></Icon>
                <Icon className="devicon-php-plain"></Icon>
                <Icon className="devicon-laravel-plain"></Icon>
            </IconsContainer>
        </ToolsContainer>
    );
};

export default Tools;
