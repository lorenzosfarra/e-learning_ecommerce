import React, {Component} from 'react';
import {
    Container, Row, Col,
    CardBody, CardTitle, CardText, Button, Form, FormGroup, Label, Input
} from "reactstrap";
import {EcommerceApi} from "./Axios/EcommerceApi";
import {
    CardImgWithBottomBorder,
    CardSubtitleTag,
    CardWithTopMargin,
    EcommerceTitle, RowTopBottomBorder
} from "./components/Layout";

class App extends Component {

    constructor(props) {

        super(props);

        this.ecommerceApi = new EcommerceApi();
        this.state = {
            loading: true,
            articles: [],
            filterType: null,
            filterTitle: null,
            filterTitleActive: false
        };

        this.testPost = this.testPost.bind(this);
        this.removeTypeFilter = this.removeTypeFilter.bind(this);
        this.removeTitleFilter = this.removeTitleFilter.bind(this);
        this.addTitleFilter = this.addTitleFilter.bind(this);
        this.onTitleChanged = this.onTitleChanged.bind(this);
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

    render() {
        const {loading, filterType, filterTitle, filterTitleActive, articles} = this.state;

        if (loading) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <p>Loading articles...</p>
                        </Col>
                    </Row>
                </Container>
            )
        }

        return (
            <Container>
                <Row>
                    <Col>
                        <EcommerceTitle>E-commerce title</EcommerceTitle>
                    </Col>
                </Row>
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
                                <CardWithTopMargin>
                                    <CardImgWithBottomBorder top width="100%"
                                                             src={article.img}
                                                             alt={article.title}/>
                                    <CardBody>
                                        <CardTitle>
                                            {article.title}
                                        </CardTitle>
                                        <CardSubtitleTag
                                            onClick={() => {
                                                this.addTypeFilter(article.type)
                                            }}
                                        >{article.type}</CardSubtitleTag>
                                        <CardText>
                                            {article.price}&euro; - {article.inStock ? "Available" : "Not Available"}
                                        </CardText>
                                        <Button>Buy Now</Button>
                                    </CardBody>
                                </CardWithTopMargin>
                            </Col>
                        )))
                    }
                </Row>
            </Container>
        );
    }
}

export default App;
