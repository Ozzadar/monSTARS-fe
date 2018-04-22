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