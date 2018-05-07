/*
 * Created on Sun May 06 2018
 *
 * Copyright (c) 2018 Ozzadar.com
 * Licensed under the GNU General Public License v3.0 
 */

import React from 'react';
import DonationComponent from '../components/Donation/DonationComponent';
import {Redirect} from 'react-router-dom';
import LoginStore from '../stores/LoginStore';

class Donate extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (LoginStore.getCurrentUser() === null) {
            return (
                <Redirect to="/" />
            );
        }

        return (
            <div>
                <h2>Support monSTARS</h2><br/>
                <p>Would you like to support this site? If so, enter how much you'd like to donate and you'll be redirected to PayPal</p>
                <DonationComponent />
            </div>
        );
    }
}

export default Donate;