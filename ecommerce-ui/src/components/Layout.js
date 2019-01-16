import styled from 'styled-components';
import {Card, CardImg, CardSubtitle, Row} from "reactstrap";

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