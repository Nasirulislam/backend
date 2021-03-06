'use strict';

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
  
    }).createTable('locations', function(table) {
        table.increments();
        table.string('name').notNullable();

    }).createTable('items', function(table) {
        table.increments();
        table.integer('author_id').unsigned().references('id').inTable('accounts').notNullable();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.integer('location_id').unsigned().references('id').inTable('locations').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        
    }).createTable('images', function(table) {
        table.increments();
        table.integer('item_id').unsigned().references('id').inTable('items').notNullable().onDelete('CASCADE');
        table.string('image').notNullable();
        
    });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('items')
        .dropTable('accounts');
};
