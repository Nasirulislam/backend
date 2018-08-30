
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
            let path = error.details[0].path[0];
            if (path === 'email') {
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
        if (!accountByEmail) {
            return res.status(400).json({ code: 1 });
        }

        let validPassword = await bcrypt.compare(value.password, accountByEmail.get('password'));
        if (!validPassword) {
            return res.status(400).json({ code: 1 });
        }

        const token = jwt.sign({ 
            id: accountByEmail.get('id'),
            username: accountByEmail.get('username')
        }, process.env.JWT_SECRET);

        res.status(200).json({ token });
    });
};

module.exports = loginController;