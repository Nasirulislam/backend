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
    },

    toJSON: function () {
        var attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments);
        attrs.created_at = new Date(this.get('created_at')).getTime();
        attrs.updated_at = new Date(this.get('updated_at')).getTime();
        return attrs;
    }
});

module.exports = Item;
