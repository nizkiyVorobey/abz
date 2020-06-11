import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "./popUp.scss";

export const PopUp = ({ title, massage, setStatusPopup }) => {
    const closePopup = () => {
        setStatusPopup(false)
    }

    useEffect(() => {
        console.log(123);

    }, [])

    return (
        <div className="overlay">
            <div className="popup-wrapper">
                <div className="popup-section">
                    <div className="popup-title-wrapper">
                        <p className="popup-title">{title}</p>
                        <div className="popup-cross" onClick={closePopup}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14" >
                                <path
                                    id="Shape 2"
                                    className="shp0"
                                    fill="#7b7b7b"
                                    d="M13 10.9L10.9 13L7 9.1L3.1 13L1 10.9L4.9 7L1 3.1L3.1 1L7 4.9L10.9 1L13 3.1L9.1 7L13 10.9Z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="popup-section">
                    <p className="popup-massage">{massage}</p>
                </div>

                <div className="popup-section popup-section-btn">
                    <button className="button popup-btn" onClick={closePopup}>Great</button>
                </div>
            </div>
        </div >
    );
};


PopUp.propTypes = {
    title: PropTypes.string.isRequired,
    massage: PropTypes.string.isRequired,
    setStatusPopup: PropTypes.func.isRequired,
};