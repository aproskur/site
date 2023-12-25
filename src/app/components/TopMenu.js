'use client'
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components'


const Nav = styled.nav`
    display: flex;
    position: sticky;
    top: 0;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    font-size: 1.25rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    z-index: 1000;
`;

const Logo = styled.div`
    flex-grow: 0;
    flex-shrink: 1; // Allow it to shrink if needed
    flex-basis: auto; // Adjust as needed
    padding: 1em;
    // TODO: a media query for font-size adjustment
`;

const HamburgerIcon = styled.div`
    display: flex;
    gap: 0.5em;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
    cursor: pointer;
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
        transform: rotate(45deg) translate(8px, 3px); /* Adjust translation for top bar */
    }
    &.open div:nth-child(2) {
        opacity: 0; /* Hides the middle bar */
    }
    &.open div:nth-child(3) {
        transform: rotate(-45deg) translate(9px, -5px); /* Adjust translation for bottom bar */
    }
`;


const slideDown = keyframes`
    from { transform: translateY(-100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
`;

const slideUp = keyframes`
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-100%); opacity: 0; }
`;


const MenuItems = styled.ul`
    display: ${props => props.$isOpen || props.$isAnimating ? 'flex' : 'none'};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    opacity: ${props => props.$isOpen ? 1 : 0};
    overflow: hidden;
    gap: 1em;
    justify-content: flex-end;
    padding: 1em;
    transition: opacity 0.4s ease, max-height 0.4s ease;
    animation: ${props => props.$isOpen ? css`${slideDown} 0.4s ease forwards` :
        props.$isAnimating ? css`${slideUp} 0.4s ease forwards` : 'none'};

        @media (max-width: 768px) { 
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 7em 1em;
            align-items: center;
            position: fixed; // To cover the entire screen
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100vh; // Full viewport height         
            background: linear-gradient(to bottom, rgb(44, 62, 80), rgb(248, 187, 208));
            z-index: 10; 
            transform: translateX(-100%); // Start off-screen
            transition: transform 0.4s ease;

 
        }
`;


const MenuItem = styled.li`
    list-style-type: none;
    text-transform: uppercase;
`;

const RoundButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--bgr-gradient);
  color: rgb(var(--clr-white));
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  z-index: 1001;
`;

// HamburgerMenu Component
const TopMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            // Clear the timeout when the component unmounts
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };




    const toggleMenu = () => {
        if (isOpen) {
            setIsAnimating(true); // Start closing animation
            timeoutRef.current = setTimeout(() => {
                setIsOpen(false);
                setIsAnimating(false);
            }, 400); // Duration of slideUp animation
        } else {

            setIsOpen(true);
        }
    };


    const scrollToSection = (event, sectionId) => {
        event.preventDefault();
        setIsOpen(false);
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'auto' });
        }
    };



    return (
        <>
            <Nav>
                <Logo>ANNA WEBDEV</Logo>
                <MenuItems $isOpen={isOpen} $isAnimating={isAnimating}>
                    <MenuItem>Home</MenuItem>
                    <MenuItem><a href="#" onClick={(e) => scrollToSection(e, 'services')} aria-label="View services section">Services</a></MenuItem>
                    <MenuItem><a href="#" onClick={(e) => scrollToSection(e, 'projects')} aria-label="View portfolio section">Projects</a></MenuItem>
                    <MenuItem><a href="#" onClick={(e) => scrollToSection(e, 'contact-anna')} aria-label="View contact section">Contact</a></MenuItem>
                </MenuItems>
                <HamburgerIcon onClick={toggleMenu} className={isOpen ? 'open' : ''} aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}>
                    <span>
                        <div></div>
                        <div></div>
                        <div></div>
                    </span>
                    <span> {isOpen ? 'CLOSE' : 'MENU'} </span>
                </HamburgerIcon>



            </Nav>
            {showButton && <RoundButton onClick={scrollToTop}>↑</RoundButton>}
        </>

    );
};

export default TopMenu;
