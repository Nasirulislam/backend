'use strict';

module.exports = (router, accountControllers) => {
    router.post('/accounts', accountControllers.registerAccount);
    router.post('/accounts/login', accountControllers.login);

    return router;
};
