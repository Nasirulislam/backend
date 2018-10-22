'use strict';

exports.seed = function(knex) {
    return knex('items').del()
        .then(function () {

            let items = [];
            for(let i=0; i<100; i++) {
                items.push({
                    id: i, 
                    title: `Dummy Ad #${i}`, 
                    description: `Description of the dummy ad #${i}`,
                    author_id: i%2+1,
                    created_at: new Date(Date.now() - i*1000),
                    updated_at: new Date(Date.now() - i*1000)
                });
            }

            return knex('items').insert(items);
        });
};
