'use strict';

const auth = require('../middleware/auth');

module.exports = (router, imageControllers) => {
    router.post('/images', auth, imageControllers.uploadImage);
    router.get('/images/:identifier', imageControllers.image);

    return router;
};
