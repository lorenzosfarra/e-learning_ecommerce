const env = process.env.NODE_ENV || 'development';

let stripeSecretKeyRaw;

if (env === 'development') {
    // TODO: UPDATE STRIPE SECRET KEY
    stripeSecretKeyRaw = 'sk_test_Nougmh7BDmSRe1eT2LlR4Hx3';
} else {
    // Other stuff
}

module.exports = stripeSecretKeyRaw;