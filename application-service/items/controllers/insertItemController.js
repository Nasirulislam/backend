'use strict';

const Joi = require('joi');
const Item = require('../models/item');

const insertItemController = function(req, res) {
    
    const schema = {
        title: Joi.string().trim().max(100).min(4).required(),
        description: Joi.string().trim().max(1000).min(10).required(), 
        author_id: Joi.number().required()
    };
 
    const item = {
        title: req.body.title,
        description: req.body.description,
        author_id: req.user.id
    };

    Joi.validate(item, schema, function(error, value) {
        if (error) {
            let path = error.details[0].path[0];
            if (path === 'title') {
                return res.status(400).send({ code: 5 });
            }
            else if (path === 'description') {
                return res.status(400).send({ code: 6 });
            }
            else {
                return res.status(400).send({ code: error });
            }
        }
        
        const newItem = new Item(value);
        newItem.save()
            .then(function(savedItem) {
                return res.status(200).json({
                    id: savedItem.get('id'),
                    title: savedItem.get('title'),
                    description: savedItem.get('description'),
                    author_id: savedItem.get('author_id')
                });
            })
            .catch(function() {
                return res.status(500);
            });
    });
};

module.exports = insertItemController;
