import React from 'react';
import LoginStore from '../../stores/LoginStore';
import {DotLoader} from 'react-spinners';

import './donation.css';

export default class DonationComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currencyType: 'USD',
            currencyAmount: 10.00,
            isLoading: false,
            state: 'fill',
        };
    }

    onCurrencyChange(event) {
        this.setState({currencyType: event.target.value});
    }

    onAmountChange(event) {
        this.setState({currencyAmount: event.target.value});
    }

    onSubmit(event) {
        //stop the button from reloading the site        
        event.preventDefault();

        var data = {
            amount: this.state.currencyAmount,
            currency: this.state.currencyType,
        };

        const token = LoginStore.getCurrentJWT();

        var request = {
            body: JSON.stringify(data),
            cache: 'no-cache',
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            },
            credentials: 'omit',
            method: 'POST',
        };

        this.setState({isLoading:true});
        fetch('http://localhost:3000/app/donate', request)
            .then(this.handleFetchError.bind(this)) 
            .then(response => response.json())
            .then(this.donationSuccessful.bind(this))
            .catch(this.catchFailed.bind(this)); 

    }

    handleFetchError(response) {
        if (!response.ok) {
            throw response;
        }
        return response;
    }

    donationSuccessful(json) {
        console.log(json);
        this.setState({isLoading: false});
    }

    catchFailed(error) {
        console.log('donation failed');
        if (Object.keys(error).length !== 0) {
            //error.json().then(this.parseErrorBody.bind(this));
        }
       
    }

    render() {
        const form = (
            <form onSubmit={this.onSubmit.bind(this)} >
                    
                    <label>
                        Amount you'd like to donate:
                        <input type="number" name="amount" value={this.state.currencyAmount} onChange={this.onAmountChange.bind(this)} /> <br/>
                    </label>
                    <label>
                        Currency:
                        <select value={this.state.currencyType} onChange={this.onCurrencyChange.bind(this)}>
                            <option value="CAD">CAD</option>
                            <option value="USD">USD</option>
                        </select>
                    </label>
                    <br/>
                    <input type="submit" value="Donate!"/>
                </form>
        );
        

        const display = this.state.isLoading ? (<div className="innerContent"><DotLoader size={60} /> </div>) : form;
        return (
            <div className="donationComponent">
                    {display}
            </div>
        );
    }
}