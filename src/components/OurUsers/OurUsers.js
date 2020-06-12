import React, { useState, useEffect } from "react";

import { UserList } from "./components/UserList/UserList";

import "./OurUsers.scss";

let count = 0;
let page = 0;

export const OurUsers = ({userList, setUserList, lastPage, setLastPage}) => {

    useEffect(() => {
        getUsers()
    }, [])

    // get page and sort it by registration_timestamp
    const getUsers = () => {
        count += 6;
        page += 1;
        fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setUserList([...userList, ...[...data.users].sort((a, b) => b.registration_timestamp - a.registration_timestamp)]);

                if (page >= data.total_pages) {
                    setLastPage(true)
                }

            })
            .catch(function (error) {
                console.log(error); // add alret with Error
            });
    }

    return (
        <div className="cheerful-users">
            <p className="second-title">Our cheerful users</p>
            <p className="common-black-text cheerful-users-second-title">
                Attention! Sorting users by registration date
            </p>
            <UserList userList={userList} />
            {
                !lastPage
                    ? <button onClick={getUsers} className="button cheerful-users-btn">Show more</button>
                    : null
            }
        </div>
    );
};
