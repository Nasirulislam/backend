'use strict';

module.exports = (router, locationsControllers) => {

    router.get('/locations', locationsControllers.fetchLocations);

    return router;
};
