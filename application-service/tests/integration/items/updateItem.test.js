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

    describe('UPDATE /:id', () => {
        it('should update item with the given valid parameters', async () => {
            // Given
            const itemId = '1';
            const item = { title: 'Edited item' };

            // When
            const res = await request(server).put(`/api/items/${itemId}`).send(item);

            // Then
            expect(res.status).toBe(200);
            const resFetch = await request(server).get(`/api/items/${itemId}`);
            expect(resFetch.body.item.title).toEqual('Edited item');
        });

        it('should return error with a given invalid id', async () => {
            // Given
            const invalidItemId = 'Hi there I am not valid :(';
            const item = { title: 'Edited item' };

            // When
            const res = await request(server).put(`/api/items/${invalidItemId}`).send(item);

            // Then
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(2);
        });
    });
});
