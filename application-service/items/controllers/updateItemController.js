'use strict';

const Joi = require('joi');
const Item = require('../models/item');

const updateItemController = function(req, res) {

    const schema = { identifier: Joi.number() };
    const identifier = req.params.identifier;
    Joi.validate({ identifier }, schema, function(error, value) {
        if(error) {
            return res.status(404).send({ code: 2 });
        }

        Item.where('id', value.identifier)
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
                res.status(404).send({ code: 2 });
            });
    });
};

module.exports = updateItemController;
