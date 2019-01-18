// Retrieve the Stripe secret key
const STRIPE_CONFIG = require('../config/Stripe');

// Require Stripe with the key
const stripeApi = require('stripe')(STRIPE_CONFIG.STRIPE_SECRET_KEY);

// Import SuccessResponse
const SuccessResponse = require('../common/SuccessResponse');
// Import ErrorResponse
const ErrorResponse = require('../common/ErrorResponse');
const ServerStatuses = require('../common/ServerStatusCodes');

const ArticlesClass = require('../articles/Articles');
const Articles = new ArticlesClass();

class Stripe {

    constructor() {
        this.stripeApi = stripeApi;
        this.DEFAULT_CURRENCY = 'eur';
    }

    /**
     * According to stripe definition, we multiply by 100.
     * @param {Article} article
     * @returns {number}
     * @private
     */
    _getArticlePrice(article) {
        return Number.parseInt(article.price * 100);
    }

    chargeCardOneTimeToken(articleId, tokenId, currency = this.DEFAULT_CURRENCY) {
        const article = Articles.getRaw(articleId);

        if (!article) {
            return Promise.reject(new ErrorResponse({
                statusCode: ServerStatuses.SERVER_STATUS_CODES.DETAIL_NOT_FOUND,
                code: ServerStatuses.SERVER_ERROR_CODES.DETAIL_NOT_FOUND,
                message: ServerStatuses.SERVER_ERROR_MESSAGE.DETAIL_NOT_FOUND
            }));
        }

        // We have the article!
        const articlePrice = this._getArticlePrice(article);

        return this.stripeApi.charges
            .create({
                amount: articlePrice,
                currency: currency,
                source: tokenId,
                description: article.title
            })
            .then(result => {
                console.log("[FROM STRIPE]", result);
                // Assuming everything is fine here
                const transactionId = result.id;
                return Promise.resolve(new SuccessResponse({
                    statusCode: ServerStatuses.SERVER_STATUS_CODES.PURCHASE_OK,
                    payload: transactionId
                }))
            })
            .catch(error => {
                console.error("[STRIPE ERROR]", error);

                const errorMessage = error.message ? error.message : ServerStatuses.SERVER_ERROR_MESSAGE.PURCHASE_FAILED;
                const errorCode = ServerStatuses.SERVER_ERROR_CODES.PURCHASE_FAILED + (error.code ? `_${error.code}`: '');

                return Promise.reject(new ErrorResponse({
                    statusCode: ServerStatuses.SERVER_STATUS_CODES.PURCHASE_FAILED,
                    code: errorCode,
                    message: errorMessage
                }))
            })
    }
}

module.exports = Stripe;