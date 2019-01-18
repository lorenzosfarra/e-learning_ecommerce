import styled from 'styled-components';
import {Card, CardImg, CardSubtitle, Progress, Row} from "reactstrap";

export const EcommerceTitle = styled.h1`
    text-align: center;
    margin: 30px 0px;
    text-transform: uppercase;
    
    @media (min-width: 768px) {
        color: #4f4f4f;
    }
`;

export const CardWithTopMargin = styled(Card)`
    margin-top: 15px;
`;

export const CardImgWithBottomBorder = styled(CardImg)`
    border-bottom: 1px solid #eeeeee;
`;

export const CardSubtitleTag = styled(CardSubtitle)`
    color: #999999;
    font-size: 0.8em;
    cursor: pointer;
    
    &:hover {
        text-decoration: underline;
    }
`;

export const RowTopBottomBorder = styled(Row)`
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    padding: 10px;
`;

export const ThinProgress = styled(Progress)`
    height: 4px;
`;

// PAYMENT FORM
export const PayForm = styled.form`
    margin: 10px 0px 30px 0px;
    background: #f1f1f1;
    padding: 30px;
    border-radius: 4px;
`;

export const PayLabel = styled.label`
    color: #6b7c93;
    font-weight: 300;
    letter-spacing: 0.025em;
`;

export const PayButton = styled.button`
    outline: none;
    white-space: nowrap;
    border: 0;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 0 14px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
    color: #fff;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    background-color: #6772e5;
    text-decoration: none;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
    margin-top: 10px;
    &:focus {
        outline: none;
    }
    &:hover {
        color: #fff;
        cursor: pointer;
        background-color: #7795f8;
        transform: translateY(-1px);
        box-shadow: 0 7px 14px rgba(50, 50, 93, .10), 0 3px 6px rgba(0, 0, 0, .08);
    }
    &[disabled] {
      opacity: 0.6;
    }
`;