const Joi = require('joi');
const Account = require('../models/account');
const bcrypt = require('bcrypt');

const changePasswordController = function(req, res) {
     
    const schema = {
        old: Joi.string().required(),
        password: Joi.string().required()
    };

    const changePasswordRequest = {
        old: req.body.old,
        password: req.body.password
    };

    Joi.validate(changePasswordRequest, schema, async function(error, value) {
        if (error) {
            let path = error.details[0].path[0];
            if (path === 'old') {
                return res.status(400).send({ code: 11 });
            }
            else if (path === 'password') {
                return res.status(400).send({ code: 13 });
            }
            else {
                return res.status(400).send({ error });
            }
        }

        const accountById = await Account.where('id', req.user.id).fetch();
        if (!accountById) {
            return res.status(400).json({ code: 4 });
        }

        let validPassword = await bcrypt.compare(value.old, accountById.get('password'));
        if (!validPassword) {
            return res.status(400).json({ code: 1 });
        }

        // TODO: Edit password
        res.status(200).json({ 'changePasswordController' : 'Hello' });
    });
};

module.exports = changePasswordController;