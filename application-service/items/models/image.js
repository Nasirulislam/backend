'use strict';

const bookshelf = require('../../db/bookshelf');

const Image = bookshelf.Model.extend({
    tableName: 'images',
    hidden: ['id', 'item_id']
});

module.exports = Image;
