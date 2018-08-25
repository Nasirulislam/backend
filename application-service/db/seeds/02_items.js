'use strict';

exports.seed = function(knex) {
    return knex('items').del()
        .then(function () {
            return knex('items').insert([
                {
                    id: 1, 
                    title: 'Dummy Ad #1', 
                    description: 'Description of the dummy ad #1',
                    author_id: '1',
                },
                {
                    id: 2, 
                    title: 'Dummy Ad #2', 
                    description: 'Description of the dummy ad #2',
                    author_id: '1',
                },
            ]);
        });
};
