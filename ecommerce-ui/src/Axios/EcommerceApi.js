import {URLs} from "../config/URLs";
import axios from "axios";

export class EcommerceApi {

    getArticles() {
        return axios({
            method: 'get',
            url: URLs.ARTICLES()
        })
            .then(res => {
                console.log("[AXIOS GET OK]", res.data);
                return Promise.resolve(res.data);
            })
            .catch(error => {
                console.error("[AXIOS GET FAIL]", error);
                // TODO do something to gracefully fail!
                return Promise.reject(error);
            })
    }

    searchArticles(searchParams) {
        return axios({
            method: 'post',
            url: URLs.SEARCH(),
            //headers: this._getHeaders(),
            data: searchParams
        })
            .then(res => {
                console.log("[AXIOS POST OK]", res.data);
                return Promise.resolve(res.data);
            })
            .catch(error => {
                console.error("[AXIOS POST FAIL]", error);
                // TODO do something to gracefully fail!
                return Promise.reject(error);
            })
    }

    stripePayWithToken(articleId, tokenId) {
        const data = {
            articleId: articleId,
            tokenId: tokenId
        };

        return axios({
            method: 'post',
            url: URLs.CHECKOUT_PURCHASE(),
            data: data
        })

            .then(res => {
                return Promise.resolve(res.data);
            })

            .catch(error => {
                console.error("[STRIPE ERROR]", error);

                if (error.response) {
                    if (error.response.data) {
                        return Promise.reject(error.response.data);
                    }
                }
                return Promise.reject(error);
            })
    }
}