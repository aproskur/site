'use client'
import styled from 'styled-components';
import TabbedContainer from './TabbedContainer'

// Styled components

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
`;

const PortfolioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;  
  margin-bottom: 3em;
 
`;

const ProjectCard = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin: 20px;
  width: 300px;
  overflow: hidden;
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
    color: #0066cc; /* Link color */
    text-decoration: none; /* Removes underline */
    transition: color 0.3s, text-decoration 0.3s; /* Smooth transition for hover effects */
}

a:hover, a:focus {
    color: #004499; /* Darker shade on hover */
    text-decoration: underline; /* Underline on hover */
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

                                    <ProjectImage src="./images/ludesign-portfolio.jpg" alt="Project Screenshot" />

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




        </SuperContainer>
    );
};

export default Portfolio;