import React from 'react';
import LoginStore from '../../stores/LoginStore';
import {DotLoader} from 'react-spinners'; // eslint-disable-line
import Popup from 'reactjs-popup'; // eslint-disable-line
import './donation.css';

export default class DonationComponent extends React.Component {
    constructor(props) {
        super(props);

        this.params = new URLSearchParams(props.location.search);

        let paymentInfo = {
            token: this.params.get('token'),
            paymentId: this.params.get('paymentId'),
            payerID: this.params.get('PayerID')
        };

        let loading = false;

        this.step = {
            CREATE: 1,
            PROCESSED: 2,
            SUBMITTED: 3,
            COMPLETE: 5,
            ERROR_PROCESS: 6,
            ERROR_CONFIRM: 7,
            ERROR_COMPLETE: 8,
            CANCELLED: 9
        };

        let currentStep = this.step.CREATE;

        if (paymentInfo.token !== null &&
            paymentInfo.paymentId === null &&
            paymentInfo.payerID === null) {
            
            currentStep = this.step.CANCELLED;
        }
        
        if (paymentInfo.token !== null &&
            paymentInfo.paymentId !== null &&
            paymentInfo.payerID !== null) {
                
            currentStep = this.step.SUBMITTED;
            loading = true;
        }

        this.state = {
            params: paymentInfo,
            currencyType: 'USD',
            currencyAmount: "10",
            isLoading: loading,
            step: currentStep,
            approval_url: ''
        };      
    }

    componentDidMount() {

        //if payment submitted
        if (this.state.step === this.step.SUBMITTED) {
        
            let token = LoginStore.getCurrentJWT();
    
            var request = {
                body: JSON.stringify(this.state.params),
                cache: 'no-cache',
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + token
                },
                credentials: 'omit',
                method: 'POST'
            };

            //process payment
            fetch('http://localhost:3000/app/complete-payment', request)
            .then(this.handleFetchError.bind(this)) 
            .then(response => response.json())
            .then(this.donationCompleted.bind(this))
            .catch(this.catchFailed.bind(this)); 
        }
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
            currency: this.state.currencyType
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
            method: 'POST'
        };

        this.setState({isLoading:true});
        fetch('http://localhost:3000/app/donate', request)
            .then(this.handleFetchError.bind(this)) 
            .then(response => response.json())
            .then(this.donationProcessed.bind(this))
            .catch(this.catchFailed.bind(this)); 

    }

    handleFetchError(response) {
        if (!response.ok) {
            throw response;
        }
        return response;
    }

    donationProcessed(json) {
        this.setState({isLoading: false,approval_url: json.approval_url, step: this.step.PROCESSED});
    }

    donationCompleted(json) {
        this.setState({
            isLoading: false,
            step: this.step.COMPLETE,
            paymentDetails: {
                amount: json.amount,
                currency: json.currency
            }
        });
    }

    catchFailed(error) {
        if (Object.keys(error).length !== 0) {
            //error.json().then(this.parseErrorBody.bind(this));
        } 
    }

    createForm() {
        return (
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
    }

    processPage() {
        return (
                <Popup open={this.state.step === this.step.PROCESSED ? true : false}
                    modal={true} lockScroll={true} style={{height:'500px'}}>
                    <iframe title="paypal" height="800px" width="100%" src={this.state.approval_url}></iframe>
                </Popup>            
        );
    }

    submittedForm() {
        return (
            <span>
                Payment Submitted. Display details to confirm payment.
            </span>
        );
    }

    cancelledPage() {
        return (
            <span>
                Payment Cancelled. Delete from database.
            </span>
        );
    }

    completePage() {
        return (
            <div>
                <span>Payment Complete. Thanks for your donation.</span>
                <br/>
                Amount: {this.state.paymentDetails.amount} {this.state.paymentDetails.currency}
            </div>
        );
    }
    render() {
        let form;

        switch(this.state.step) {
            case this.step.CREATE: {
                form = this.createForm();
                break;
            }
            case this.step.PROCESSED: {
                form = this.processPage();
                break;
            }
            case this.step.SUBMITTED: {
                form = this.submittedForm();
                break;
            }
            case this.step.CANCELLED: {
                form = this.cancelledPage();
                break;
            }
            case this.step.COMPLETE: {
                form = this.completePage();
                break;
            }
            default: {

            }
        }

        const display = this.state.isLoading ? (<div className="innerContent"><DotLoader size={60} /> </div>) : form;
        return (
            <div className="donationComponent">
                    {this.state.step === this.step.SUBMITTED && this.state.isLoading ? 'Processing Payment... Please wait.' : ''}
                    <br/>
                    {display}
            </div>
        );
    }
}