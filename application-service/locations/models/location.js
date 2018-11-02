'use strict';

const bookshelf = require('../../db/bookshelf');

const Location = bookshelf.Model.extend({
    tableName: 'locations'
});

module.exports = Location;
