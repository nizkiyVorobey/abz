import React, { useState } from "react";
import PropTypes from "prop-types";

import { UploadInput } from "../UploadInput/UploadInput";
import { userItemTypes } from "../OurUsers/components/UserItem/UserItem";
import { PopUp } from "../popUp/popUp";

import "./Register.scss";

const formInitialState = {
    name: {
        value: '',
        isValid: {
            valid: false,
            massage: "this field is reuired",
        }
    },
    email: {
        value: '',
        isValid: {
            valid: false,
            massage: "this field is reuired",
        }
    },
    phone: {
        value: '',
        isValid: {
            valid: false,
            massage: "this field is reuired",
        }
    },
    position: {
        value: '',
        isValid: {
            valid: false,
            massage: "this field is reuired",
        },
    },
    file: {
        value: '',
        isValid: {
            valid: false,
            massage: "this field is reuired",
        }
    },
};

export const Register = ({ setUserList, userList }) => {
    const [allFormValid, setAllFormValid] = useState(true);
    const [statusPopup, setStatusPopup] = useState(false);

    const [formState, setFormState] = useState(formInitialState)

    const handleChange = (event, uploadedFile) => {
        const target = event.target;

        setFormState({
            ...formState,
            [target.name]: {
                value: uploadedFile ? uploadedFile.name : target.value,
                isValid: validation(target.name, target.value.trim(), uploadedFile)
            },
        })
    }

    const validation = (name, value, uploadedFile) => {
        const required = requiredValid(value);

        switch (name) {
            case 'name':
                return !required.valid ? required : validateName(value)

            case 'phone':
                return !required.valid ? required : validatePhone(value)

            case 'email':
                return !required.valid ? required : validateEmail(value)

            case 'position':
                return requiredValid(value)

            case 'file':
                return validateFile(uploadedFile)
            default:
                return false;
        }
    };

    const requiredValid = (value) => {

        if (value.length) {
            return {
                valid: true,
                massage: "",
            }
        }

        return {
            valid: false,
            massage: "this field is reuired",
        }
    }

    const validateName = (value) => {
        if (value.length > 2 && value.length < 63) {
            return {
                valid: true,
                massage: "",
            }
        }

        return {
            valid: false,
            massage: "name length should be more 2 and less 63 charecter"
        }
    }

    const validatePhone = (value) => {
        const template = /^\+380\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/gmi;
        const valid = template.test(value);

        if (!valid) {
            return {
                valid: false,
                massage: "Number must be in this format +380 XX XXX XX XX",
            }
        }

        return {
            valid: true,
            massage: "",
        }
    }

    const validateEmail = (value) => {
        const template = /(?:[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gmi;

        if (!template.test(value)) {
            return {
                valid: false,
                massage: "Invalid email",
            }
        }

        return {
            valid: true,
            massage: "",
        }
    }

    const validateFile = (uploadedFile) => {
        // check size uploaded file
        if (uploadedFile.size / (1024 * 1024) > 5) {
            return {
                valid: true,
                massage: "max size must be 5Mb"
            }
        }

        // check type uploaded file
        if (uploadedFile.type === "image/jpg" || uploadedFile.type === "image/jpeg") {
            return {
                valid: true,
                massage: ""
            }
        }

        return {
            valid: false,
            massage: "format must be jpg or jpeg"
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            formState.name.isValid.valid && formState.email.isValid.valid && formState.phone.isValid.valid
            && formState.position.isValid.valid && formState.file.isValid.valid
        ) {
            submitUser()
        } else {
            setAllFormValid(false)
            console.log('Error', formState);
        }

    }

    async function submitUser() {
        // get token
        let token = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token');
        let tokenJson = await token.json();

        // get position list with their id and value
        let positionList = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
        let positionListJson = await positionList.json();

        // create form for posted user
        let formedUsers = await formUser(positionListJson.positions);

        // post our user with token
        let user = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
            method: 'POST',
            body: formedUsers,
            headers: {
                'Token': tokenJson.token, // get token with GET api/v1/token method
            },
        });

        let userJson = await user.json();
        let userId = userJson.user_id;

        // get current posted user from server
        let postedUser = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users/${userId}`);
        let postedUserItem = await postedUser.json();

        // open popup
        await setStatusPopup(true);

        // update current userList. Jusy add in head returned user
        await setUserList([{
            ...postedUserItem.user,
            registration_timestamp: (() => { // returned user hasn't registration_timestamp, so we add it
                const date = new Date();
                return date.getTime()
            })()
        }, ...userList]);

        await setFormState(formInitialState)

    }

    function formUser(positions) {
        var formData = new FormData();

        const position = positions.find(item => item.name === formState.position.value);

        var fileField = document.querySelector('input[type="file"]');
        formData.append('position_id', position.id);
        formData.append('name', formState.name.value);
        formData.append('email', formState.email.value);
        formData.append('phone', formState.phone.value);
        formData.append('photo', fileField.files[0]);

        return formData
    }

    return (
        <div className="register-wrapper">
            <p className="second-title register-second-title">Register to get a work</p>
            <p className="common-black-text register-common-title">
                Attention! After successful registration and alert, update the list of users in the block from the top
            </p>
            <form onSubmit={handleSubmit} className="register-form" id="register-form">
                <div className="register-field-wrapper">
                    <label htmlFor="name-inp" className="register-field-label"> Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name-inp"
                        placeholder="Your name"
                        onChange={handleChange}
                        value={formState.name.value}
                        className="register-field-item"
                    />
                    {!allFormValid ? <div>{formState.name.isValid.massage}</div> : null}
                </div>

                <div className="register-field-wrapper">
                    <label htmlFor="email-inp" className="register-field-label"> Email:</label>
                    <input
                        type="mail"
                        name="email"
                        id="email-inp"
                        placeholder="Your email"
                        onChange={handleChange}
                        value={formState.email.value}
                        className="register-field-item"
                    />
                    {!allFormValid ? <div>{formState.email.isValid.massage}</div> : null}
                </div>

                <div className="register-field-wrapper">
                    <label htmlFor="phone-inp" className="register-field-label">Phone:</label>
                    <input
                        type="phone"
                        name="phone"
                        id="phone-inp"
                        placeholder="+380 XX XXX XX XX"
                        onChange={handleChange}
                        value={formState.phone.value}
                        className="register-field-item"
                    />
                    {!allFormValid ? <div>{formState.phone.isValid.massage}</div> : null}

                    <p className="field-description">Еnter phone number in open format</p>
                </div>

                <p className="register-select-title">Select your position</p>

                <div className="register-radio-wrapper">
                    <input
                        type="radio"
                        name="position"
                        id="lawyer-r"
                        onChange={handleChange}
                        value="Lawyer"
                    />
                    <label htmlFor="lawyer-r">Lawyer</label>
                </div>

                <div className="register-radio-wrapper">
                    <input
                        type="radio"
                        name="position"
                        id="content-manager-r"
                        onChange={handleChange}
                        value="Content manager"
                    />
                    <label htmlFor="content-manager-r">Content manager</label>
                </div>

                <div className="register-radio-wrapper">
                    <input
                        type="radio"
                        name="position"
                        id="designer-r"
                        onChange={handleChange}
                        value="Designer"
                    />
                    <label htmlFor="designer-r">Designer</label>
                </div>
                <div className="register-radio-wrapper">
                    <input
                        type="radio"
                        name="position"
                        id="security-r"
                        onChange={handleChange}
                        value="Security"
                    />
                    <label htmlFor="security-r">Security</label>
                </div>
                {!allFormValid ? <div>{formState.position.isValid.massage}</div> : null}

                <div className="register-upload-file-wrapper">
                    <UploadInput
                        title="Photo"
                        id="photo"
                        handleChange={handleChange}
                        loadedFileName={formState.file.value}
                    />
                </div>
                {!allFormValid ? <div>{formState.file.isValid.massage}</div> : null}

                <button className="button register-submit-btn" onClick={handleSubmit}>Sign up now</button>
            </form>

            {
                statusPopup
                    ?
                    <PopUp
                        title={"Congratulations"}
                        massage={"You have successfully passed the registration"}
                        setStatusPopup={setStatusPopup}
                    />
                    : null
            }

        </div>
    );
};

Register.propTypes = {
    setUserList: PropTypes.func.isRequired,
    userList: PropTypes.oneOfType([
        PropTypes.arrayOf(userItemTypes.userItem).isRequired,
        PropTypes.array,
    ])
}