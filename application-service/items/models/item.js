'use strict';

const bookshelf = require.main.require('./db/bookshelf');

const Item = bookshelf.Model.extend({
    tableName: 'items'
});

module.exports = Item;
