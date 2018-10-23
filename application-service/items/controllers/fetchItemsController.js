'use strict';

const Joi = require('joi');
const Item = require('../models/item');

const fetchItemsController = function(req, res) {

    const schema = {
        page: Joi.number().min(1).default(1),
        author: Joi.number(),
        term: Joi.string().max(1000).default('')
    };

    const fethRequest = {
        page: req.query.page,
        author: req.query.author,
        term: req.query.term
    };

    Joi.validate(fethRequest, schema, function(error, value) {
        if(error) {
            let path = error.details[0].path[0];
            if (path === 'page') {
                return res.status(400).send({ code: 16 });
            }
            else if (path === 'author') {
                return res.status(400).send({ code: 17 });
            }
            else if (path === 'term') {
                return res.status(400).send({ code: 18 });
            }
            else {
                return res.status(400).send({ code: error });
            }
        }

        Item.query(
            (qb) => {
                qb.where('title', 'LIKE', `%${value.term}%`);
                qb.orWhere('description', 'LIKE', `%${value.term}%`);
            })
            .orderBy('-updated_at')
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
