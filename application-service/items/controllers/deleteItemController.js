'use strict';

const Item = require('../models/item');

const deleteItemController = function(req, res) {

    let identifier;
    try {
        identifier = req.params.identifier;
    }
    catch(error) {
        return res.status(400).send({ code: 1 });
    }

    Item.where('id', identifier)
        .destroy()
        .then(function(destroyed) {
            res.json({ destroyed });
        });
};

module.exports = deleteItemController;
