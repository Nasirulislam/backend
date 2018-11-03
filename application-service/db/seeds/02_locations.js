'use strict';

exports.seed = function(knex) {
    return knex('locations').del()
        .then(function () {
            return knex('locations').insert([
                {
                    id: 1,
                    name: 'aargau'
                },
                {
                    id: 2,
                    name: 'appenzellAusserrhoden'
                },
                {
                    id: 3,
                    name: 'appenzellInnerrhoden'
                },
                {
                    id: 4,
                    name: 'baselLandSchaft'
                },
                {
                    id: 5,
                    name: 'baselStadt'
                },
                {
                    id: 6,
                    name: 'bern'
                },
                {
                    id: 7,
                    name: 'fribourg'
                },
                {
                    id: 8,
                    name: 'geneva'
                },
                {
                    id: 9,
                    name: 'glarus'
                },
                {
                    id: 10,
                    name: 'grisons'
                },
                {
                    id: 11,
                    name: 'jura'
                },
                {
                    id: 12,
                    name: 'luzern'
                },
                {
                    id: 13,
                    name: 'neuchatel'
                },
                {
                    id: 14,
                    name: 'nidwalden'
                },
                {
                    id: 15,
                    name: 'obwalden'
                },
                {
                    id: 16,
                    name: 'schaffhausen'
                },
                {
                    id: 17,
                    name: 'schwyz'
                },
                {
                    id: 18,
                    name: 'solothurn'
                },
                {
                    id: 19,
                    name: 'stgallen'
                },
                {
                    id: 20,
                    name: 'ticino'
                },
                {
                    id: 21,
                    name: 'thurgau'
                },
                {
                    id: 22,
                    name: 'uri'
                },
                {
                    id: 23,
                    name: 'valais'
                },
                {
                    id: 24,
                    name: 'vaud'
                },
                {
                    id: 25,
                    name: 'zuerich'
                },
                {
                    id: 26,
                    name: 'zug'
                }
            ]);
        });
};
