'use strict';

const auth = require('../middleware/auth');

module.exports = (router, accountControllers) => {
    router.post('/accounts', accountControllers.registerAccount);
    router.post('/accounts/login', accountControllers.login);
    router.post('/accounts/logout', auth, accountControllers.logout);
    router.get('/accounts/me', auth, accountControllers.me);
    router.post('/accounts/password', auth, accountControllers.changePassword);

    return router;
};
