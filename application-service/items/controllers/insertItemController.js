'use strict';

const Joi = require('joi');
const Item = require('../models/item');
const Image = require('../models/image');

const insertItemController = function(req, res) {
    
    const schema = {
        title: Joi.string().trim().max(100).min(4).required(),
        description: Joi.string().trim().max(1000).min(10).required(), 
        author_id: Joi.number().required(),
        images: Joi.array().items(Joi.string().regex(/^(.*)\.png/))
    };
 
    const item = {
        title: req.body.title,
        description: req.body.description,
        author_id: req.user.id,
        images: req.body.images
    };

    Joi.validate(item, schema, async function(error, value) {
        if (error) {
            let path = error.details[0].path[0];
            if (path === 'title') {
                return res.status(400).send({ code: 5 });
            }
            else if (path === 'description') {
                return res.status(400).send({ code: 6 });
            }
            else if (path === 'images') {
                return res.status(400).send({ code: 12 });
            }
            else {
                return res.status(400).send({ code: error });
            }
        }
        
        const newItem = new Item({
            title: value.title,
            description: value.description,
            author_id: value.author_id
        });

        const savedItem = await newItem.save();

        if (savedItem) {
            await saveImages(savedItem.get('id'), value.images);

            Item.where('id', savedItem.get('id'))
                .fetch({ withRelated: ['images', 'author'] })
                .then(function(item) {
                    if(item) {
                        return res.status(200).json({ item: item });      
                    }
                    else {
                        return res.status(404).send({ code: 2 });
                    }
                });
        }
    });
};

const saveImages = async function(itemId, images) {
    const savedImages = [];

    if (!images) { 
        return savedImages;
    }

    for (let i=0; i<images.length; i++) {
        const image = images[i];
        const newImage = new Image({
            item_id: itemId,
            image: image
        });

        const savedImage = await newImage.save();
        savedImages.push(savedImage.get('image'));
    }

    return savedImages;
};

module.exports = insertItemController;
