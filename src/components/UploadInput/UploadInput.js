import React from "react";
import PropTypes from "prop-types";

import "./UploadInput.scss";

export const UploadInput = ({ title, id, handleChange, loadedFileName }) => {
    return (
        <>
            <label htmlFor={`loaded-file-inp-${id}`} className="loaded-file-title">{title}</label>
            <input
            type="file"
            name="file"
            className="custom-loaded-file"
            id={`loaded-file-inp-${id}`}
            onChange={(event) => {handleChange(event, event.target.files[0])}}
            />
            <div className="custom-input-file register-field-item">
                <p className="loaded-file-massage">{loadedFileName}</p>
                <label htmlFor={`loaded-file-inp-${id}`} className="loaded-file-browser">Browser</label>
            </div>
        </>
    );
};

UploadInput.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    loadedFileName: PropTypes.string.isRequired,
};