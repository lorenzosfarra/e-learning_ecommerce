const StripePackage = require('stripe');
const STRIPE_SECRET_KEY = require('./Stripe/STRIPE_KEY');

const SuccessResponse = require('../common/SuccessResponse');
const ServerStatuses = require('../common/ServerStatusCodes');
import ErrorResponse from "../common/ErrorResponse";

const ArticlesClass = require('./articles/Articles');
const Articles = new ArticlesClass();

const DEFAULT_CURRENCY = 'eur';

class Stripe {

    constructor() {
        this.stripeApi = new StripePackage(STRIPE_SECRET_KEY);
        this.STRIPE_STATUS = {
            SUCCEDED: "succeeded",
            FAILED: "failed",
            PENDING: "pending"
        };
    }

    /**
     * Basically right now we just multiply by 100.
     * Stripe charge API states:
     * amount: positive integer or zero. A positive integer in the smallest currency unit
     * (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency) representing how much to charge.
     * @param price
     * @private
     */
    _realPrice(price) {
        return price * 100;
    }

    /**
     * Charge a user by its one-time token
     * @param articleId the ID of the article that the user is buying
     * @param tokenId the token ID from the stripe checkout client-side
     * @param currency? eur|etc... or null (default applies)
     */
    chargeCardOneTimeToken(articleId, tokenId, currency = DEFAULT_CURRENCY) {
        const article = Articles.getRaw(articleId);
        if (!article) {
            return Promise.reject(new ErrorResponse({
                statusCode: ServerStatuses.SERVER_STATUS_CODES.DETAIL_NOT_FOUND,
                code: ServerStatuses.SERVER_ERROR_CODES.DETAIL_NOT_FOUND,
                message: ServerStatuses.SERVER_ERROR_MESSAGE.DETAIL_NOT_FOUND
            }));
        }
        const price = article.getPrice();
        return this.stripeApi.charges
            .create({
                amount: this._realPrice(price), // Unit: cents
                currency: currency,
                source: tokenId,
                description: "Payment for " + article.getTitle(),
            })
            .then(result => {
                console.log("[FROM STRIPE]", result);

                if ((result.status === this.STRIPE_STATUS.SUCCEDED) && result.paid) {
                    const stripeInfo = {
                        id: result.transactionId,
                        paid: result.paid,
                        source: result.source
                    };

                    return Promise.resolve(new SuccessResponse({
                        statusCode: ServerStatuses.SERVER_STATUS_CODES.PURCHASE_OK,
                        payload: {
                            success: true,
                            info: stripeInfo
                        }
                    }))

                } else {
                    return Promise.reject(new ErrorResponse({
                        statusCode: (result.failure_code ? result.failure_code : ServerStatuses.SERVER_STATUS_CODES.PURCHASE_FAILED),
                        code: ServerStatuses.SERVER_STATUS_CODES.PURCHASE_FAILED,
                        message: (result.failure_message ? result.failure_message : ServerStatuses.SERVER_ERROR_MESSAGE.PURCHASE_FAILED)
                    }))
                }
            })
            .catch(error => {
                console.error("[FROM STRIPE]", error);
                return Promise.reject(new ErrorResponse({
                    statusCode: ServerStatuses.SERVER_STATUS_CODES.PURCHASE_FAILED,
                    code: ServerStatuses.SERVER_ERROR_CODES.PURCHASE_FAILED,
                    message: ServerStatuses.SERVER_ERROR_MESSAGE.PURCHASE_FAILED
                }));
            });
    }

}