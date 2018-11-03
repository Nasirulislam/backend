'use strict';

const Joi = require('joi');
const Item = require('../models/item');

const fetchItemsController = function(req, res) {

    const schema = {
        page: Joi.number().min(1).default(1),
        term: Joi.string().allow('').max(1000).default('').trim(),
        location_id: Joi.number().min(1).max(26),
        author_id: Joi.number()
    };

    const fethRequest = {
        page: req.query.page,
        term: req.query.term,
        location_id: req.query.location_id,
        author_id: req.query.author_id
    };

    Joi.validate(fethRequest, schema, function(error, value) {
        if(error) {
            let path = error.details[0].path[0];
            if (path === 'page') {
                return res.status(400).send({ code: 16 });
            }
            else if (path === 'term') {
                return res.status(400).send({ code: 18 });
            }
            else if (path === 'author_id') {
                return res.status(400).send({ code: 17 });
            }
            else if (path === 'location_id') {
                return res.status(400).send({ code: 19 });
            }
            else {
                return res.status(400).send({ code: error });
            }
        }

        Item.query(
            (qb) => {
                qb.where(function() {
                    this.where('title', 'LIKE', `%${value.term}%`)
                        .orWhere('description', 'LIKE', `%${value.term}%`);
                });

                if (value.location_id) {
                    qb.andWhere('location_id', '=', value.location_id);
                }

                if (value.author_id) {
                    qb.andWhere('author_id', '=', value.author_id);
                }
            })
            .orderBy('-updated_at')
            .fetchPage({
                page: value.page,
                pageSize: 50,
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
