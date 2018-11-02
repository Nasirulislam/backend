'use strict';

exports.seed = function(knex) {
    return knex('locations').del()
        .then(function () {
            return knex('locations').insert([
                {
                    id: 1,
                    name: 'aargau',
                    image: 'XXXXXX'
                },
                {
                    id: 2,
                    name: 'appenzellAusserrhoden',
                    image: 'XXXXXX'
                },
                {
                    id: 3,
                    name: 'appenzellInnerrhoden',
                    image: 'XXXXXX'
                },
                {
                    id: 4,
                    name: 'baselLandSchaft',
                    image: 'XXXXXX'
                },
                {
                    id: 5,
                    name: 'baselStadt',
                    image: 'XXXXXX'
                },
                {
                    id: 6,
                    name: 'bern',
                    image: 'XXXXXX'
                },
                {
                    id: 7,
                    name: 'fribourg',
                    image: 'XXXXXX'
                },
                {
                    id: 8,
                    name: 'geneva',
                    image: 'XXXXXX'
                },
                {
                    id: 9,
                    name: 'glarus',
                    image: 'XXXXXX'
                },
                {
                    id: 10,
                    name: 'grisons',
                    image: 'XXXXXX'
                },
                {
                    id: 11,
                    name: 'jura',
                    image: 'XXXXXX'
                },
                {
                    id: 12,
                    name: 'luzern',
                    image: 'XXXXXX'
                },
                {
                    id: 13,
                    name: 'neuchatel',
                    image: 'XXXXXX'
                },
                {
                    id: 14,
                    name: 'nidwalden',
                    image: 'XXXXXX'
                },
                {
                    id: 15,
                    name: 'obwalden',
                    image: 'XXXXXX'
                },
                {
                    id: 16,
                    name: 'schaffhausen',
                    image: 'XXXXXX'
                },
                {
                    id: 17,
                    name: 'schwyz',
                    image: 'XXXXXX'
                },
                {
                    id: 18,
                    name: 'solothurn',
                    image: 'XXXXXX'
                },
                {
                    id: 19,
                    name: 'stgallen',
                    image: 'XXXXXX'
                },
                {
                    id: 20,
                    name: 'ticino',
                    image: 'XXXXXX'
                },
                {
                    id: 21,
                    name: 'thurgau',
                    image: 'XXXXXX'
                },
                {
                    id: 22,
                    name: 'uri',
                    image: 'XXXXXX'
                },
                {
                    id: 23,
                    name: 'valais',
                    image: 'XXXXXX'
                },
                {
                    id: 24,
                    name: 'vaud',
                    image: 'XXXXXX'
                },
                {
                    id: 25,
                    name: 'zuerich',
                    image: 'XXXXXX'
                },
                {
                    id: 26,
                    name: 'zug',
                    image: 'XXXXXX'
                }
            ]);
        });
};
