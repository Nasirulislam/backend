'use strict';

module.exports = (router) => {    
    router.use(function(req, res) {
        return res.status(404).send({ error: 'Page not found' });
    });

    return router;
};
