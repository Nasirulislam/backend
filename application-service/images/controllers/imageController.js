'use strict';

const Joi = require('joi');

const imageController = function(req, res) {
    
    const schema = { identifier: Joi.string().alphanum() };
    const identifier = req.params.identifier;
    Joi.validate({ identifier }, schema, function(error, value) {
        if(error) {
            return res.status(404).send({ code: 12 });
        }

        res.redirect(process.env.IMAGES_BASE_URL + value.identifier);
    });
};

module.exports = imageController;
