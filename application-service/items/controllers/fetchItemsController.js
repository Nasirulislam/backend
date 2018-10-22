'use strict';

const Joi = require('joi');
const Item = require('../models/item');

const fetchItemsController = function(req, res) {

    const schema = { page: Joi.number().min(1).default(1) };

    const page = req.query.page || 1;
    Joi.validate({ page }, schema, function(error, value) {
        if(error) {
            return res.status(400).send({ code: 16 });
        }

        Item.query('orderBy', 'updated_at', 'desc')
            .fetchPage({
                page: value.page,
                withRelated: ['images', 'author']
            })
            .then(function(items) {
                res.status(200).json({ 
                    total: items.pagination.rowCount,
                    page: items.pagination.page,
                    items
                });
            });

    });
};

module.exports = fetchItemsController;
