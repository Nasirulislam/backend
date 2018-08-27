'use strict';

const Item = require('../models/item');

const fetchSingleItemController = function(req, res) {

    let identifier;
    try {
        identifier = req.params.identifier;
    }
    catch(error) {
        return res.status(400).send({ code: 1 });
    }

    Item.where('id', identifier)
        .fetchAll()
        .then(function(item) {
            if(item.is) {
                res.status(200).json({ item });
            }
            else {
                res.status(400).send({ code: 2 });
            }
        });
};

module.exports = fetchSingleItemController;
