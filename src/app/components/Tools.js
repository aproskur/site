'use client'
import React from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip';


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

  @media (max-width: 800px) {
    width: 90%;
    gap: 3em;
  }
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
                <Tooltip text="HTML5">
                    <Icon className="devicon-html5-plain"></Icon>
                </Tooltip>
                <Tooltip text="CSS3">
                    <Icon className="devicon-css3-plain"></Icon>
                </Tooltip>
                <Tooltip text="JavaScript">
                    <Icon className="devicon-javascript-plain"></Icon>
                </Tooltip>
                <Tooltip text="React">
                    <Icon className="devicon-react-original"></Icon>
                </Tooltip>
                <Tooltip text="MySQL">
                    <Icon className="devicon-mysql-plain"></Icon>
                </Tooltip>
                <Tooltip text="Linux">
                    <Icon className="devicon-linux-plain"></Icon>
                </Tooltip>
                <Tooltip text="GitHub">
                    <Icon className="devicon-github-original"></Icon>
                </Tooltip>
                <Tooltip text="WordPress">
                    <Icon className="devicon-wordpress-plain"></Icon>
                </Tooltip>
                <Tooltip text="Tailwind CSS">
                    <Icon className="devicon-tailwindcss-plain"></Icon>
                </Tooltip>
                <Tooltip text="Bootstrap">
                    <Icon className="devicon-bootstrap-plain"></Icon>
                </Tooltip>
                <Tooltip text="PHP">
                    <Icon className="devicon-php-plain"></Icon>
                </Tooltip>
                <Tooltip text="Laravel">
                    <Icon className="devicon-laravel-plain"></Icon>
                </Tooltip>
            </IconsContainer>

        </ToolsContainer>
    );
};

export default Tools;
