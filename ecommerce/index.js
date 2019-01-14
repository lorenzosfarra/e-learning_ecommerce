// LOAD CONF FROM ENV FILE
require('dotenv').config();

// LOAD ROUTES
const ROUTES = require('./constants/Routes');

// CONFIG
const CONFIG = require('./config/config');

// Stripe
const Stripe = require('./Stripe/Stripe');

/**
 * express module
 * @const
 */
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// app.use([path,] callback [, callback...])
// Mounts body-parser middleware function
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

const ResponseManagement = require('./common/handleResponses');

const ArticlesClass = require('./articles/Articles');
const Articles = new ArticlesClass();

/**
 * GET REQUEST
 * Retrieve the data that we want to show in our entry point...
 */
app.get(ROUTES.ROOT(), (req, res, next) => {
    res.json("Nothing to see, here.");
});

/**
 * GET REQUEST
 * Retrieve the list of articles
 */
app.get(ROUTES.ARTICLES_LIST(), (req, res, next) => {
    return Articles.all()
        .then(response => ResponseManagement.handleSuccessResponse(req, res, response))
        .catch(error => ResponseManagement.handleErrorResponse(req, res, error))
});

/**
 * GET REQUEST
 * Article details.
 * An articleId param should be part of the req.params object.
 */
app.get(ROUTES.ARTICLE_DETAIL(), (req, res, next) => {
    // TODO: Be sure that articleId is present
    const articleId = req.params.articleId;
    return Articles.get(articleId)
        .then(response => ResponseManagement.handleSuccessResponse(req, res, response))
        .catch(error => ResponseManagement.handleErrorResponse(req, res, error))
});

/**
 * POST REQUEST
 * Search for an article
 */
app.post(ROUTES.SEARCH(), (req, res, next) => {
    // TODO: validate body!
    return Articles.search(req.body)
        .then(response => ResponseManagement.handleSuccessResponse(req, res, response))
        .catch(error => ResponseManagement.handleErrorResponse(req, res, error))
});

app.post(ROUTES.PURCHASE(), (req, res, next) => {
    // TODO: validate body!
    const stripe = new Stripe();
    const articleId = req.body.articleId;
    const tokenId = req.body.tokenId;
    return stripe.chargeCardOneTimeToken(articleId, tokenId)
        .then(response => ResponseManagement.handleSuccessResponse(req, res, response))
        .catch(error => ResponseManagement.handleErrorResponse(req, res, error))
});

app.listen(CONFIG.SERVER_PORT, () => {
    console.log(`[SERVER] Running on port ${CONFIG.SERVER_PORT}..`);
});
