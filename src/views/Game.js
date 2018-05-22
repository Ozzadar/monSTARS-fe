import React from 'react';
import Unity from 'react-unity-webgl';

export default class monSTARS extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'monSTARS'
        };
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