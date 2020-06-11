import React from "react";

import "./DesktopHeaderNav.scss";

export const DesktopHeaderNav = () => {
    return (
        <nav className="header-nav">
            <ul className="header-nav-list">
                <li className="header-nav-item">
                    <a href="#register-form" className="desktop-header-nav-item-link header-nav-item-link">
                        About me
                        </a>
                </li>
                <li className="header-nav-item">
                    <a href="#register-form" className="desktop-header-nav-item-link header-nav-item-link">
                        Relationships
                        </a>
                </li>
                <li className="header-nav-item">
                    <a href="#register-form" className="desktop-header-nav-item-link header-nav-item-link">
                        Requirements
                        </a>
                </li>
                <li className="header-nav-item">
                    <a href="#register-form" className="desktop-header-nav-item-link header-nav-item-link">
                        Users
                        </a>
                </li>
                <li className="header-nav-item">
                    <a href="#register-form" className="desktop-header-nav-item-link header-nav-item-link">
                        Sign Up
                        </a>
                </li>
            </ul>
        </nav>
    );
};
