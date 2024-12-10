'use client';
import React from 'react';
import styled from 'styled-components';
import TabbedContainer from './TabbedContainer';
import NextImage from 'next/image';
import ludesignWebP from '../../../public/images/ludesign.webp';
import ludesignMainMobile from '../../../public/images/ludesign-main-mobile.webp';
import blurredLudesignMobile from '../../../public/images/blurred-ludesign-main-mobile.webp';
import ludesignPortfolioWebP from '../../../public/images/ludesign-portfolio.webp';
import blurredLudesignPortfolio from '../../../public/images/blurred-ludesign-portfolio.webp';
import artWebP from '../../../public/images/artinspiration.webp';
import artMainMobile from '../../../public/images/artinspiration-main-mobile.webp';
import artPortfolioJPG from '../../../public/images/artinspiration-picture-page.jpg';
import artPortfolioUnitMobile from '../../../public/images/artinspiration-portfoliounit-mobile.webp';
import sozoJPG from '../../../public/images/sozo-main.jpg';
import sozoPortfolioJPG from '../../../public/images/sozo-portfolio.jpg';
import sozoMainMobile from '../../../public/images/sozo-main-mobile.webp';
import sozoPortfolioMobile from '../../../public/images/sozo-portfolio-mobile.webp';
import webdevWebP from '../../../public/images/anna-webdev.webp';
import webdevGamePNG from '../../../public/images/website-game-pairs.png';
import useMobile from '../hooks/useMobile';

const SuperContainer = styled.div`
  //background: url('./images/watercolor.png');
  background-color: rgb(230, 230, 230);
  background-repeat: repeat;
  background-size: contain;

  h2 {
    font-size: 3rem;
    margin-top: 1em;
    text-align: center;
    color: rgb(var(--clr-gold));
    margin-bottom: .75em;

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


const PortfolioImage = ({ alt, src, width, height, blurDataURL }) => {
    return <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL || undefined} />
};


const Portfolio = ({ id }) => {
    const isMobile = useMobile();

    return (
        <SuperContainer id={id}>
            <h2>SOME WORKS</h2>
            <PortfolioContainer>
                <PortfolioItemWrapper>
                    <TabbedContainer
                        tabs={[
                            {
                                name: 'Main Page',
                                content: isMobile ? (
                                    <PortfolioImage
                                        src={ludesignWebP}
                                        alt="Desktop Screenshot"
                                        width={300}
                                        blurDataURL='../../../public/images/ludesign-portfolio.webp'
                                    />
                                ) : (
                                    <PortfolioImage
                                        src={ludesignWebP}
                                        alt="Desktop Screenshot"
                                        width={650}
                                        blurDataURL='../../../public/images/ludesign-portfolio.webp'
                                    />
                                ),
                            },
                            {
                                name: isMobile ? 'XS' : 'Mobile',
                                content: isMobile ? (
                                    <PortfolioImage
                                        src={ludesignMainMobile}
                                        alt="Mobile Screenshot"
                                        width={300}
                                        blurDataURL='../../../public/images/blurred-ludesign-main-mobile.webp'
                                    />
                                ) : (
                                    <PortfolioImage
                                        src={ludesignMainMobile}
                                        alt="Desktop Screenshot"
                                        width={200}
                                        blurDataURL='../../../public/images/blurred-ludesign-main-mobile.webp'
                                    />
                                ),
                            },
                            {
                                name: 'Portfolio Page',
                                content: isMobile ? (
                                    <PortfolioImage
                                        src={ludesignPortfolioWebP}
                                        alt="Project Screenshot"
                                        width={300}
                                        blurDataURL='../../../public/images/ludesign-portfolio.webp'
                                    />
                                ) : (
                                    <PortfolioImage
                                        src={ludesignPortfolioWebP}
                                        alt="Project Screenshot"
                                        width={650}
                                        blurDataURL='../../../public/images/ludesign-portfolio.webp'
                                    />
                                ),
                            },
                            {
                                name: isMobile ? 'Way' : 'Approach',
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
                                content: isMobile ? (
                                    <PortfolioImage
                                        src={sozoJPG}
                                        alt="Project Screenshot"
                                        width={300}
                                    />
                                ) : (
                                    <PortfolioImage
                                        src={sozoJPG}
                                        alt="Project Screenshot"
                                        width={650}
                                    />
                                )
                            },
                            {
                                name: 'Portfolio Page',
                                content: isMobile ? (
                                    <PortfolioImage
                                        src={sozoPortfolioJPG}
                                        alt="Project Screenshot"
                                        width={300}
                                    />
                                ) : (
                                    <PortfolioImage
                                        src={sozoPortfolioJPG}
                                        alt="Project Screenshot"
                                        width={650}
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
                                content: isMobile ? (
                                    <PortfolioImage
                                        src={artWebP}
                                        alt="Project Screenshot"
                                        width={300}
                                    />
                                ) : (
                                    <PortfolioImage
                                        src={artWebP}
                                        alt="Project Screenshot"
                                        width={650}
                                    />
                                ),
                            },
                            {
                                name: 'Portfolio Page',
                                content: isMobile ? (
                                    <PortfolioImage
                                        src={artPortfolioJPG}
                                        alt="Project Screenshot"
                                        width={300}
                                    />
                                ) : (
                                    <PortfolioImage
                                        src={artPortfolioJPG}
                                        alt="Project Screenshot"
                                        width={650}
                                    />
                                )
                            },
                            {
                                name: 'Approach',
                                content: (
                                    <ProjectInfo>
                                        <p>
                                            The website art inspiration is an artist's portfolio
                                            represents a custom adaptation of a WordPress theme,
                                            designed to create an online gallery.
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
                                content: isMobile ? (
                                    <PortfolioImage
                                        src={webdevWebP}
                                        alt="Project Screenshot"
                                        width={300}
                                    />
                                ) : (
                                    <PortfolioImage
                                        src={webdevWebP}
                                        alt="Project Screenshot"
                                        width={650}
                                    />
                                ),
                            },
                            {
                                name: 'A game',
                                content: isMobile ? (
                                    <PortfolioImage
                                        src={webdevGamePNG}
                                        alt="Project Screenshot"
                                        width={300}
                                    />
                                ) : (
                                    <PortfolioImage
                                        src={webdevGamePNG}
                                        alt="Project Screenshot"
                                        width={650}
                                    />
                                ),
                            },
                            {
                                name: 'Approach',
                                content: (
                                    <ProjectInfo>
                                        <p>
                                            <a
                                                href="https://annawebdev.pro"
                                                rel="nofollow noopener noreferrer"
                                            >
                                                annawebdev.pro
                                            </a>{' '}
                                            This website is a personal portfolio for a freelance web developer offering a variety of web services.
                                            It demonstrates a collection of web development projects showcasing
                                            skills in HTML, CSS, JavaScript, React, Wordpress and game development.
                                            Each project is designed with a focus on functionality,
                                            user experience, and coding best practices.
                                        </p>
                                        <p>
                                            The website itself is build with React, using Styled Components,and implements
                                            some standard security features to ensure secure communication between the user and the website.
                                            This site is mobile and SEO-friendly.
                                            It includes a portfolio section, services overview, a contact form, and a fun section with a game, all crafted to highlight full-stack development skills while maintaining scalability for future growth.
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
