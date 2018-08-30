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

    describe('UPDATE /:id', () => {
        it('should update item with the given valid parameters', async () => {
            // Given
            const itemId = '1';
            const item = { title: 'Edited item' };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .put(`/api/items/${itemId}`)
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(200);
            const resFetch = await request(server).get(`/api/items/${itemId}`);
            expect(resFetch.body.item.title).toEqual('Edited item');
        });

        it('should return error with a given invalid id', async () => {
            // Given
            const invalidItemId = 'Hi there I am not valid :(';
            const item = { title: 'Edited item' };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .put(`/api/items/${invalidItemId}`)
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(2);
        });

        it('should return error if user is not logged in', async () => {
            // Given
            const itemId = '1';
            const item = { title: 'Edited item' };

            // When
            const res = await request(server)
                .put(`/api/items/${itemId}`)
                .send(item);

            // Then
            expect(res.status).toBe(401);
            expect(res.body.code).toBe(12);
        });

        it('should return error if token is not valid', async () => {
            // Given
            const itemId = '1';
            const item = { title: 'Edited item' };
            const invalidToken = 'Hi there I am an invalid token';

            // When
            const res = await request(server)
                .put(`/api/items/${itemId}`)
                .set('x-auth-token', invalidToken)
                .send(item);

            // Then
            expect(res.status).toBe(401);
            expect(res.body.code).toBe(13);
        });
    });
});
