'use client';
import React from 'react';
import styled from 'styled-components';
import TabbedContainer from './TabbedContainer';
import NextImage from 'next/image';
import ludesignWebP from '../../../public/images/ludesign.webp';
import ludesignPortfolioWebP from '../../../public/images/ludesign-portfolio.webp';
import artWebP from '../../../public/images/artinspiration.webp';
import artPortfolioJPG from '../../../public/images/artinspiration-picture-page.jpg';
import sozoJPG from '../../../public/images/sozo-main.jpg';
import sozoPortfolioJPG from '../../../public/images/sozo-portfolio.jpg';
import webdevWebP from '../../../public/images/anna-webdev.webp';
import webdevGamePNG from '../../../public/images/website-game-pairs.png';

const SuperContainer = styled.div`
  background: url('./images/watercolor.png');
  background-repeat: repeat;
  background-size: cover;

  h2 {
    font-size: 3rem;
    margin-top: 1em;
    text-align: center;
    color: rgb(var(--clr-gold));
  }
`;

const PortfolioItemWrapper = styled.div`
  width: 50%;

  @media (max-width: 1200px) {
    width: 80%;
  }
`;

const PortfolioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3em;

  @media (max-width: 1200px) {
    flex-direction: column-reverse;
  }
`;

const ProjectCard = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin: 20px;
  width: 350px;
  overflow: hidden;

  @media (max-width: 1200px) {
    width: 80%;
    text-align: center;
  }
`;

const ProjectInfo = styled.div`
  width: 100%;
  height: 50vh;
  overflow: scroll;
  color: rgb(var(--clr-gray));
  background: rgb(var(--clr-subtle-gray));
  padding: 1.5em;

  p {
    line-height: 1.6;
    margin-bottom: 1em;
  }

  a {
    color: #0066cc;
    text-decoration: none;
    transition: color 0.3s, text-decoration 0.3s;

    &:hover,
    &:focus {
      color: #004499;
      text-decoration: underline;
    }
  }
`;

const ProjectTitle = styled.h3`
  color: #333;
`;

const ProjectDescription = styled.p`
  color: #333;
`;

// Simplified Image for portfolio
const PortfolioImage = ({ alt, src, width, height }) => {
    console.log(`Loading image: ${src}`); // Debugging log
    return <NextImage src={src} alt={alt} width={width} height={height} />;
};

