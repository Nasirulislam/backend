'use strict';

const bookshelf = require('../../db/bookshelf');

const Item = bookshelf.Model.extend({
    tableName: 'items'
});

module.exports = Item;
