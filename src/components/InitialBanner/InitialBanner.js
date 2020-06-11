import React from "react";

import "./InitialBanner.scss";

export const InitialBanner = () => {
    return (
        <div className="initial-banner">
            <img src="./images/banner-photo.jpg" alt="banner" className="initial-banner-img" />
            <div className="initial-banner-text-wrapper container">
                <p className="main-title initial-banner-main-title">
                    Test assignment for Frontend Developer position
                    </p>
                <p className="initial-banner-text">
                    We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository. Please be patient, we consider and respond to every application that meets minimum requirements. We look forward to your submission. Good luck! The photo has to scale in the banner area on the different screens
                </p>
                <button className="button initial-banner-btn">
                    <a href="#register-form" className="button-link">Sing up now</a>
                </button>
            </div>
        </div>
    );
};