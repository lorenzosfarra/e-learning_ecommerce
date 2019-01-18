// Import SuccessResponse
const SuccessResponse = require('../common/SuccessResponse');
// Import ErrorResponse
const ErrorResponse = require('../common/ErrorResponse');
const ServerStatuses = require('../common/ServerStatusCodes');

// List of articles
const ARTICLES = require('../constants/Articles');

class Articles {
    // Return the list of all the articles
    all() {
        return Promise.resolve(new SuccessResponse({
            statusCode: ServerStatuses.SERVER_STATUS_CODES.LIST_OK,
            payload: ARTICLES
        }));
    }

    get(articleId) {
        const found = this.getRaw(articleId);
        if (found) {
            return Promise.resolve(new SuccessResponse({
                statusCode: ServerStatuses.SERVER_STATUS_CODES.DETAIL_OK,
                payload: found
            }));
        }

        return Promise.reject(new ErrorResponse({
            statusCode: ServerStatuses.SERVER_STATUS_CODES.DETAIL_NOT_FOUND,
            code: ServerStatuses.SERVER_ERROR_CODES.DETAIL_NOT_FOUND,
            message: ServerStatuses.SERVER_ERROR_MESSAGE.DETAIL_NOT_FOUND
        }));
    }

    search(params) {
        const onlyStock = params.inStock ? (Number.parseInt(params.inStock) === 1) : false;
        const type = params.type ? params.type : null;
        const minPrice = params.minPrice ? params.minPrice : 0;
        const maxPrice = params.maxPrice ? params.maxPrice : 0;

        const searchResult = ARTICLES.filter(function (article) {
            if (onlyStock && !article.isInStock()) {
                return false;
            }

            if ((type !== null) && !article.hasType(type)) {
                return false;
            }

            if (minPrice > 0) {
                if (article.isCheaper(minPrice)) {
                    return false;
                }
            }

            if (maxPrice > 0) {
                if (!article.isCheaper(maxPrice)) {
                    return false;
                }
            }
            return true;
        });

        if (searchResult.length === 0) {
            return Promise.reject(new ErrorResponse({
                statusCode: ServerStatuses.SERVER_STATUS_CODES.LIST_NOT_FOUND,
                code: ServerStatuses.SERVER_ERROR_CODES.LIST_NOT_FOUND,
                message: ServerStatuses.SERVER_ERROR_MESSAGE.LIST_NOT_FOUND
            }));
        }

        return Promise.resolve(new SuccessResponse({
            statusCode: ServerStatuses.SERVER_STATUS_CODES.DETAIL_OK,
            payload: searchResult
        }));
    }

    // AUX
    getRaw(articleId) {
        return ARTICLES.find((article) => (article.hasId(articleId)));
    }
}

module.exports = Articles;