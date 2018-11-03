'use strict';

const request = require('supertest');
const knex = require('../../../db/knex');
const jwt = require('jsonwebtoken');

let server;
describe('/v1/items', () => {
    
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
                location_id: 4, 
                images: ['2.1234.png', '2.4321.png'] };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .post('/v1/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(200);
            expect(res.body.item.id).toEqual(100);
            expect(res.body.item.author.id).toEqual(2);
            expect(res.body.item.location_id).toEqual(4),
            expect(res.body.item.title).toEqual('Hello');
            expect(res.body.item.description).toEqual('This is a dummy text');
            expect(res.body.item.images).toEqual([
                { image: '2.1234.png', path: process.env.IMAGES_BASE_URL + 'items' }, 
                { image: '2.4321.png', path: process.env.IMAGES_BASE_URL + 'items' }]);

            const resFetch = await request(server).get('/v1/items');
            expect(resFetch.body.total).toEqual(101);
        });

        it('should insert item with the given valid parameters and no images', async () => {
            // Given
            let item = { 
                title: 'Hello',
                location_id: 6,
                description: 'This is a dummy text'
            };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .post('/v1/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(200);
            expect(res.body.item.id).toEqual(101);
            expect(res.body.item.author.id).toEqual(2);
            expect(res.body.item.location_id).toEqual(6),
            expect(res.body.item.title).toEqual('Hello');
            expect(res.body.item.description).toEqual('This is a dummy text');
            expect(res.body.item.images).toEqual([]);

            const resFetch = await request(server).get('/v1/items');
            expect(resFetch.body.total).toEqual(101);
        });

        it('should return error when invalid image identifiers are given', async () => {
            // Given
            let item = { 
                title: 'Hello', 
                description: 'This is a dummy text',
                location_id: 4,
                images: ['invalidImageId_0', 'invalidImageId_1'] };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .post('/v1/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(12);
        });

        it('should return error when invalid location_id identifiers are given', async () => {
            // Given
            let item = { 
                title: 'Hello', 
                description: 'This is a dummy text',
                location_id: 'invalid location identifier' };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .post('/v1/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(19);
        });


        it('should return error when request misses location_id', async () => {
            // Given
            let item = { 
                title: 'Hello', 
                description: 'This is a dummy text' };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .post('/v1/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(19);
        });
    
        it('should return error if user is not logged in', async () => {
            // Given
            let item = { title: 'Hello', description: 'This is a dummy text' };

            // When
            const res = await request(server).post('/v1/items').send(item);

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
                .post('/v1/items')
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
                .post('/v1/items')
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
                .post('/v1/items')
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
                .post('/v1/items')
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
                .post('/v1/items')
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
                .post('/v1/items')
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
                .post('/v1/items')
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(6);
        });
    });
});
