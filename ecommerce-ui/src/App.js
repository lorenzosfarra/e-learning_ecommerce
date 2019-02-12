import React, {Component} from 'react';
import {
    Container, Row, Col,
    Button, Form, FormGroup, Label, Input
} from "reactstrap";
import {EcommerceApi} from "./Axios/EcommerceApi";
import {
    EcommerceTitle, RowTopBottomBorder
} from "./components/Layout";
import {CardForm} from "./components/screens/CardForm";
import {StripePublishableKey} from "./config/Stripe";
import {Elements, StripeProvider} from "react-stripe-elements";
import {ArticleCard} from "./components/ArticleCard";

class App extends Component {

    constructor(props) {

        super(props);

        this.ecommerceApi = new EcommerceApi();
        this.state = {
            loading: true,
            articles: [],
            filterType: null,
            filterTitle: '',
            filterTitleActive: false,

            showPayment: false,
            selectedArticle: null,

            stripe: null

        };

        this.testPost = this.testPost.bind(this);
        this.removeTypeFilter = this.removeTypeFilter.bind(this);
        this.removeTitleFilter = this.removeTitleFilter.bind(this);
        this.addTitleFilter = this.addTitleFilter.bind(this);
        this.onTitleChanged = this.onTitleChanged.bind(this);
        this.addTypeFilter = this.addTypeFilter.bind(this);
        this.purchaseArticle = this.purchaseArticle.bind(this);
    }

    _loadedArticles(articles) {
        this.setState({
            loading: false,
            articles: articles
        })
    }

    _loadAllArticles() {
        const that = this;
        return this.ecommerceApi.getArticles()
            .then((res) => {
                // res is our SuccessResponse representation
                that._loadedArticles(res.payload)
            })
            .catch((error) => {
                // TODO: show an error message!
                that._loadedArticles([])
            })
    }

    componentDidMount() {
        if (window.Stripe) {
            this.setState({
                stripe: window.Stripe(StripePublishableKey)
            })
        } else {
            document.querySelector("#stripe-js")
                .addEventListener('load', () => {
                    // Create Stripe instance once Stripe.js loads
                    this.setState({stripe: window.Stripe(StripePublishableKey)})
                })
        }
        this._loadAllArticles();
    }

    /** Filter type **/
    removeTypeFilter() {
        this.setState({
            filterType: null,
        });
        this._loadAllArticles();
    }

    addTypeFilter(type) {
        const that = this;
        this.setState({
            filterType: type,
            filterTitle: '',
            filterTitleActive: false
        });

        return this.ecommerceApi.searchArticles(
            {type: type})
            .then((res) => {
                // res is our SuccessResponse representation
                that._loadedArticles(res.payload)
            })
            .catch((error) => {
                // TODO: show an error message!
                that._loadedArticles([])
            })
    }

    /** // End filter type **/

    /** Filter title **/
    onTitleChanged({target}) {
        this.setState({
            filterTitle: target.value
        });
    }

    removeTitleFilter() {
        this.setState({
            filterTitle: '',
            filterTitleActive: false
        });
        this._loadAllArticles();
    }

    addTitleFilter() {
        const that = this;
        this.setState({
            filterType: null,
            filterTitleActive: true
        });

        const {filterTitle: title} = this.state;

        return this.ecommerceApi.searchArticles(
            {title: title})
            .then((res) => {
                // res is our SuccessResponse representation
                that._loadedArticles(res.payload)
            })
            .catch((error) => {
                // TODO: show an error message!
                that._loadedArticles([])
            })
    }

    purchaseArticle(article) {
        this.setState({
            showPayment: true,
            selectedArticle: article
        })
    }

    /** // End filter title **/

    testPost() {
        const that = this;
        return this.ecommerceApi.searchArticles({inStock: 1})
            .then((res) => {
                // res is our SuccessResponse representation
                that._loadedArticles(res.payload)
            })
            .catch((error) => {
                // TODO: show an error message!
                that._loadedArticles([])
            })
    }

    _renderShowPayment() {
        const {selectedArticle, stripe} = this.state;
        return <Container>
            {this._renderTitle()}
            <Row>
                <Col xs={{size: 10, offset: 1}}
                     md={{size: 3, offset: 0}}>
                    <ArticleCard
                        article={selectedArticle}/>
                </Col>
                <Col xs={{size: 10, offset: 1}}
                     md={{size: 8, offset: 1}}
                >
                    <StripeProvider stripe={stripe}>
                        <Elements>
                            <CardForm
                                articleId={selectedArticle.id}/>
                        </Elements>
                    </StripeProvider>
                </Col>
            </Row>
        </Container>
    }

    _renderLoading() {
        return (<Container>
            {this._renderTitle()}
            <Row>
                <Col>
                    <p>Loading articles...</p>
                </Col>
            </Row>
        </Container>);
    }

    _renderTitle() {
        return (<Row>
            <Col>
                <EcommerceTitle>E-commerce title</EcommerceTitle>
            </Col>
        </Row>);
    }

    render() {

        const {loading, filterType, filterTitle, filterTitleActive, articles, showPayment} = this.state;

        if (showPayment) {
            return this._renderShowPayment();
        }

        if (loading) {
            return this._renderLoading();
        }

        return (
            <Container>
                {this._renderTitle()}
                <Row>
                    <Col>
                        <Form>
                            <FormGroup row>
                                <Label className='d-none d-sm-block'
                                       for="filterTitle"
                                       sm={2}
                                       lg={{size: 1, offset: 1}}
                                >
                                    Search
                                </Label>
                                <Col sm={8}>
                                    <Input
                                        type="text"
                                        onChange={this.onTitleChanged}
                                        value={filterTitle}
                                        name="filterTitle" id="filterTitle"
                                        placeholder="Filter filter for title"/>
                                </Col>
                                <Col sm={1} className='d-none d-sm-block'>
                                    <Button onClick={this.addTitleFilter}>&rarr;</Button>
                                </Col>
                                <Col className='d-block d-sm-none text-center mt-2'>
                                    <Button onClick={this.addTitleFilter}>Search</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                {(filterType !== null) && <RowTopBottomBorder>
                    Showing only type "{filterType}" <Button onClick={this.removeTypeFilter}>X</Button>
                </RowTopBottomBorder>}
                {filterTitleActive && <RowTopBottomBorder>
                    Showing only articles with title "{filterTitle}" <Button onClick={this.removeTitleFilter}>X</Button>
                </RowTopBottomBorder>}
                <Row>
                    {(articles.length === 0) ? <p>No articles.</p> :
                        (articles.map((article) => (
                            <Col sm="6" md="4" key={article.id}>
                                <ArticleCard article={article}
                                             addTypeFilter={this.addTypeFilter}
                                             hidePayButton={false}
                                             purchaseArticle={this.purchaseArticle}/>
                            </Col>
                        )))
                    }
                </Row>
            </Container>
        );
    }
}

export default App;