// Portfolio component
const Portfolio = ({ id }) => {
    return (
        <SuperContainer id={id}>
            <h2>SOME WORKS</h2>
            <PortfolioContainer>
                <PortfolioItemWrapper>
                    <TabbedContainer
                        tabs={[
                            {
                                name: 'Main Page',
                                content: (
                                    <PortfolioImage
                                        src={ludesignWebP}
                                        alt="Project Screenshot"
                                        width={600}
                                    />
                                ),
                            },
                            {
                                name: 'Portfolio Page',
                                content: (
                                    <PortfolioImage
                                        src={ludesignPortfolioWebP}
                                        alt="Project Screenshot"
                                        width={600}
                                    />
                                ),
                            },
                            {
                                name: 'Approach',
                                content: (
                                    <ProjectInfo>
                                        <p>
                                            The website{' '}
                                            <a
                                                href="https://ludesign.info"
                                                rel="nofollow noopener noreferrer"
                                            >
                                                ludesign.info
                                            </a>{' '}
                                            showcases the work of Ludmila Stepashina, a talented
                                            designer and illustrator. This site serves as a
                                            professional portfolio highlighting her skills and
                                            projects.
                                        </p>
                                        <p>
                                            Built with HTML, CSS, and JavaScript, and utilizing
                                            Bootstrap for responsive design, the website offers a
                                            clean, modern look and a user-friendly experience. Its
                                            layout is intuitive, making it easy for visitors to
                                            navigate and explore Ludmila's work.
                                        </p>
                                        <p>
                                            The use of high-quality images effectively showcases her
                                            portfolio, highlighting the range and depth of her design
                                            capabilities. The overall design, including the color
                                            scheme and typography, aligns seamlessly with her
                                            professional branding and style.
                                        </p>
                                    </ProjectInfo>
                                ),
                            },
                        ]}
                    />
                </PortfolioItemWrapper>
                <ProjectCard>
                    <ProjectTitle>Portfolio</ProjectTitle>
                    <ProjectDescription>
                        HTML, CSS, JavaScript, Bootstrap
                    </ProjectDescription>
                </ProjectCard>
            </PortfolioContainer>
            <PortfolioContainer>
                <PortfolioItemWrapper>
                    <TabbedContainer
                        tabs={[
                            {
                                name: 'Main Page',
                                content: (
                                    <PortfolioImage
                                        src={sozoJPG}
                                        alt="Project Screenshot"
                                        width={600}
                                    />
                                ),
                            },
                            {
                                name: 'Portfolio Page',
                                content: (
                                    <PortfolioImage
                                        src={sozoPortfolioJPG}
                                        alt="Project Screenshot"
                                        width={600}
                                    />
                                ),
                            },
                            {
                                name: 'Approach',
                                content: (
                                    <ProjectInfo>
                                        <p>
                                            The website{' '}
                                            <a
                                                href="https://sozodesign.ru"
                                                rel="nofollow noopener noreferrer"
                                            >
                                                sozodesign.ru
                                            </a>{' '}
                                            is a well-crafted WordPress site, customized to showcase
                                            design and interior decoration services. It features an
                                            aesthetically pleasing and modern design, enhanced by
                                            HTML, CSS, JavaScript, and PHP.
                                        </p>
                                        <p>
                                            With its responsive layout, the site ensures seamless
                                            navigation and viewing on various devices. JavaScript
                                            enhancements provide advanced user interaction, while PHP
                                            customizations contribute to dynamic content
                                            functionality, demonstrating a harmonious blend of design
                                            and technical expertise in web development.
                                        </p>
                                    </ProjectInfo>
                                ),
                            },
                        ]}
                    />
                </PortfolioItemWrapper>
                <ProjectCard>
                    <ProjectTitle>Portfolio</ProjectTitle>
                    <ProjectDescription>
                        WordPress, Customization, CSS, JavaScript, PHP
                    </ProjectDescription>
                </ProjectCard>
            </PortfolioContainer>
            <PortfolioContainer>
                <PortfolioItemWrapper>
                    <TabbedContainer
                        tabs={[
                            {
                                name: 'Main Page',
                                content: (
                                    <PortfolioImage
                                        src={artWebP}
                                        alt="Project Screenshot"
                                        width={600}
                                    />
                                ),
                            },
                            {
                                name: 'Portfolio Page',
                                content: (
                                    <PortfolioImage
                                        src={artPortfolioJPG}
                                        alt="Project Screenshot"
                                        width={600}
                                    />
                                ),
                            },
                            {
                                name: 'Approach',
                                content: (
                                    <ProjectInfo>
                                        <p>
                                            The website{' '}
                                            <a
                                                href="https://www.art-inspiration.ch"
                                                rel="nofollow noopener noreferrer"
                                            >
                                                www.art-inspiration.ch
                                            </a>{' '}
                                            represents a custom adaptation of a WordPress theme,
                                            designed to create a unique and artistic online gallery.
                                            It incorporates interactive elements through custom
                                            JavaScript, adding depth to the user experience.
                                        </p>
                                        <p>
                                            Offering a distinctive approach to layout and design, the
                                            site effectively showcases art pieces, leveraging a
                                            responsive framework for seamless viewing on various
                                            devices. This project is a testament to the fusion of
                                            creative design and interactive web technologies.
                                        </p>
                                    </ProjectInfo>
                                ),
                            },
                        ]}
                    />
                </PortfolioItemWrapper>
                <ProjectCard>
                    <ProjectTitle>Portfolio</ProjectTitle>
                    <ProjectDescription>
                        WordPress, CSS, JavaScript
                    </ProjectDescription>
                </ProjectCard>
            </PortfolioContainer>
            <PortfolioContainer>
                <PortfolioItemWrapper>
                    <TabbedContainer
                        tabs={[
                            {
                                name: 'Main Page',
                                content: (
                                    <PortfolioImage
                                        src={webdevWebP}
                                        alt="Project Screenshot"
                                        width={600}
                                    />
                                ),
                            },
                            {
                                name: 'A game',
                                content: (
                                    <PortfolioImage
                                        src={webdevGamePNG}
                                        alt="Project Screenshot"
                                        width={600}
                                    />
                                ),
                            },
                            {
                                name: 'Approach',
                                content: (
                                    <ProjectInfo>
                                        <p>
                                            <a
                                                href="https://webdev-projects.example.com"
                                                rel="nofollow noopener noreferrer"
                                            >
                                                WebDev Projects
                                            </a>{' '}
                                            is a collection of web development projects demonstrating
                                            skills in HTML, CSS, JavaScript, and game development.
                                            Each project is designed with a focus on functionality,
                                            user experience, and coding best practices.
                                        </p>
                                        <p>
                                            The showcase includes various interactive applications,
                                            such as games developed using JavaScript, highlighting a
                                            blend of creativity and technical proficiency. These
                                            projects not only illustrate coding capabilities but also
                                            an understanding of interactive and engaging web content.
                                        </p>
                                    </ProjectInfo>
                                ),
                            },
                        ]}
                    />
                </PortfolioItemWrapper>
                <ProjectCard>
                    <ProjectTitle>Portfolio</ProjectTitle>
                    <ProjectDescription>
                        HTML, CSS, JavaScript, Game Development
                    </ProjectDescription>
                </ProjectCard>
            </PortfolioContainer>
        </SuperContainer>
    );
};

export default Portfolio;
