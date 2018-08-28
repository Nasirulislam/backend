'use strict';

module.exports = (router, accountControllers) => {
    router.post('/accounts', accountControllers.registerAccount);

    return router;
};
