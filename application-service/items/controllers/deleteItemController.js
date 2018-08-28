'use strict';

const Joi = require('joi');
const Item = require('../models/item');

const deleteItemController = function(req, res) {

    const schema = { identifier: Joi.number() };
    const identifier = req.params.identifier;
    Joi.validate({ identifier }, schema, function(error, value) {
        if(error) {
            return res.status(404).send({ code: 2 });
        }

        Item.where('id', value.identifier)
            .destroy()
            .then(function() {
                res.status(200).json({ });
            })
            .catch(function() {
                res.status(404).send({ code: 2 });
            });
    });
};

module.exports = deleteItemController;
