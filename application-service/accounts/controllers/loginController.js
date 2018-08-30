
const bcrypt = require('bcrypt');
const Joi = require('joi');
const Account = require('../models/account');

const loginController = function(req, res) {

    const schema = {
        email: Joi.string().email().required(), 
        password: Joi.string().required()
    };
 
    const credentials = {
        email: req.body.email,
        password: req.body.password
    };

    Joi.validate(credentials, schema, async function(error, value) {
        if (error) {
            return res.status(400).send({ });
        }

        const accountByEmail = await Account.where('email', value.email).fetch();
        if (!accountByEmail) {
            return res.status(400).json({ code: 1 });
        }

        let validPassword = await bcrypt.compare(value.password, accountByEmail.get('password'));
        if (!validPassword) {
            return res.status(400).json({ code: 1 });
        }
        
        res.status(200).json({ 'Validated' : 'LoginController' });

    });
};

module.exports = loginController;