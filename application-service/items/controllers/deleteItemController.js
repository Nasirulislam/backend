'use strict';

const Item = require('../models/item');

const deleteItemController = function(req, res) {

    Item.where('id', req.params.identifier)
        .destroy()
        .then(function(destroyed) {
            res.json({ destroyed });
        });
};

module.exports = deleteItemController;
