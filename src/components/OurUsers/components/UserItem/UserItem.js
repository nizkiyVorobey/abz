import React, { useState } from "react";
import PropTypes from "prop-types";

import "./UserItem.scss";

export const UserItem = ({ userItem }) => {
    const [hoverEmail, setHoverEmail] = useState(false);

    const mouseOn = () => {
        setHoverEmail(true);
    }

    const mouseLeave = () => {
        setHoverEmail(false);
    }

    return (
        <div className="user-item-card-wrapper">
            <div className="user-item-card">
                <div className="user-item-card-img-wrapper">
                    <object data={userItem.photo} type="image/png" className="user-item-card-img">
                        <img src="./images/photo-cover.png" alt={userItem.name} className="user-item-card-img" />
                    </object>
                </div>
                <p className="third-title user-card-name">{userItem.name}</p>
                <p className="user-card-occupation">{userItem.position}</p>
                {
                    +userItem.email.length > 23
                        ? (
                            <>
                                <p
                                    onMouseEnter={mouseOn}
                                    onMouseLeave={mouseLeave}
                                    className="user-card-email user-card-email-sliced">
                                    {userItem.email.slice(0, 20)}...
                            </p>

                            </>
                        )
                        : <p className="user-card-email"> userItem.email</p>
                }
                <p className="user-card-phone">{userItem.phone}</p>

            </div>

            {
                hoverEmail
                    ? (
                        <div className="user-full-name-wrapper">
                            <span className="user-full-name">{userItem.email}</span>
                        </div>
                    )
                    : null

            }
        </div>
    );
};

export const userItemTypes = {
    userItem: PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        position_id: PropTypes.number.isRequired,
        registration_timestamp: PropTypes.number.isRequired,
    })
};

UserItem.propTypes = userItemTypes;