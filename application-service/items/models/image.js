'use strict';

const bookshelf = require('../../db/bookshelf');

const Image = bookshelf.Model.extend({
    tableName: 'images',
    hidden: ['id', 'item_id'],

    toJSON: function() {
        var attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments);
        attrs.path = process.env.IMAGES_BASE_URL;
        return attrs;
    }
});

module.exports = Image;
