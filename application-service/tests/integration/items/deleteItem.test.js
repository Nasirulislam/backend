const request = require('supertest');
const knex = require('../../../db/knex');
const jwt = require('jsonwebtoken');

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
            const itemId = '1';
            let token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .delete(`/api/items/${itemId}`)
                .set('x-auth-token', token);

            // Then
            expect(res.status).toBe(200);
        });

        it('should return error if the item is not owned by the logged in user', async () => {
            // Given
            const itemId = '1';
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .delete(`/api/items/${itemId}`)
                .set('x-auth-token', token);

            // Then
            expect(res.status).toBe(401);
            expect(res.body.code).toBe(4);
        });

        it('should return item not found with a given non existing id', async () => {
            // Given
            const notExistingItemId = '99999';
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .delete(`/api/items/${notExistingItemId}`)
                .set('x-auth-token', token);

            // Then
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(2);
        });

        it('should return error with a given invalid id', async () => {
            // Given
            const invalidItemId = 'Hi there I am not valid :(';
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .delete(`/api/items/${invalidItemId}`)
                .set('x-auth-token', token);

            // Then
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(2);
        });

        it('should return error if user is not logged in', async () => {
            // Given
            const itemId = '1';

            // When
            const res = await request(server)
                .delete(`/api/items/${itemId}`);

            // Then
            expect(res.status).toBe(401);
            expect(res.body.code).toBe(3);
        });

        it('should return error if token is not valid', async () => {
            const itemId = '1';
            const invalidToken = 'Hi there I am an invalid token';

            // When
            const res = await request(server)
                .delete(`/api/items/${itemId}`)
                .set('x-auth-token', invalidToken);

            // Then
            expect(res.status).toBe(401);
            expect(res.body.code).toBe(4);
        });
    });
});
