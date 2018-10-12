'use strict';

module.exports = (router, contactControllers) => {

    router.post('/contact/item/:identifier', contactControllers.contact);

    return router;
};
