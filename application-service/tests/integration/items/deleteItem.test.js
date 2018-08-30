const request = require('supertest');
const knex = require('../../../db/knex');

let server;
describe('/api/items', () => {
    
    beforeEach(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
        server = require('../../../app.js');
    });

    afterEach(() => {
        server.close();
    });

    describe('DELETE /:id', () => {
        it('should delete item with a given valid id', async () => {
            // Given
            const notExistingItemId = '1';

            // When
            const res = await request(server).delete(`/api/items/${notExistingItemId}`);

            // Then
            expect(res.status).toBe(200);
        });

        it('should return item not found with a given non existing id', async () => {
            // Given
            const notExistingItemId = '99999';

            // When
            const res = await request(server).delete(`/api/items/${notExistingItemId}`);

            // Then
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(2);
        });

        it('should return error with a given invalid id', async () => {
            // Given
            const invalidItemId = 'Hi there I am not valid :(';

            // When
            const res = await request(server).delete(`/api/items/${invalidItemId}`);

            // Then
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(2);
        });
    });
});
