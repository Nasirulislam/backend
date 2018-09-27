'use strict';

const Image = require('./image');
const Account = require('../../accounts/models/account');

const bookshelf = require('../../db/bookshelf');

const Item = bookshelf.Model.extend({
    tableName: 'items',
    hidden: ['author_id'],

    author: function() {
        return this.belongsTo(Account, 'author_id');
    },
    images: function() {
        return this.hasMany(Image);
    }
});

module.exports = Item;
