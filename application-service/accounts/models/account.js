'use strict';

const bookshelf = require('../../db/bookshelf');

const Account = bookshelf.Model.extend({
    tableName: 'accounts',
    hidden: ['password', 'salt', 'created_at', 'updated_at', 'is_verified', 'email'],

    toJSON: function() {
        var attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments);
        attrs.image = `${process.env.IMAGES_BASE_URL}accounts/${this.get('id')}`;
        return attrs;
    }
});

module.exports = Account;
