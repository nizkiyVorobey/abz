import React from "react";

import "./Acquainted.scss";

export const Acquainted = () => {
    return (
        <div className="acquainted container">
            <p className="second-title">Let's get acquainted</p>
            <div className="acquainted-desctiption">
                <div className="acquainted-desctiption-img">
                    <img src="./images/Layer 10.png" alt=""/>
                </div>

                <div className="acquainted-desctiption-text">
                    <p className="third-title acquainted-desctiption-text-title">I am cool frontend developer</p>
                    <p className="common-black-text acquainted-desctiption-text-item">
                        We will evaluate how clean your approach to writing CSS and Javascript code is. You can use any CSS and Javascript 3rd party libraries without any restriction.
                    </p>

                    <p className="common-black-text">
                        If 3rd party css/javascript libraries are added to the project via bower/npm/yarn you will get bonus points. If you use any task runner (gulp/webpack) you will get bonus points as well. Slice service directory page P​SD mockup​ into HTML5/CSS3.
                    </p>

                    <div className="acquainted-transparent-button transparent-button">
                        <a href="#register-form" className="transparent-button-link">Sing up now</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
