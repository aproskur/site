'use client';
import React from 'react';
import styled from 'styled-components';
import TabbedContainer from './TabbedContainer';
import NextImage from 'next/image';
import ludesignWebP from '../../public/images/ludesign.webp';
import ludesignMainMobile from '../../public/images/ludesign-main-mobile.webp';
import blurredLudesignMobile from '../../public/images/blurred-ludesign-main-mobile.webp';
import ludesignPortfolioWebP from '../../public/images/ludesign-portfolio.webp';
import blurredLudesignPortfolio from '../../public/images/blurred-ludesign-portfolio.webp';
import artWebP from '../../public/images/artinspiration.webp';
import artMainMobile from '../../public/images/artinspiration-main-mobile.webp';
import artPortfolioJPG from '../../public/images/artinspiration-picture-page.jpg';
import artPortfolioUnitMobile from '../../public/images/artinspiration-portfoliounit-mobile.webp';
import sozoJPG from '../../public/images/sozo-main.jpg';
import sozoPortfolioJPG from '../../public/images/sozo-portfolio.jpg';
import sozoMainMobile from '../../public/images/sozo-main-mobile.webp';
import sozoPortfolioMobile from '../../public/images/sozo-portfolio-mobile.webp';
import webdevWebP from '../../public/images/anna-webdev.webp';
import webdevGamePNG from '../../public/images/website-game-pairs.png';
import bitesizeProjectsWebp from '../../public/images/bitesize-projects.webp';
import shiatsuCardiffMain from '../../public/images/shiatsu-cardiff-home-page.webp';
import shiatsuCardifSchool from '../../public/images/shiatsu-cardiff-2.webp';
import useMobile from '../hooks/useMobile';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useMemo } from 'react';

const SuperContainer = styled.div`
  //background: url('./images/watercolor.png');
  background-color: rgb(230, 230, 230);
  background-repeat: repeat;
  background-size: contain;

  h2 {
    padding: 1em;
    text-align: center;
    color: rgb(var(--clr-gold));
    font-size: ${(props) =>
        props.$locale === 'ru' ? '2.5rem' : '3rem'};
  }

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
  font-size: 1.25rem;
`;

