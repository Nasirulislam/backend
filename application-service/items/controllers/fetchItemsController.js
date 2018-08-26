'use strict';

const Item = require('../models/item');

const fetchItemsController = function(req, res) {

    Item
        .fetchAll()
        .then(function(contacts) {
            res.json({ contacts });
        });
};

module.exports = fetchItemsController;
