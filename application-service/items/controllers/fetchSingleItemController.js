'use strict';

const Item = require('../models/item');

const fetchSingleItemItemController = function(req, res) {

    Item.where('id', req.params.identifier)
        .fetchAll()
        .then(function(items) {
            res.json({ items });
        });
};

module.exports = fetchSingleItemItemController;
