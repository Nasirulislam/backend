'use strict';

const Joi = require('joi');
const Item = require('../../items/models/item');
const Account = require('../../accounts/models/account');
const mailer = require('../../mail/mailer');

const contactItemController = function(req, res) {
    
    const schema = {
        identifier: Joi.number().required(),
        from: Joi.string().email().required(),
        message: Joi.string().required()
    };
 
    const contactRequest = {
        identifier: req.params.identifier,
        from: req.body.from,
        message: req.body.message
    };

    Joi.validate(contactRequest, schema, async function(error, value) {
        if(error) {
            let path = error.details[0].path[0];
            if (path === 'identifier') {
                return res.status(400).send({ code: 2 });
            }
            else if (path === 'from') {
                return res.status(400).send({ code: 10 });
            }
            else if (path === 'message') {
                return res.status(400).send({ code: 15 });
            }
            else {
                return res.status(400).send({ code: error });
            }
        }
        
        const item = await Item.where('id', value.identifier).fetch();
        if(!item) {
            return res.status(404).send({ code: 2 });
        }

        const author = await Account.where('id', item.get('author_id')).fetch();
        if(!author) {
            return res.status(404).send({ code: 2 });
        }

        mailer.sendMail({
            to: author.get('email'),
            subject: 'GZM: A person is interested in your item',
            replyTo: value.from,
            text: value.message,
            html: `<b>${value.message}</b>`

        }, function(error) {
            if (error) {
                res.status(400).json({ code: 14 });
            }
            else {
                res.status(200).json({ });
            }
        });

    });    
};

module.exports = contactItemController;
