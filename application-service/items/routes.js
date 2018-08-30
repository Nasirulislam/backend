'use strict';

const auth = require('../middleware/auth');

module.exports = (router, itemsControllers) => {

    router.get('/items', itemsControllers.fetchItems);
    router.get('/items/:identifier', itemsControllers.fetchSingleItem);
    router.post('/items', auth, itemsControllers.insertItem);
    router.put('/items/:identifier', itemsControllers.updateItem);
    router.delete('/items/:identifier', auth, itemsControllers.deleteItem);

    return router;
};
