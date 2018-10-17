'use strict';

const Joi = require('joi');
const mailer = require('../../mail/mailer');
const Account = require('../models/account');

const forgotPasswordController = function(req, res) {

    const schema = Joi.object()
        .keys({
            username: Joi.string(),
            email: Joi.string().email()
        })
        .xor('username', 'email');

    const requestForgotPassword = {
        username: req.body.username,
        email: req.body.email
    };

    Joi.validate(requestForgotPassword, schema, async function(error, value) {
        if (error) {
            let path = error.details[0].path[0];
            if (path === 'username') {
                return res.status(400).send({ code: 9 });
            }
            else if (path === 'email') {
                return res.status(400).send({ code: 10 });
            }
            else {
                return res.status(400).send({ code: error });
            }
        }

        let account;
        if (value.email) {
            account = await Account.where('email', value.email).fetch();
        }
        else if (value.username) {
            account = await Account.where('username', value.username).fetch();
        }

        if (!account) {
            if (value.email) {
                return res.status(400).json({ code: 10 });
            }
            else {
                return res.status(400).json({ code: 9 });
            }
        }

        mailer.sendMail({
            to: account.get('email'),
            subject: 'GZM: Forgot password confirmation',
            text: 'Hello world?',
            html: '<b>Hello world?</b>'
            
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

module.exports = forgotPasswordController;