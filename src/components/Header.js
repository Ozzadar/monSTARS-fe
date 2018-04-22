import React from 'react';
import {
    NavLink,// eslint-disable-line
} from 'react-router-dom';

import './Header.css';
import UserComponent from './UserComponent/UserComponent';// eslint-disable-line

export default class Header extends React.Component {




    render() {
        return (
            <div>
                <div className="header">
                        <NavLink exact to="/">Home</NavLink>
                        <NavLink to="/stuff">Stuff</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                        <div className="rightNav">
                            <UserComponent currentUser={this.props.currentUser} />
                        </div>
                </div>
               
                
                    
            </div>
        );
    }
    
}