'use strict';

const auth = require('../middleware/auth');

module.exports = (router, accountControllers) => {
    router.post('/accounts', accountControllers.registerAccount);
    router.post('/accounts/login', accountControllers.login);
    router.get('/accounts/me', auth, accountControllers.me);

    return router;
};
