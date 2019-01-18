/**
 * express module
 * @const
 */

const express = require('express');

const SuccessResponse = require('./common/SuccessResponse');
const ErrorResponse = require('./common/ErrorResponse');
const ServerStatusCodes = require('./common/ServerStatusCodes');

const ResponseManagement = require('./common/handleResponses');

const ArticlesClass = require('./articles/Articles');
const Articles = new ArticlesClass();

const app = express();

app.get("/", (req, res, next) => {
    res.json("Hey there.");
});

app.get("/articles", (req, res, next) => {
    return Articles.all()
        .then(response => ResponseManagement.handleSuccessResponse(req, res, response))
        .catch(error => ResponseManagement.handleErrorResponse(req, res, error));
});

app.get("/articles/:articleId", (req, res, next) => {
    // TODO: Be sure it's there
    const articleId = req.params.articleId;
    return Articles.get(articleId)
        .then(response => ResponseManagement.handleSuccessResponse(req, res, response))
        .catch(error => ResponseManagement.handleErrorResponse(req, res, error));
});

app.get("/search", (req, res, next) => {
    // TODO: Validate body
    return Articles.search(req.body)
        .then(response => ResponseManagement.handleSuccessResponse(req, res, response))
        .catch(error => ResponseManagement.handleErrorResponse(req, res, error));
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});