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

        // TODO
        const resetPasswordUrl = 'http://whatever.com';

        mailer.sendMail({
            to: account.get('email'),
            subject: 'Reset password',
            text: `
                Hello,
                You recently selected the option ‘Forgot password’ of your GZM account.

                If you selected this option, you can reset your password within six hours by clicking on the following link:
                ${resetPasswordUrl}

                If you did not select this option, please ignore this e-mail.

                Thank you and kind regards,
                GZM Team`
            
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
