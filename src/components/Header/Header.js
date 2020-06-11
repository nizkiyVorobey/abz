import React, { useState, useEffect } from "react";

import { DesktopHeaderNav } from '../DesktopHeaderNav/DesktopHeaderNav';
import { MobileHeaderNav } from "../MobileHeaderNav/MobileHeaderNav";
import { LogoIconTitle } from "./components/LogoIconTitle/LogoIconTitle";
import anime from 'animejs/lib/anime.es.js';

import './Header.scss';

export const Header = () => {
    const [opendMobileMenu, setOpendMobileMenu] = useState(false);
    const [currentDisplay, setCurrentDisplay] = useState(null);

    const toggleModileMenu = () => {
        setOpendMobileMenu(!opendMobileMenu);
    }

    // track dispaly width
    const checkSizeScreen = () => {
        if (window.innerWidth <= 360 && currentDisplay !== 'mobile') {
            setCurrentDisplay('mobile');
        } else if (window.innerWidth <= 768 && currentDisplay !== 'tablet') {
            setCurrentDisplay('tablet');
        } else if (window.innerWidth > 768 && currentDisplay !== 'desktop') {
            setCurrentDisplay('desktop');
        }
    }

    // add eventListener for track dispaly width
    useEffect(() => {
        checkSizeScreen();
        window.addEventListener('resize', checkSizeScreen);

        return () => {
            window.removeEventListener('resize', checkSizeScreen);
        }
    }, []);

    // force disable mobile menu on desktop, even if it was opened
    useEffect(() => {
        if (currentDisplay === 'desktop') {
            setOpendMobileMenu(false);
        }
    }, [currentDisplay])

    useEffect(() => {
        const screenHeight = window.innerHeight; // animateJS work with bug if use vh or %

        if (opendMobileMenu) {
            anime({
                targets: 'header',
                height: screenHeight,
                duration: 1
            })
        } else {
            anime({
                targets: 'header',
                height: "60px",
                delay: 300,
                duration: 1,
            })
        }
    }, [opendMobileMenu])


    return (
        <div className="header container">
            <LogoIconTitle />
            <div className="header-nav-wrapper">
                {
                    currentDisplay === 'desktop' ? <DesktopHeaderNav /> : null
                }
            </div>
            <div className="menu-icon" onClick={toggleModileMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
                    <path
                        id="menu_icon"
                        data-name="menu icon"
                        className="menu-icon-path"
                        d="M325,13h20v3H325V13Zm0,6h20v3H325V19Zm0,6h20v3H325V25Z"
                        transform="translate(-325 -13)"
                    />
                </svg>
            </div>

            {
                currentDisplay !== 'desktop'
                    ? <MobileHeaderNav
                        opendMobileMenu={opendMobileMenu}
                        toggleModileMenu={toggleModileMenu}
                    />
                    : null
            }
        </div>
    );
};
