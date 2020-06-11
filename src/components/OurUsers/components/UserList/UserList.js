import React from "react";
import PropTypes from "prop-types";

import { UserItem, userItemTypes } from "../UserItem/UserItem";

import "./UserList.scss";

export const UserList = ({userList}) => {

    return (
        <div className="user-list content-limitter">
            {
                userList.map((userItem, index) => (
                    // this awful key, besacuse when we push a new user the server return two persons with the same id
                    <UserItem key={userItem.id + (userList[index-1]? userList[index-1].id: 0)} userItem={userItem} />
                ))
            }
        </div>
    );
};

UserList.propTypes = {
    userList: PropTypes.oneOfType([
        PropTypes.arrayOf(userItemTypes.userItem).isRequired,
        PropTypes.array,
    ])
}
