import React from 'react';
import {
    Route,// eslint-disable-line
    BrowserRouter// eslint-disable-line
} from 'react-router-dom';

import Header from './components/Header';// eslint-disable-line

import Home from './Home';
import Stuff from './Stuff';
import Contact from './Contact';
import LoginStore from './stores/LoginStore';

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
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;