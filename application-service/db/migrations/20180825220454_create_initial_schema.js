
exports.up = function(knex) {
    return knex.schema.createTable('accounts', function(table) {
        table.increments();
        table.boolean('is_verified').notNullable().defaultsTo(false);
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('salt').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.unique('username');
        table.unique('email');

    }).createTable('items', function(table) {
        table.increments();
        table.integer('author_id').unsigned().references('id').inTable('accounts').notNullable();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

    });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('items')
        .dropTable('accounts');
};
