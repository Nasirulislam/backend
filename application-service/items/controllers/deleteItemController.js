'use strict';

const Joi = require('joi');
const Item = require('../models/item');

const deleteItemController = function(req, res) {

    const schema = { identifier: Joi.number() };
    const identifier = req.params.identifier;
    Joi.validate({ identifier }, schema, async function(error, value) {
        if(error) {
            return res.status(404).send({ code: 2 });
        }

        const itemById = await Item.where('id', value.identifier).fetch();
        if (!itemById) {
            return res.status(404).send({ code: 2 });
        }

        if (itemById.get('author_id') === req.user.id) {
            itemById.destroy()
                .then(function() {
                    return res.status(200).json({ });
                })
                .catch(function() {
                    res.status(404).send({ code: 2 });
                });
        }
        else {
            return res.status(401).send({ code: 4 });

        }
    });
};

module.exports = deleteItemController;
