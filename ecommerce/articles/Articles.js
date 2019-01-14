// Import SuccessResponse
const SuccessResponse = require('../common/SuccessResponse');
// Import ErrorResponse
const ErrorResponse = require('../common/ErrorResponse');
const ServerStatuses = require('../common/ServerStatusCodes');

// List of articles
const ARTICLES = require('../constants/Articles');

class Articles {
    /**
     * Returns the list of all the articles
     * @returns {Promise<SuccessResponse>}
     */
    all() {
        return Promise.resolve(new SuccessResponse({
            statusCode: ServerStatuses.SERVER_STATUS_CODES.LIST_OK,
            payload: ARTICLES
        }));
    }

    /**
     * Returns the article identified by articledId, or an error if articleId does not match any article ID
     * @param {string} articleId
     * @returns Promise<SuccessResponse>|Promise<ErrorResponse>
     */
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
        const onlyStock = params.inStock ? (Number.parseInt(params.inStock) === 1): false;
        const type = params.type ? params.type : null;
        const filterType = (type !== null);
        const title = params.title ? params.title : null;
        const filterTitle = (title !== null);

        const searchResult = ARTICLES.filter(article => {
            if (onlyStock && !article.isInStock()) {
                return false;
            }

            if (filterTitle && !article.titleContains(title)) {
                return false;
            }

            if (filterType && !article.hasType(type)) {
                return false;
            }

            // SAME FOR TYPE, PRICE, etc....
            return true;
        });

        if (searchResult.length === 0) {
            return Promise.reject(new ErrorResponse({
                statusCode: ServerStatuses.SERVER_STATUS_CODES.LIST_NOT_FOUND,
                code: ServerStatuses.SERVER_ERROR_CODES.LIST_NOT_FOUND,
                message: ServerStatuses.SERVER_ERROR_MESSAGE.LIST_NOT_FOUND,
            }));
        }

        return Promise.resolve(new SuccessResponse({
            statusCode: ServerStatuses.SERVER_STATUS_CODES.LIST_OK,
            payload: searchResult
        }));
    }

    /****** AUX FUNCTIONS ******/
    getRaw(articleId) {
        return ARTICLES.find((article) => (article.hasId(articleId)));
    }
}

module.exports = Articles;
