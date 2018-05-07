import React from 'react'
import {Redirect} from 'react-router-dom';
import LoginStore from '../stores/LoginStore';

export default class Profile extends React.Component {
    render() {

        if (LoginStore.getCurrentUser() === null) {
            return (
                <Redirect to="/" />
            );
        }

        return (


            <div>
                Profile
            </div>
        )
    }
}