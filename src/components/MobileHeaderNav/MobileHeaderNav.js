import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import anime from 'animejs/lib/anime.es.js';

import { LogoIconTitle } from "../Header/components/LogoIconTitle/LogoIconTitle";

import "./MobileHeaderNav.scss";

export const MobileHeaderNav = ({ opendMobileMenu, toggleModileMenu }) => {

    // slide mobile menu on click
    useEffect(() => {
        if (opendMobileMenu) {
            anime({
                targets: '.mobile-header-nav-wrapper',
                left: 0,
                duration: 300,
                easing: 'linear',
            });
            anime({
                targets: '.mobile-header-nav-overlay',
                left: 0,
                duration: 0,
                easing: 'linear',
            });
        } else {
            anime({
                targets: '.mobile-header-nav-wrapper',
                left: "-100%",
                duration: 300,
                easing: 'linear',
            });
            anime({
                targets: '.mobile-header-nav-overlay',
                left: "-100%",
                delay: 300,
                duration: 1,
                easing: 'linear',
            });

        }
    }, [opendMobileMenu])

    return (
        <div className="mobile-header-nav-overlay" onClick={toggleModileMenu}>
            <div className="mobile-header-nav-wrapper">
                <LogoIconTitle extraClass="mobile-header-logo-wrapper" />
                <nav className="mobile-header-nav">
                    <ul className="mobile-header-nav-list mobile-menu-nav-block">
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                About me
                                </a>
                        </li>
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                Relationships
                                </a>
                        </li>
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                Users
                                </a>
                        </li>
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                Sign Up
                                </a>
                        </li>
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                Terms and Conditions
                                </a>
                        </li>
                    </ul>

                    <ul className="mobile-header-nav-list mobile-menu-nav-block">
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                How it works
                                </a>
                        </li>
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                Partnership
                                </a>
                        </li>
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                Help
                                </a>
                        </li>
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                Leave testimonial
                                </a>
                        </li>
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                Contact us
                                </a>
                        </li>
                    </ul>

                    <ul className="mobile-header-nav-list mobile-menu-nav-block">
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                Articles
                                </a>
                        </li>
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                Our news
                                </a>
                        </li>
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                Testimonials
                                </a>
                        </li>
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                Licenses
                                </a>
                        </li>
                        <li className="mobile-header-nav-item">
                            <a href="#register-form" className="mobile-header-nav-item-link header-nav-item-link">
                                Privacy Policy
                                </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

MobileHeaderNav.propTypes = {
    opendMobileMenu: PropTypes.bool.isRequired,
    toggleModileMenu: PropTypes.func.isRequired
}