'use strict';

const Joi = require('joi');
const Item = require('../models/item');

const fetchSingleItemController = function(req, res) {

    const schema = { identifier: Joi.number() };
    const identifier = req.params.identifier;
    Joi.validate({ identifier }, schema, function(error, value) {
        if(error) {
            return res.status(404).send({ code: 2 });
        }

        Item.where('id', value.identifier)
            .fetch()
            .then(function(item) {
                if(item) {
                    res.status(200).json({ item: item });      
                }
                else {
                    res.status(404).send({ code: 2 });
                }
            });
    });
};

module.exports = fetchSingleItemController;
