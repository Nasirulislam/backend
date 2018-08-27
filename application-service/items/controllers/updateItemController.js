'use strict';

const Item = require('../models/item');

const updateItemController = function(req, res) {

    let identifier;
    try {
        identifier = req.params.identifier;
    }
    catch(error) {
        return res.status(400).send({ code: 1 });
    }

    Item.where('id', identifier)
        .fetch()
        .then(function(item) {
            item.save({
                title: req.body.title,
                description: req.body.description,
            }).then(function(saved) {
                res.json({ saved });
            });
        })
        .catch(function() {
            res.status(400).send({ code: 5 });
        });
};

module.exports = updateItemController;
