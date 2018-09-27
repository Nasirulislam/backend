'use strict';

const bookshelf = require('../../db/bookshelf');

const Account = bookshelf.Model.extend({
    tableName: 'accounts',
    hidden: ['password', 'salt', 'created_at', 'updated_at', 'is_verified', 'email']
});

module.exports = Account;
