'use strict';

const Joi = require('joi');
const Item = require('../models/item');

const updateItemController = function(req, res) {

    const schema = {
        identifier: Joi.number(),
        title: Joi.string().trim().max(100).min(4),
        description: Joi.string().trim().max(1000).min(10),
        location_id: Joi.number().min(1).max(26),
        author_id: Joi.number().required(),
    };

    const item = {
        identifier: req.params.identifier,
        title: req.body.title,
        description: req.body.description,
        location_id: req.body.location_id,
        author_id: req.user.id,
    };

    Joi.validate(item, schema, async function(error, value) {
        if (error) {
            let path = error.details[0].path[0];
            if (path === 'identifier') {
                return res.status(404).send({ code: 2 });
            }
            if (path === 'title') {
                return res.status(400).send({ code: 5 });
            }
            else if (path === 'description') {
                return res.status(400).send({ code: 6 });
            }
            else if (path === 'location_id') {
                return res.status(400).send({ code: 19 });
            }
            if (path === 'author_id') {
                return res.status(404).send({ code: 3 });
            }
            else {
                return res.status(400).send({ code: error });
            }
        }

        const itemById = await Item.where('id', value.identifier).fetch();
        if (!itemById) {
            return res.status(404).send({ code: 2 });
        }

        if (itemById.get('author_id') === value.author_id) {

            if (value.title) {
                itemById.set('title', value.title);
            }

            if (value.description) {
                itemById.set('description ', value.description);
            }

            if (value.location_id) {
                itemById.set('location_id', value.location_id);
            }

            const savedItem = await itemById.save();

            if (savedItem) {
                return res.status(200).json({ item: savedItem });
            }
            else {
                return res.status(500).json({});
            }
        }
        else {
            return res.status(401).send({ code: 4 });
        }
    });
};

module.exports = updateItemController;
