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

    describe('POST /', () => {
        it('should insert item with the given valid parameters', async () => {
            // Given
            let item = { 
                title: 'Hello', 
                description: 'This is a dummy text', 
                images: ['2.1234.png', '2.4321.png'] };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .post('/api/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(200);
            expect(res.body.item.id).toEqual(3);
            expect(res.body.item.author.id).toEqual(2);
            expect(res.body.item.title).toEqual('Hello');
            expect(res.body.item.description).toEqual('This is a dummy text');
            expect(res.body.item.images).toEqual([{ image: '2.1234.png'}, { image: '2.4321.png'}]);

            const resFetch = await request(server).get('/api/items');
            expect(resFetch.body.items.length).toEqual(3);
        });

        it('should insert item with the given valid parameters and no images', async () => {
            // Given
            let item = { 
                title: 'Hello', 
                description: 'This is a dummy text'
            };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .post('/api/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(200);
            expect(res.body.item.id).toEqual(4);
            expect(res.body.item.author.id).toEqual(2);
            expect(res.body.item.title).toEqual('Hello');
            expect(res.body.item.description).toEqual('This is a dummy text');
            expect(res.body.item.images).toEqual([]);

            const resFetch = await request(server).get('/api/items');
            expect(resFetch.body.items.length).toEqual(3);
        });

        it('should return error when invalid image identifiers are given', async () => {
            // Given
            let item = { 
                title: 'Hello', 
                description: 'This is a dummy text', 
                images: ['invalidImageId_0', 'invalidImageId_1'] };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .post('/api/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(12);
        });
    
        it('should return error if user is not logged in', async () => {
            // Given
            let item = { title: 'Hello', description: 'This is a dummy text' };

            // When
            const res = await request(server).post('/api/items').send(item);

            // Then
            expect(res.status).toBe(401);
            expect(res.body.code).toBe(3);
        });

        it('should return error if token is not valid', async () => {
            // Given
            let item = { title: 'Hello', description: 'This is a dummy text' };
            const invalidToken = 'Hi there I am an invalid token';

            // When
            const res = await request(server)
                .post('/api/items')
                .set('x-auth-token', invalidToken)
                .send(item);

            // Then
            expect(res.status).toBe(401);
            expect(res.body.code).toBe(4);
        });

        it('should return error when request misses title', async () => {
            // Given
            let item = { description: 'This is a dummy text' };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .post('/api/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(5);
        });

        it('should return error when request misses description', async () => {
            // Given
            let item = { title: 'Hello' };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .post('/api/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(6);
        });

        it('should return error when given title is too short', async () => {
            // Given
            let item = { title: 'A', description: 'This is a dummy text' };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .post('/api/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(5);
        });

        it('should return error when given title is too long', async () => {
            // Given
            let title = Array(1002).join('A');
            let item = { title, description: 'This is a dummy text' };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .post('/api/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(5);
        });

        it('should return error when given description is too short', async () => {
            // Given
            let item = { title: 'Hello', description: 'A' };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .post('/api/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(6);
        });

        it('should return error when given description is too long', async () => {
            // Given
            let description = Array(1002).join('A');
            let item = { title: 'Hello', description };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .post('/api/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(6);
        });
    });
});
