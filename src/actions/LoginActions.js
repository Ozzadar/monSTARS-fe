/*
 * Created on Sun Apr 22 2018
 *
 * Copyright (c) 2018 Ozzadar.com
 * Licensed under the GNU General Public License v3.0 
 */


import dispatcher from '../Dispatcher';

export const LOGIN_ACTIONS = {
    LOGIN_SUCCESSFUL: 'loginActions.LoggedIn',
    LOGOUT: 'loginActions.Logout',
};

export function LoggedIn(user) {

    dispatcher.dispatch({
        type: LOGIN_ACTIONS.LOGIN_SUCCESSFUL,
        value: user,
    });
}

export function Logout() {
    dispatcher.dispatch({
        type: LOGIN_ACTIONS.LOGOUT,
        value: null,
    });
}