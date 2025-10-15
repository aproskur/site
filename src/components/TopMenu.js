'use client'
import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components'
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image'
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';



const Nav = styled.nav`
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    width: 100%;
    padding: 1em 2em;
    font-size: 1.25rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    z-index: 1000;
    background: ${({ $background }) => $background || 'rgba(var(--clr-gray), 0.08)'};

    @media (max-width: 1100px) {
        padding: 1em;
    }
`;

const LayoutWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
  min-width: 0;

  @media (max-width: 1100px) {
    gap: 0.75rem;
    justify-content: space-between;
  }
`;



const Logo = styled.div`
  position: relative;
  flex: 0 1 300px;
  height: 43px;
  min-width: 0;

  @media (max-width: 1100px) {
    flex: 0 0 auto;
    width: clamp(200px, 45vw, 250px);
    height: clamp(28px, 9vw, 32px);
    flex-shrink: 0;
  }
`;


const HamburgerIcon = styled.div`
    display: none;

    @media (max-width: 1100px){
    display: flex;
    gap: 0.5em;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    z-index: 11;

    div {
        width: 30px;
        height: 3px;
        background-color: #fff;
        margin: 6px 0;
        transition: 0.4s;
    }
    &.open div:nth-child(1) {
        transform: rotate(45deg) translate(8px, 3px); 
    }
    &.open div:nth-child(2) {
        opacity: 0; 
    }
    &.open div:nth-child(3) {
        transform: rotate(-45deg) translate(9px, -5px); 
    }

    &:focus {
        outline: 2px solid blue; 
    }

    span:last-child {
        // Hide the text by default
        display: none;

        // When isOpen is true, always show the text (for "CLOSE")
        .open & {
            display: inline;
        }
    

        // When isOpen is false, show the text only on screens wider than 500px (for "MENU")
        @media (min-width: 501px) {
            display: inline;
        }
    }
`;

const UseClientMenu = styled.nav`
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    align-items: center;
    flex: 1 1 auto;
    min-width: 0;

    @media (max-width: 1100px) {
        position: fixed;
        inset: 0;
        background: var(--bgr-gradient);
        padding: 7em 1.5em;
        flex-direction: column;
        gap: 1.25em;
        transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-100%)')};
        transition: transform 0.4s ease;
        z-index: 10;
    }
`;

const MenuItems = styled.ul.attrs({
    id: 'offCanvasMenu'
})`
    display: flex;
    gap: 1.5rem;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;

    @media (max-width: 1100px) {
      flex-direction: column;
      width: 100%;
      opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
      transition: opacity 0.3s ease;
    }
  `;


const MenuItem = styled.li`
  list-style-type: none;
  text-transform: uppercase;
  --clr-torquoise: 64, 224, 208;
  color: rgb(var(--clr-torquoise));

  a {
    position: relative;
    display: inline-block;
    padding-bottom: 0.2em;
  }

  a::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%) scaleX(0);
    transform-origin: center;
    width: 100%;
    height: 2px;
    background: rgb(var(--clr-torquoise));
    transition: transform 0.25s ease;
  }

  a:hover::after,
  a:focus-visible::after {
    transform: translateX(-50%) scaleX(1);
  }
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.25rem;
  flex: 0 1 300px;
  min-width: 0;

  @media (max-width: 1100px) {
    flex: 0 0 auto;
    gap: 0.5rem;
  }
`;

const TopMenu = ({ background }) => {



    const [isOpen, setIsOpen] = useState(false);

    const { width } = useWindowSize();

    const currentLocale = useLocale();
    const router = useRouter();

    const toggleMenu = () => {
        if (width <= 1100) {
            setIsOpen((prev) => !prev);
        }
    };

    const scrollToSection = async (event, sectionId) => {
        event.preventDefault();
        setIsOpen(false);
        const homePath = `/${currentLocale}`;

        if (typeof window !== 'undefined' && window.location.pathname === homePath) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                return;
            }
        }

        await router.push(
            { pathname: '/', hash: sectionId },
            { locale: currentLocale }
        );
    };
    const t = useTranslations('Homepage');
    return (
        <>
            <Nav $background={background}>
                <LayoutWrapper>
                    <Logo>
                        <Image
                            src="/images/logo-torquoise.png"
                            fill
                            sizes="(max-width: 850px) 250px, 300px"
                            alt="Anna WEBDEV"
                        />
                    </Logo>
                    <UseClientMenu $isOpen={isOpen}>

                        <MenuItems $isOpen={isOpen}>

                            {/*<MenuItem>Home</MenuItem>*/}
                            <MenuItem><a href="#" onClick={(e) => scrollToSection(e, 'services')} role="button" aria-label="View services section">{t('menu.services')}</a></MenuItem>
                            <MenuItem><a href="#" onClick={(e) => scrollToSection(e, 'projects')} role="button" aria-label="View portfolio section">{t('menu.projects')}</a></MenuItem>
                            <MenuItem><a href="#" onClick={(e) => scrollToSection(e, 'contact-anna')} role="button" aria-label="View contact section">{t('menu.contact')}</a></MenuItem>
                            <MenuItem><a href="/fun" role="button" aria-label="view fun landing page">{t('menu.fun')}</a></MenuItem>
                            {width <= 1100 && <LanguageSwitcher currentLocale={currentLocale} />}
                        </MenuItems>
                    </UseClientMenu>
                    <RightControls>
                        {width > 1100 && <LanguageSwitcher currentLocale={currentLocale} />}
                        <HamburgerIcon role="button" onClick={toggleMenu} className={isOpen ? 'open' : ''} aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}>
                            <span>
                                <div></div>
                                <div></div>
                                <div></div>
                            </span>
                            <span> {isOpen ? 'CLOSE' : 'MENU'} </span>
                        </HamburgerIcon>
                    </RightControls>
                </LayoutWrapper>
            </Nav>
        </>

    );
};

export default TopMenu;
