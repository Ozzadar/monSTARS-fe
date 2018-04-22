/*
 * Created on Sun Apr 22 2018
 *
 * Copyright (c) 2018 Ozzadar.com
 * Licensed under the GNU General Public License v3.0 
 */


import React from 'react';

export default class UserButton extends React.Component {
    render() {
        return (
            <div> 
                {this.props.currentUser.username}
                <button onClick={this.Logout}> Log Out </button>
            </div>
        );
    }
}