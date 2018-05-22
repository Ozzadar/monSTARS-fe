import React from 'react';
import {Redirect} from 'react-router-dom';
import LoginStore from '../stores/LoginStore';

export default class Profile extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            lastMessage : undefined,
            messages : []
        };
    }

    componentDidMount() {

        var uri = 'ws://localhost:3000/ws';
        
        let ws = new WebSocket(uri);
    
        ws.onopen = function() {
          console.log('Connected');
        };
    
        ws.onmessage = this.receiveMessage.bind(this);
    
        setInterval(function() {
            console.log("sending message");
          ws.send(JSON.stringify({"message": "Hi server!"}));
        }, 1000);
    }

    receiveMessage(evt) {
        console.log(evt)

        let lastMessage = JSON.parse(evt.data)

        let messages= this.state.messages;
        messages.push(lastMessage.Message);

        this.setState({messages: messages});
    }

    render() {
       
        if (LoginStore.getCurrentUser() === null) {
            return (
                <Redirect to="/" />
            );
        }

        return (


            <div>
                Profile <br/>
                {
                    this.state.messages.map(function(item, i){
                        
                        return <li key={i}>{item}</li>
                    })
                }
            </div>
        );
    }
}