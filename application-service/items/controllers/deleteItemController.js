'use strict';

const knex = require.main.require('./db/knex');

const deleteItemController = function(req, res) {

    let identifier;
    try {
        identifier = req.params.identifier;
    }
    catch(error) {
        return res.status(400).send({ code: 8, error: 'Missing item identifier' });
    }

    knex('items')
        .where('id', identifier)
        .delete()
        .then(function(success) {
            if (success) {
                return res.status(200).send({});
            }
            else {
                return res.status(500).send({ code: 13, error: 'Delete item failed' });
            }
        });
};

module.exports = deleteItemController;
