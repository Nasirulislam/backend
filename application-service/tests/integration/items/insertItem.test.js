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

    describe('POST /', () => {
        it('should insert item with the given valid parameters', async () => {
            // Given
            let item = { title: 'Hello', description: 'This is a dummy text' };

            // When
            const res = await request(server).post('/api/items').send(item);

            // Then
            expect(res.status).toBe(200);
            expect(res.body).toEqual({ 
                id: 3,
                author_id: 2,
                title: 'Hello', 
                description: 'This is a dummy text'
            });
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
});
