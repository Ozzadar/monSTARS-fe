/*
 * Created on Sun Apr 22 2018
 *
 * Copyright (c) 2018 Ozzadar.com
 * Licensed under the GNU General Public License v3.0 
 */


import React from 'react';
import {
    Route,// eslint-disable-line
    BrowserRouter// eslint-disable-line
} from 'react-router-dom';

import Header from './components/Header/Header';// eslint-disable-line
import Footer from './components/Footer/Footer';
import Home from './views/Home';
import Stuff from './views/Stuff';
import Contact from './views/Contact';
import Profile from './views/Profile';
import Donate from './views/Donate';
import LoginStore from './stores/LoginStore';
import './content.css'
class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: LoginStore.getCurrentUser(),
        };
    }

    componentDidMount() {
        LoginStore.on('currentUserUpdated', this.updateCurrentUser.bind(this));
    }

    componentWillUnmount() {
        LoginStore.removeListener('currentUserUpdated', this.updateCurrentUser.bind(this));
        
    }
    updateCurrentUser() {
        this.setState({currentUser: LoginStore.getCurrentUser()});
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1>monSTARS</h1>
                    <Header currentUser={this.state.currentUser}/>
                    <div className="content">
                        <Route exact path="/" component ={Home}/>
                        <Route path="/stuff" component ={Stuff}/>
                        <Route path="/contact" component ={Contact}/>
                        <Route path="/profile" component ={Profile} />
                        <Route path="/donate" component ={Donate} />
                    </div>
                    {this.state.currentUser === null ? '' : (<Footer />)}
                    

                </div>
            </BrowserRouter>
        );
    }
}

export default Main;