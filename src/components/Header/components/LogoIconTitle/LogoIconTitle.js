import React from "react";
import PropTypes from "prop-types";

import "./LogoIconTitle.scss";

export const LogoIconTitle = ({ extraClass }) => {
    return (
        <div className={`header-logo-wrapper ${extraClass ? extraClass : ''}`}>
            <div className="header-logo-block">
                <picture className="header-logo-block">
                    <source
                        media="(min-width: 500px)"
                        srcSet="./images/favicon-32x32.png"
                        alt="TT"
                        className="header-logo-icon"
                    />
                    <img
                        src="./images/favicon-16x16.png"
                        srcSet="./images/favicon-32x32.png 2x"
                        alt="TT"
                        className="header-logo-icon"
                    />
                </picture>
            </div>
            <p className="header-logo-text">TESTTASK</p>
        </div>
    );
};

LogoIconTitle.propTypes = {
    extraClass: PropTypes.string
};

LogoIconTitle.defaultProps = {
    extraClass: ''
};