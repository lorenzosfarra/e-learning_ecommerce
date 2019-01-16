/**
 * TODO: use .env file and/or NODE_ENV value to set base url to the valid
 * value.
 * Ex.: 
 * const env = process.env.NODE_ENV || 'development';
 * if (env === 'production') ...........
 */
const baseUrl = 'http://localhost:5000';

export const URLs = {
    ARTICLES_ROOT: '/articles',
    SEARCH_ROOT: '/search',
    CHECKOUT_PURCHASE_ROOT: '/checkout/purchase',

    // GET
    ARTICLES: () => (baseUrl + URLs.ARTICLES_ROOT),
    ARTICLE: (articleId) => (`${baseUrl}${URLs.ARTICLES_ROOT}/${articleId}`),

    // POST
    SEARCH: () => (baseUrl + URLs.SEARCH_ROOT),
    CHECKOUT_PURCHASE: () => (baseUrl + URLs.CHECKOUT_PURCHASE_ROOT)
};