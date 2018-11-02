'use strict';

const request = require('supertest');
const knex = require('../../../db/knex');

let server;
describe('/v1/items', () => {
    
    beforeEach(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
        server = require('../../../app');
    });

    afterEach(() => {
        server.close();
    });

    describe('GET /:id', () => {
        it('should return item with given valid id', async () => {
            // Given
            const itemId = '1';

            // When
            const res = await request(server).get(`/v1/items/${itemId}`);

            // Then
            expect(res.status).toBe(200);
            expect(res.body.item.title).toEqual('Dummy Ad #1');
        });

        it('should return item not found with a given non existing id', async () => {
            // Given
            const notExistingItemId = '99999';

            // When
            const res = await request(server).get(`/v1/items/${notExistingItemId}`);

            // Then
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(2);
        });

        it('should return error with a given invalid id', async () => {
            // Given
            const invalidItemId = 'Hi there I am not valid :(';

            // When
            const res = await request(server).get(`/v1/items/${invalidItemId}`);

            // Then
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(2);
        });
    });
});