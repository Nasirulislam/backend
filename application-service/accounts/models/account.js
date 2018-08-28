'use strict';

const bookshelf = require('../../db/bookshelf');

const Account = bookshelf.Model.extend({
    tableName: 'accounts'
});

module.exports = Account;
