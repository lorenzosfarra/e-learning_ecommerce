import React, {Component} from 'react';
import {CardImgWithBottomBorder, CardSubtitleTag, CardWithTopMargin} from "./Layout";
import {Button, CardBody, CardText, CardTitle} from "reactstrap";

export class ArticleCard extends Component {
    render() {
        const {article, hidePayButton = true, addTypeFilter, purchaseArticle} = this.props;
        return (
            <CardWithTopMargin>
                <CardImgWithBottomBorder top width="100%"
                                         src={article.img}
                                         alt={article.title}/>
                <CardBody>
                    <CardTitle>
                        {article.title}
                    </CardTitle>
                    {addTypeFilter ?
                        <CardSubtitleTag
                            onClick={() => {
                                addTypeFilter(article.type)
                            }}
                        >{article.type}</CardSubtitleTag>
                        : <CardSubtitleTag
                        >{article.type}</CardSubtitleTag>}
                    <CardText>
                        {article.price}&euro; - {article.inStock ? "Available" : "Not Available"}
                    </CardText>
                    {!hidePayButton && <Button onClick={() => {
                        purchaseArticle(article)
                    }}>Buy Now</Button>}
                </CardBody>
            </CardWithTopMargin>);
    }
}