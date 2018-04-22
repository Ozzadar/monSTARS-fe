import dispatcher from '../Dispatcher';
import {EventEmitter} from 'events';
import * as LoginActions from '../actions/LoginActions';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

class LoginStore extends EventEmitter {

    constructor() {
        super();
        this.cookies = new Cookies();

        var token = this.cookies.get('user-token');
        var user = (this.verifyToken(token) === undefined) ? undefined : jwt_decode(token);
        if (user !== undefined ) user.token = token;
        this.currentUser = (user === undefined) ? null : user;
    }

    handleActions(action) {
        switch(action.type) {
            case LoginActions.LOGIN_ACTIONS.LOGIN_SUCCESSFUL: {
                this.currentUser = action.value;
                //store token in cookie
                this.cookies.set('user-token', action.value.token);
                this.emit('currentUserUpdated');
                break;
            }
            case LoginActions.LOGIN_ACTIONS.LOGOUT: {
                //wipe current user
                this.currentUser = action.value;
                //remove the cookie
                this.cookies.remove('user-token');
                this.emit('currentUserUpdated');
                break;
            }
            default: {

            }
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    verifyToken(token) {

        if (typeof token === undefined) {
            return token;
        }

        var data = {
            token: token,
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

        fetch('http://localhost:3000/verify-jwt', request)
            .then(this.handleFetchError.bind(this)) 
            .then(response => response.json())
            .then(this.JWTIsValid.bind(this))
            .catch(this.catchFailedLoginError.bind(this));
        //verify token with server
        return token;
    }

    catchFailedLoginError(error) { // eslint-disable-line
        this.handleActions({
            type: LoginActions.LOGIN_ACTIONS.LOGOUT,
            value: null,
        });    

    }

    handleFetchError(response) {
        if (!response.ok) {
            throw response;
        }
        return response;
    }

    JWTIsValid(json) { // eslint-disable-line
        
    }


}

const loginStore = new LoginStore();
dispatcher.register(loginStore.handleActions.bind(loginStore));
export default loginStore;