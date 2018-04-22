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