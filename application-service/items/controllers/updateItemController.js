'use strict';

const Item = require('../models/item');

const updateItemController = function(req, res) {

    Item.where('id', req.params.identifier)
        .fetch()
        .then(function(item) {
            item.save({
                title: req.body.title,
                description: req.body.description,
            }).then(function(saved) {
                res.json({ saved });
            });
        });
};

module.exports = updateItemController;
