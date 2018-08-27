'use strict';

const Item = require('../models/item');

const insertItemController = function(req, res) {
    const item = new Item({
        title: req.body.title,
        description: req.body.description,
        author_id: 2 // TODO: Needs auth to be implemented
    });
    
    // TODO: validation

    item.save()
        .then(function(saved) {
            res.json({ saved });
        });
};

module.exports = insertItemController;
