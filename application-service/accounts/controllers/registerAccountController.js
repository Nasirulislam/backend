'use strict';

const Joi = require('joi');
const Account = require('../models/account');

const registerAccountController = function(req, res) {

        
    const account = new Account(req.body);
    account.save()
        .then(function(item) {
            return res.status(200).json({ item });
        });
};

module.exports = registerAccountController;
