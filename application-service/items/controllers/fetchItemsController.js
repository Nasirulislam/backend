'use strict';

const Item = require('../models/item');

const fetchItemsController = function(req, res) {

    Item.query('orderBy', 'updated_at', 'desc')
        .fetchAll({ withRelated: ['images', 'author'] })
        .then(function(items) {
            res.status(200).json({ items });
        });
};

module.exports = fetchItemsController;