const ProjectDescription = styled.p`
  color: #333;

  @media (max-width: 800px) {
  font-size: 1rem;
  }
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

    const t = useTranslations("Homepage.portfolio");
    const locale = useLocale();

    useEffect(() => {
        console.log("Rendering Ludesign Image:", document.querySelectorAll('img[alt^="Ludesign"]'));
    }, []);


    const ludesignTabs = useMemo(() => [
        {
            name: isMobile ? t("tab-ludesign-main-mobile") : t("tab-ludesign-main-desktop"),
            content: (
                <PortfolioImage
                    key={`ludesign-main-${isMobile ? 'mobile' : 'desktop'}`}
                    src={ludesignWebP}
                    alt="Ludesign Desktop Screenshot"
                    width={isMobile ? 300 : 650}
                    blurDataURL="/images/ludesign-portfolio.webp"
                    priority={true}
                />
            ),
        },
        {
            name: isMobile ? t("tab-ludesign-mobile") : t("tab-ludesign-desktop"),
            content: (
                <PortfolioImage
                    key={`ludesign-mobile-${isMobile ? 'mobile' : 'desktop'}`}
                    src={ludesignMainMobile}
                    alt="Ludesign Mobile Screenshot"
                    width={isMobile ? 300 : 200}
                    blurDataURL="/images/blurred-ludesign-main-mobile.webp"
                    priority={true}
                />
            ),
        },
        {
            name: isMobile ? t("tab-ludesign-portfolio-mobile") : t("tab-ludesign-portfolio-desktop"),
            content: (
                <PortfolioImage
                    key={`ludesign-portfolio-${isMobile ? 'mobile' : 'desktop'}`}
                    src={ludesignPortfolioWebP}
                    alt="Ludesign Project Screenshot"
                    width={isMobile ? 300 : 650}
                    blurDataURL="/images/ludesign-portfolio.webp"
                />
            ),
        },
        {
            name: isMobile ? t('tab-ludesign-approach-mobile') : t('tab-ludesign-approach'),
            content: (
                <ProjectInfo>
                    <p>
                        {t('website')} {' '}
                        <a href="https://ludesign.info" rel="nofollow noopener noreferrer">
                            ludesign.info
                        </a>{' '}
                        {t('ludesign-approach-p1')}
                    </p>
                    <p>{t('ludesign-approach-p2')}</p>
                    <p>{t('ludesign-approach-p3')}</p>
                </ProjectInfo>
            ),
        },
    ], [isMobile, t]); // tabs only update when isMobile or t changes




    return (
        <SuperContainer $locale={locale} id={id}>
            <h2>{t("main-heading")}</h2>
            <PortfolioContainer>
                <PortfolioItemWrapper>
                    <TabbedContainer tabs={ludesignTabs} />
                </PortfolioItemWrapper>
                <ProjectCard>
                    <ProjectTitle>{t('tech-stack')}</ProjectTitle>
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
                                name: t('tab-main-page'),
                                content: isMobile ? (
                                    <PortfolioImage
                                        key="sozo-main-mobile"
                                        src={sozoJPG}
                                        alt="Project Screenshot"
                                        width={300}
                                    />
                                ) : (
                                    <PortfolioImage
                                        key="sozo-main-desktop"
                                        src={sozoJPG}
                                        alt="Project Screenshot"
                                        width={650}
                                    />
                                )
                            },
                            {
                                name: t('tab-portfolio-page'),
                                content: isMobile ? (
                                    <PortfolioImage
                                        key="sozo-portfolio-mobile"
                                        src={sozoPortfolioJPG}
                                        alt="Project Screenshot"
                                        width={300}
                                        blurDataURL='/images/blurred-sozo-portfolio.webp'
                                    />
                                ) : (
                                    <PortfolioImage
                                        key="sozo-portfolio-desktop"
                                        src={sozoPortfolioJPG}
                                        alt="Project Screenshot"
                                        width={650}
                                        blurDataURL='/images/blurred-sozo-portfolio.webp'
                                    />
                                ),
                            },
                            {
                                name: isMobile ? t('tab-approach-mobile') : t('tab-approach-desktop'),
                                content: (
                                    <ProjectInfo>
                                        <p>
                                            {t('website')}{' '}
                                            <a
                                                href="https://sozodesign.ru"
                                                rel="nofollow noopener noreferrer"
                                            >
                                                sozodesign.ru
                                            </a>{' '}
                                            {t('sozo-approach-p1')}
                                        </p>
                                        <p>{t('sozo-approach-p2')}
                                        </p>
                                    </ProjectInfo>
                                ),
                            },
                        ]}
                    />
                </PortfolioItemWrapper>
                <ProjectCard>
                    <ProjectTitle>{t('tech-stack')}</ProjectTitle>
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
                                name: t('tab-main-page'),
                                content: isMobile ? (
                                    <PortfolioImage
                                        key="art-main-mobile"
                                        src={artWebP}
                                        alt="Project Screenshot"
                                        width={300}
                                    />
                                ) : (
                                    <PortfolioImage
                                        key="art-main-desktop"
                                        src={artWebP}
                                        alt="Project Screenshot"
                                        width={650}
                                    />
                                ),
                            },
                            {
                                name: t('tab-portfolio-page'),
                                content: isMobile ? (
                                    <PortfolioImage
                                        key="art-portfolio-mobile"
                                        src={artPortfolioJPG}
                                        alt="Project Screenshot"
                                        width={300}
                                    />
                                ) : (
                                    <PortfolioImage
                                        key="art-portfolio-desktop"
                                        src={artPortfolioJPG}
                                        alt="Project Screenshot"
                                        width={650}
                                    />
                                )
                            },
                            {
                                name: isMobile ? t('tab-approach-mobile') : t('tab-approach-desktop'),
                                content: (
                                    <ProjectInfo>
                                        <p>{t('art-approach-p1')}
                                        </p>
                                        <p>
                                            {t('art-approach-p2')}
                                        </p>
                                    </ProjectInfo>
                                ),
                            },
                        ]}
                    />
                </PortfolioItemWrapper>
                <ProjectCard>
                    <ProjectTitle>{t('tech-stack')}</ProjectTitle>
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
                                name: t('tab-main-page'),
                                content: isMobile ? (
                                    <PortfolioImage
                                        key="webdev-main-mobile"
                                        src={webdevWebP}
                                        alt="Project Screenshot"
                                        width={300}
                                    />
                                ) : (
                                    <PortfolioImage
                                        key="webdev-main-desktop"
                                        src={webdevWebP}
                                        alt="Project Screenshot"
                                        width={650}
                                    />
                                ),
                            },
                            {
                                name: t('tab-game'),
                                content: isMobile ? (
                                    <PortfolioImage
                                        key="webdev-game-mobile"
                                        src={webdevGamePNG}
                                        alt="Project Screenshot"
                                        width={300}
                                    />
                                ) : (
                                    <PortfolioImage
                                        key="webdev-game-desktop"
                                        src={webdevGamePNG}
                                        alt="Project Screenshot"
                                        width={650}
                                    />
                                ),
                            },
                            {
                                name: isMobile ? t('tab-approach-mobile') : t('tab-approach-desktop'),
                                content: (
                                    <ProjectInfo>
                                        <p>
                                            <a
                                                href="https://annawebdev.pro"
                                                rel="nofollow noopener noreferrer"
                                            >
                                                annawebdev.pro
                                            </a>{' '}
                                            {t('webdev-p1')}
                                        </p>
                                        <p>
                                            {t('webdev-p2')}
                                        </p>
                                    </ProjectInfo>
                                ),
                            },
                        ]}
                    />
                </PortfolioItemWrapper>
                <ProjectCard>
                    <ProjectTitle>{t('tech-stack')}</ProjectTitle>
                    <ProjectDescription>
                        HTML, CSS, JavaScript, Game Development
                    </ProjectDescription>
                </ProjectCard>
            </PortfolioContainer>
            <PortfolioContainer>
                <PortfolioItemWrapper>
                    <TabbedContainer
                        tabs={[
                            {
                                name: t('tab-main-page'),
                                content: isMobile ? (
                                    <PortfolioImage
                                        key="webdev-main-mobile"
                                        src={bitesizeProjectsWebp}
                                        alt="Project Screenshot"
                                        width={300}
                                    />
                                ) : (
                                    <PortfolioImage
                                        key="webdev-main-desktop"
                                        src={bitesizeProjectsWebp}
                                        alt="Project Screenshot"
                                        width={650}
                                    />
                                ),
                            },
                            {
                                name: isMobile ? t('tab-approach-mobile') : t('tab-approach-desktop'),
                                content: (
                                    <ProjectInfo>
                                        <p>
                                            <a
                                                href="https://aproskur.github.io"
                                                rel="nofollow noopener noreferrer"
                                            >
                                                aproskur.github.io
                                            </a>{' '}
                                            {t('bitesize-p1')}
                                        </p>
                                    </ProjectInfo>
                                ),
                            },
                        ]}
                    />
                </PortfolioItemWrapper>
                <ProjectCard>
                    <ProjectTitle>{t('tech-stack')}</ProjectTitle>
                    <ProjectDescription>
                        HTML, CSS, JavaScript
                    </ProjectDescription>
                </ProjectCard>
            </PortfolioContainer>
            <PortfolioContainer>
                <PortfolioItemWrapper>
                    <TabbedContainer
                        tabs={[
                            {
                                name: t('tab-main-page'),
                                content: isMobile ? (
                                    <PortfolioImage
                                        key="webdev-main-mobile"
                                        src={shiatsuCardiffMain}
                                        alt="Project Screenshot"
                                        width={300}
                                    />
                                ) : (
                                    <PortfolioImage
                                        key="webdev-main-desktop"
                                        src={shiatsuCardiffMain}
                                        alt="Project Screenshot"
                                        width={650}
                                    />
                                ),
                            },
                            {
                                name: isMobile ? t('tab-approach-mobile') : t('tab-approach-desktop'),
                                content: (
                                    <ProjectInfo>
                                        <p>
                                            <a
                                                href="https://shiatsucardiff.com"
                                                rel="nofollow noopener noreferrer"
                                            >
                                                shiatsucardiff.com
                                            </a>{' '}
                                            {t('shiatsucardiff-p1')}
                                        </p>
                                    </ProjectInfo>
                                ),
                            },
                        ]}
                    />
                </PortfolioItemWrapper>
                <ProjectCard>
                    <ProjectTitle>{t('tech-stack')}</ProjectTitle>
                    <ProjectDescription>
                        WordPress Theme Customization
                    </ProjectDescription>
                </ProjectCard>
            </PortfolioContainer>
        </SuperContainer>
    );
};

export default Portfolio;
