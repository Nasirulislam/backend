'use strict';

const Item = require('../models/item');

const fetchItemsController = function(req, res) {

    Item.fetchAll()
        .then(function(items) {
            res.status(200).json({ items });
        });
};

module.exports = fetchItemsController;
