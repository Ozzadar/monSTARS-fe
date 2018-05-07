/*
 * Created on Sun May 06 2018
 *
 * Copyright (c) 2018 Ozzadar.com
 * Licensed under the GNU General Public License v3.0 
 */

import React from 'react';
import {
    NavLink,// eslint-disable-line
} from 'react-router-dom';

import donate_button from '../../images/paypal-donate.png';
import './Footer.css';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                Like the site? Support us here:<br/>
                <NavLink activeClassName="" to="/donate"><img src={donate_button} className="donateButton" alt="Donate Here!"/></NavLink>
                
            </div>
        );
    }
}