/*
 * Created on Sun Apr 22 2018
 *
 * Copyright (c) 2018 Ozzadar.com
 * Licensed under the GNU General Public License v3.0 
 */


import React from 'react';
import ReactModalLogin from 'react-modal-login';// eslint-disable-line
import './UserComponent.css';
import * as LoginActions from "../../actions/LoginActions";
import UserButton from './UserButton'; // eslint-disable-line
import jwt_decode from 'jwt-decode';


export default class UserComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLogin: false,
            error: null,
            loginLoading: false,
            loggingIn: false,
            modalLogin: null,
        };
    }

    render() {
        var component = this.props.currentUser == null ? 
        (
            <div>
                <button className="login-button" onClick={() => this.openLogin()}>
                Login
                </button>

                <ReactModalLogin
                    visible={this.state.showLogin}
                    onCloseModal={this.closeLogin.bind(this)}
                    loading={this.state.loginLoading}
                    error={this.state.error}
                    tabs={{
                        afterChange: this.afterTabsChange.bind(this)
                    }}
                    loginError={{
                        label: this.state.error,
                        containerClass: "login-error",
                        
                    }}
                    registerError={{
                        label: this.state.error === null ? '' : this.state.error.replace(/\\r\\n/g, "<br />"),
                        containerClass: "login-error",
                    }}
                    startLoading={this.startLoadingLogin.bind(this)}
                    finishLoading={this.finishLoadingLogin.bind(this)}
                    form={{
                        loginBtn: {
                            label: "Sign in",
                            buttonClass: "RML-btn login-confirm-button",
                            
                        },
                        loginInputs: [
                            {
                                containerClass: "login-container",
                                id: "username",
                                inputClass: "login-input",
                                label: "Username",
                                name: "username",
                                placeholder: "Username...",
                                type: "text",
                            },
                            {
                                containerClass: "login-container",
                                id: "password",
                                inputClass: "login-input",
                                label: "Password",
                                name: "password",
                                placeholder: "Password...",
                                type: "password",
                            },
                        ],
                        onLogin: this.onLogin.bind(this),
                        registerInputs: [
                            {
                                containerClass: "login-container",
                                id: "username",
                                inputClass: "login-input",
                                label: "Username",
                                name: "username",
                                placeholder: "Username...",
                                type: "text",
                            },
                            {
                                containerClass: "login-container",
                                id: "password",
                                inputClass: "login-input",
                                label: "Password",
                                name: "password",
                                placeholder: "Password...",
                                type: "password",
                            },
                            {
                                containerClass: "login-container",
                                id: "email",
                                inputClass: "login-input",
                                label: "Email",
                                name: "email",
                                placeholder: "Email...",
                                type: "email",
                            },
                        ],
                        registerBtn: {
                            label: "Sign Up",
                            buttonClass: "RML-btn login-confirm-button",
                        },
                        onRegister: this.onRegister.bind(this),

                        }}
                        
                    
                    />
            </div>
            
        ): (
            <UserButton currentUser={this.props.currentUser} />
        );

        return (
        <div className="user-component">
            {component}

                
        </div>
        );
    }

    Logout() {
        LoginActions.Logout();
    }
    /* ################# MODAL LOGIN FUNCTIONS ################# */
    
    initializeLoginModal() {
  
    }
    openLogin() {
        this.setState({
            showLogin: true,
        });
    }

    closeLogin() {
        this.setState({
            showLogin: false,
            error: null,
        });
    }
    
    startLoadingLogin() {
        this.setState({
            loginLoading: true,
        });
    }

    finishLoadingLogin() {
        this.setState({
            loginLoading: false,
        });
    }

    afterTabsChange() {
        this.setState({
          error: null
        });
    }

    onLogin() 
    {
        var username = document.querySelector('#username').value;
        var password = document.querySelector('#password').value;

        var data = {
            username: username,
            password: password,
        };

        var request = {
            body: JSON.stringify(data),
            cache: 'no-cache',
            headers: {
                "content-type": "application/json",
            },
            credentials: 'omit',
            method: 'POST',
        };

        this.startLoadingLogin();

        fetch('http://localhost:3000/login', request)
            .then(this.handleFetchError.bind(this)) 
            .then(response => response.json())
            .then(this.loginSuccessful.bind(this))
            .catch(this.catchFailedLoginError.bind(this));           
    }

    onRegister() 
    {
        var username = document.querySelector('#username').value;
        var password = document.querySelector('#password').value;
        var email = document.querySelector('#email').value;

        var data = {
            username: username,
            password: password,
            email: email,
        };

        var request = {
            body: JSON.stringify(data),
            cache: 'no-cache',
            headers: {
                "content-type": "application/json",
            },
            credentials: 'omit',
            method: 'POST',
        };

        this.startLoadingLogin();

        fetch('http://localhost:3000/register', request)
            .then(this.handleFetchError.bind(this)) 
            .then(response => response.json())
            .then(this.registrationSuccessful.bind(this))
            .catch(this.catchFailedLoginError.bind(this));           
    }

   

    parseErrorBody(json) {
        this.setState({error:json.message});
        console.log(json);
    }

    catchFailedLoginError(error) {
        error.json().then(this.parseErrorBody.bind(this));
        this.finishLoadingLogin();     

    }
    handleFetchError(response) {
        if (!response.ok) {
            throw response;
        }
        return response;
    }

    loginSuccessful(json) {
        if (typeof json !== 'undefined') {
            this.setState({error:json.message});
            var user = jwt_decode(json.token);
            user.token = json.token;
            LoginActions.LoggedIn(user);


            this.finishLoadingLogin();
            this.closeLogin();  
            
            return;   
        }
        this.finishLoadingLogin();
    }

    registrationSuccessful(json) {
        if (typeof json !== 'undefined') {
            this.setState({error:json.message});
            console.log(json);
        }
        this.finishLoadingLogin();
    }

}