const ROUTES = {
    ROOT: '/',
    ARTICLES_ROOT: '/articles',
    SEARCH: '/search'
};

module.exports = {
    // GET
    ROOT: () => (ROUTES.ROOT),
    ARTICLES_LIST: () => (ROUTES.ARTICLES_ROOT),
    ARTICLE_DETAIL: () => (`${ROUTES.ARTICLES_ROOT}/:articleId`),

    // POST
    SEARCH: () => (ROUTES.SEARCH)
};