'use strict';

exports.seed = function(knex) {
    return knex('accounts').del()
        .then(function () {
            return knex('accounts').insert([
                {
                    id: 1,
                    is_verified: true,
                    username: 'test1',
                    email: 'test1@mail.com',
                    password: '$2a$10$YFpNKhg0g8syWUACIdHVVODxLocyvh9OXQAmnD/zgr.CljxEEf.hy',
                    salt: '$2a$10$YFpNKhg0g8syWUACIdHVVO'
                },
                {
                    id: 2,
                    is_verified: true,
                    username: 'test2',
                    email: 'test2@mail.com',
                    password: '$2a$10$YFpNKhg0g8syWUACIdHVVODxLocyvh9OXQAmnD/zgr.CljxEEf.hy',
                    salt: '$2a$10$YFpNKhg0g8syWUACIdHVVO'
                },
            ]);
        });
};
