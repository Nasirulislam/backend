'use strict';

module.exports = (router, itemsControllers) => {

    router.get('/items', itemsControllers.fetchItems);
    router.get('/items/:identifier', itemsControllers.fetchSingleItem);
    router.post('/items', itemsControllers.insertItem);
    router.put('/items', itemsControllers.updateItem);
    router.delete('/items/:identifier', itemsControllers.deleteItem);

    return router;
};
