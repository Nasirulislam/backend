'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');
const Account = require('../models/account');

const registerAccountController = function(req, res) {
 
    const schema = {
        username: Joi.string().trim().max(100).min(2).required(),
        email: Joi.string().email().required(), 
        password: Joi.string().min(4).required()
    };
 
    const account = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    Joi.validate(account, schema, async function(error, value) {
        if (error) {
            let path = error.details[0].path[0];
            if (path === 'username') {
                return res.status(400).send({ code: 9 });
            }
            else if (path === 'email') {
                return res.status(400).send({ code: 10 });
            }
            else if (path === 'password') {
                return res.status(400).send({ code: 11 });
            }
            else {
                return res.status(400).send({ code: error });
            }
        }

        const accountByEmail = await Account.where('email', value.email).fetch();
        if (accountByEmail) {
            return res.status(400).json({ code: 7 });
        }
        
        const accountByUsername = await Account.where('username', value.username).fetch();
        if (accountByUsername) {
            return res.status(400).json({ code: 8 });
        }

        value.salt = await bcrypt.genSalt();
        value.password = await bcrypt.hash(value.password, value.salt);
        const newAccount = new Account(value);
        newAccount.save()
            .then(function(savedAccount) {
                return res.status(200).json({
                    account: {
                        id: savedAccount.get('id'),
                        email: savedAccount.get('email'),
                        username: savedAccount.get('username')
                    }
                });
            })
            .catch(function() {
                return res.status(500);
            });
    });
};

module.exports = registerAccountController;
