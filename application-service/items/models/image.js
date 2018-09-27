'use strict';

const bookshelf = require('../../db/bookshelf');

const Image = bookshelf.Model.extend({
    tableName: 'images'
});

module.exports = Image;
