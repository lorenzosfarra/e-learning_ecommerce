import React, {Component} from 'react';
import styled from "styled-components";
import {Col} from "reactstrap";

const ThankYouComponent = styled(Col)`
    text-align: center;
    padding: 45px 0px 30px;
    border-radius: 6px;
    margin: 15px 0;
    
    p {
        padding-top: 20px;
        font-size: 1.5em;
    }
`;

const OrderNumber = styled.span`
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace; font-size: 24px; font-style: normal; font-variant: normal; font-weight: 700;
    text-align: center;
    font-size: 0.8em !important;
    background-color: #f9f9f9;
    padding: 5px 10px !important; 
    width: auto;
    margin: 10px;
`;

const CheckMarkP = styled.p`
    font-size: 30px !important;
    border: 1px solid #4f4f4f;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    text-align: center;
    margin: 0 auto;
`;

export class ThankYou extends Component {

    render() {
        const {orderNumber} = this.props;

        return (
            <div className="text-center">
                <h1>Thanks for your purchase!</h1>
                <h6>Your order was successfully placed.</h6>

                <ThankYouComponent>
                    <CheckMarkP>&#10004;</CheckMarkP>
                    <OrderNumber>Order #{orderNumber}</OrderNumber>
                    <p>You will receive your article in 3-5 days!</p>
                </ThankYouComponent>
            </div>
        )
    }
}