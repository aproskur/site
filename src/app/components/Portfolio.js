
'use client'
import styled from 'styled-components';
import TabbedContainer from './TabbedContainer'


const SuperContainer = styled.div` 
background: url('./images/watercolor.png');
background-repeat: repeat; 
background-size: cover;

h2 {
    font-size: 3rem;
    padding: 1em;
    text-align: center;
    color: rgb(var(--clr-gold));
}`

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

const ProjectImageContainer = styled.div`
    width: 50%;
    height: 50vh;
    margin-top: 2em;
    overflow-y: scroll;

`;


const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
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
a:hover, a:focus {
    color: #004499; 
    text-decoration: underline; 
}


`;

const ProjectTitle = styled.h3`
  color: #333;
`;

const ProjectDescription = styled.p`
  color: #333;
`;

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
                                name: 'Main Page', content:

                                    <ProjectImage src="./images/ludesign.png" alt="Project Screenshot" />

                            },
                            {
                                name: 'Portfolio Page', content:

                                    <ProjectImage src="./images/ludesign-portfolio-2.jpg" alt="Project Screenshot" />

                            },
                            {
                                name: 'Approach', content:

                                    <ProjectInfo>
                                        <p>The website <a href='https://ludesign.info'>ludesign.info</a> showcases the work of Ludmila Stepashina, a talented designer and illustrator. This site serves as a professional portfolio highlighting her skills and projects.</p>

                                        <p>Built with HTML, CSS, and JavaScript, and utilizing Bootstrap for responsive design, the website offers a clean, modern look and a user-friendly experience. Its layout is intuitive, making it easy for visitors to navigate and explore Ludmila's work.</p>

                                        <p>The use of high-quality images effectively showcases her portfolio, highlighting the range and depth of her design capabilities. The overall design, including the color scheme and typography, aligns seamlessly with her professional branding and style.</p>
                                    </ProjectInfo>

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
                                name: 'Main Page', content:

                                    <ProjectImage src="./images/sozo-main.jpg" alt="Project Screenshot" />

                            },
                            {
                                name: 'Portfolio Page', content:

                                    <ProjectImage src="./images/sozo-portfolio.jpg" alt="Project Screenshot" />

                            },
                            {
                                name: 'Approach', content:

                                    <ProjectInfo>
                                        <p>The website <a href="https://sozodesign.ru">sozodesign.ru</a> is a well-crafted WordPress site, customized to showcase design and interior decoration services. It features an aesthetically pleasing and modern design, enhanced by HTML, CSS, JavaScript, and PHP.</p>

                                        <p>With its responsive layout, the site ensures seamless navigation and viewing on various devices. JavaScript enhancements provide advanced user interaction, while PHP customizations contribute to dynamic content functionality, demonstrating a harmonious blend of design and technical expertise in web development.</p>

                                    </ProjectInfo>

                            },
                        ]}
                    />
                </PortfolioItemWrapper>
                <ProjectCard>
                    <ProjectTitle>Portfolio</ProjectTitle>
                    <ProjectDescription>
                        Wordpress, Customization, CSS, JavaScript, PHP
                    </ProjectDescription>
                </ProjectCard>
            </PortfolioContainer>
            <PortfolioContainer>
                <PortfolioItemWrapper>
                    <TabbedContainer
                        tabs={[
                            {
                                name: 'Main Page', content:

                                    <ProjectImage src="./images/artinspiration.png" alt="Project Screenshot" />

                            },
                            {
                                name: 'Portfolio Page', content:

                                    <ProjectImage src="./images/artinspiration-picture-page.jpg" alt="Project Screenshot" />

                            },
                            {
                                name: 'Approach', content:

                                    <ProjectInfo>
                                        <p>The website <a href="https://www.art-inspiration.ch">www.art-inspiration.ch</a> represents a custom adaptation of a WordPress theme, designed to create a unique and artistic online gallery. It incorporates interactive elements through custom JavaScript, adding depth to the user experience.</p>

                                        <p>Offering a distinctive approach to layout and design, the site effectively showcases art pieces, leveraging a responsive framework for seamless viewing on various devices. This project is a testament to the fusion of creative design and interactive web technologies.</p>
                                    </ProjectInfo>

                            },
                        ]}
                    />
                </PortfolioItemWrapper>
                <ProjectCard>
                    <ProjectTitle>Portfolio</ProjectTitle>
                    <ProjectDescription>
                        Wordpress, CSS, JavaScript
                    </ProjectDescription>
                </ProjectCard>
            </PortfolioContainer>
            <PortfolioContainer>
                <PortfolioItemWrapper>
                    <TabbedContainer
                        tabs={[
                            {
                                name: 'Main Page', content:

                                    <ProjectImage src="./images/anna-webdev-main-page.png" alt="Project Screenshot" />

                            },
                            {
                                name: 'A game', content:

                                    <ProjectImage src="./images/anna-webdev-game.png" alt="Project Screenshot" />

                            },
                            {
                                name: 'Approach', content:

                                    <ProjectInfo>
                                        <p>The website I created for myself <a href='https://annawedev.pro'>annawebdev.pro</a>. This website is where my coding adventures unfold.</p>

                                        <p>Crafted it with React and styled using Styled Components</p>

                                        <p>Explore my projects, each a labor of passion and a testament to my skills in web development.</p>

                                        <p>But it's not all serious business here! Have some fun with <a href="https://annawebdev.pro/game">Memo game</a>, a quirky addition to spice things up. </p>

                                        <p>Responsive, intuitive, and a dash of personality – that's the essence of my site.</p>
                                    </ProjectInfo>

                            },
                        ]}
                    />
                </PortfolioItemWrapper>
                <ProjectCard>
                    <ProjectTitle>Portfolio</ProjectTitle>
                    <ProjectDescription>
                        React.js, styled components
                    </ProjectDescription>
                </ProjectCard>
            </PortfolioContainer>




        </SuperContainer>
    );
};

export default Portfolio;
