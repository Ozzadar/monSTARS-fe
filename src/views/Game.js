import React from 'react';
import Unity from 'react-unity-webgl';
import { RegisterExternalListener, UnityEvent } from "react-unity-webgl";
import LoginStore from '../stores/LoginStore';

export default class monSTARS extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'monSTARS'
        };

        this.emitToken = new UnityEvent("WebsocketManager", "ReceiveToken");
        RegisterExternalListener("GetToken", this.getToken.bind(this));
    }


    getToken() {
        this.emitToken.emit(LoginStore.getCurrentJWT());
    }

    render() {
        return (
            <div>
                <Unity
                    style={{padding:0, display: "inline-block", margin: "auto"}}
                    
                    src="unity-build/monSTARS.json"
                    loader="unity-build/UnityLoader.js"
                />
            </div>
        );
    }
}