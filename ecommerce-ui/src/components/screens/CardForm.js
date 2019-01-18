import React, {Component} from 'react';
import {PayButton, PayForm, PayLabel, ThinProgress} from "../Layout";
import {CardElement, injectStripe} from "react-stripe-elements";
import {EcommerceApi} from "../../Axios/EcommerceApi";

class _CardForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progressbarValue: 0,
            intervalId: null,

            submitting: false,

            purchaseSuccessful: false,
            purchaseError: false,
            purchaseTransactionId: null,
            purchaseErrorMessage: null
        };

        this.ecommerceApi = new EcommerceApi();

        this.DEFAULT_ANIMATION_INTERVAL = 200; // ms

        this.CARD_ELEMENT_OPTIONS = {
            style: {
                base: {
                    fontSize: '18px',
                    color: '#424770',
                    letterSpacing: '0.025em',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#9e2146'
                }
            }
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReady = this.handleReady.bind(this);
    }

    startProgressBarAnimation() {
        const that = this;
        const intervalId = setInterval(function () {
            const {progressbarValue} = that.state;
            let newProgressbarValue = progressbarValue;
            if (progressbarValue === 100) {
                newProgressbarValue = 5;
            } else {
                newProgressbarValue += 5;
            }
            that.setState({
                progressbarValue: newProgressbarValue
            });
        }, that.DEFAULT_ANIMATION_INTERVAL);
        this.setState({
            intervalId: intervalId
        });
    }

    stopProgressBarAnimation() {
        const {intervalId} = this.state;
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
    }

    componentWillUnmount() {
        this.stopProgressBarAnimation();
    }

    handleBlur() {
        // TODO
    }

    handleChange(change) {
        // TODO
    }

    handleFocus() {
        // TODO
    }

    handleReady() {
        // TODO
    }

    payWithToken(tokenObj) {
        const {id: tokenId} = tokenObj;
        const {articleId} = this.props;
        return this.ecommerceApi.stripePayWithToken(articleId, tokenId)
            .then(data => {
                this.stopProgressBarAnimation();

                const {payload = {}} = data;
                const {transactionId} = payload;
                this.setState({
                    submitting: false,
                    purchaseSuccessful: true,
                    purchaseTransactionId: transactionId,
                    purchaseError: false
                })
            })
            .catch(error => {
                this.stopProgressBarAnimation();
                console.error("[STRIPE]", error);
                const {statusCode, code, message} = error;

                this.setState({
                    submitting: false,
                    purchaseSuccessful: false,
                    purchaseTransactionId: null,
                    purchaseError: true,
                    purchaseErrorMessage: `${message} (${statusCode}/${code})`
                })
            })

    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.setState({
            submitting: true
        });
        this.startProgressBarAnimation();
        if (this.props.stripe) {
            this.props.stripe
                .createToken()
                .then((payload) => {
                    const {token, error} = payload;
                    if (token) {
                        this.payWithToken(token);
                    } else {
                        // TODO: handle the error!
                        console.error("[ERROR handling submit]", error);
                    }
                })
        } else {
            // TODO: warn the user somehow.
        }
    }

    render() {
        const {submitting, progressbarValue} = this.state;
        return (
            <PayForm onSubmit={this.handleSubmit}>
                <PayLabel>Payment for our article</PayLabel>
                {this.props.stripe ? (
                    <CardElement
                        hidePostalCode={true}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onReady={this.handleReady}
                        {...this.CARD_ELEMENT_OPTIONS}
                    />
                ) : (
                    <div>Stripe not ready!</div>
                )}

                {submitting &&
                <ThinProgress value={progressbarValue}/>}

                {!submitting &&
                <PayButton disabled={!this.props.stripe}>Pay Now</PayButton>}
            </PayForm>
        )
    }
}

export const CardForm = injectStripe(_CardForm);