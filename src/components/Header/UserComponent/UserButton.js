/*
 * Created on Sun Apr 22 2018
 *
 * Copyright (c) 2018 Ozzadar.com
 * Licensed under the GNU General Public License v3.0 
 */


import React from 'react';
import * as LoginActions from "../../../actions/LoginActions";
import {
    NavLink,// eslint-disable-line
} from 'react-router-dom';
import './UserButton.css'

export default class UserButton extends React.Component {
    render() {
        return (
            <div > 
                <NavLink  to="/profile"> Profile </NavLink>
                <a onClick={this.Logout} href="#"> Log Out </a>
            </div>
        );
    }

    Logout() {
        LoginActions.Logout();
    }
}