
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Account = require('../models/account');

const loginController = function(req, res) {
 
    const schema = Joi.object()
        .keys({
            username: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().required()
        })
        .xor('username', 'email');

    const credentials = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    Joi.validate(credentials, schema, async function(error, value) {
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

        let account;
        if (value.email) {
            account = await Account.where('email', value.email).fetch();
        }
        else if (value.username) {
            account = await Account.where('username', value.username).fetch();
        }

        if (!account) {
            return res.status(400).json({ code: 1 });
        }

        let validPassword = await bcrypt.compare(value.password, account.get('password'));
        if (!validPassword) {
            return res.status(400).json({ code: 1 });
        }

        const token = jwt.sign({ 
            id: account.get('id'),
            username: account.get('username')
        }, process.env.JWT_SECRET);

        res.status(200).json({ token });
    });
};

module.exports = loginController;