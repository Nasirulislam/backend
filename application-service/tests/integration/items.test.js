const request = require('supertest');
const knex = require('../../db/knex');

let server;
describe('/api/items', () => {
    
    beforeEach(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
        server = require('../../app.js');
    });

    afterEach(() => {
        server.close();
    });

    describe('GET /', () => {
        it('should return all items', async () => {
            // When
            const res = await request(server).get('/api/items');

            // Then
            expect(res.status).toBe(200);
            expect(res.body.items.length).toEqual(2);
            expect(res.body.items[0].title).toEqual('Dummy Ad #1');
            expect(res.body.items[1].title).toEqual('Dummy Ad #2');
        });
    });

    describe('GET /:id', () => {
        it('should return item with given valid id', async () => {
            // Given
            const itemId = '1';

            // When
            const res = await request(server).get(`/api/items/${itemId}`);

            // Then
            expect(res.status).toBe(200);
            expect(res.body.item.title).toEqual('Dummy Ad #1');
        });

        it('should return item not found with a given non existing id', async () => {
            // Given
            const notExistingItemId = '99999';

            // When
            const res = await request(server).get(`/api/items/${notExistingItemId}`);

            // Then
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(2);
        });

        it('should return error with a given invalid id', async () => {
            // Given
            const invalidItemId = 'Hi there I am not valid :(';

            // When
            const res = await request(server).get(`/api/items/${invalidItemId}`);

            // Then
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(2);
        });
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

    describe('POST /', () => {
        it('should insert item with the given valid parameters', async () => {
            // Given
            let item = { title: 'Hello', description: 'This is a dummy text' };

            // When
            const res = await request(server).post('/api/items').send(item);

            // Then
            expect(res.status).toBe(200);
            const resFetch = await request(server).get('/api/items');
            expect(resFetch.body.items.length).toEqual(3);
        });

        it('should return error when request misses title', async () => {
            // Given
            let item = { description: 'This is a dummy text' };

            // When
            const res = await request(server).post('/api/items').send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(5);
        });

        it('should return error when request misses description', async () => {
            // Given
            let item = { title: 'Hello' };

            // When
            const res = await request(server).post('/api/items').send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(6);
        });

        it('should return error when given title is too short', async () => {
            // Given
            let item = { title: 'A', description: 'This is a dummy text' };

            // When
            const res = await request(server).post('/api/items').send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(5);
        });

        it('should return error when given title is too long', async () => {
            // Given
            let title = Array(1002).join('A');
            let item = { title, description: 'This is a dummy text' };

            // When
            const res = await request(server).post('/api/items').send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(5);
        });

        it('should return error when given description is too short', async () => {
            // Given
            let item = { title: 'Hello', description: 'A' };

            // When
            const res = await request(server).post('/api/items').send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(6);
        });

        it('should return error when given description is too long', async () => {
            // Given
            let description = Array(1002).join('A');
            let item = { title: 'Hello', description };

            // When
            const res = await request(server).post('/api/items').send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(6);
        });
    });

    describe('UPDATE /', () => {
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