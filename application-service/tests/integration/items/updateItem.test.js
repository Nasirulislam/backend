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

    describe('UPDATE /:id', () => {
        it('should update item with the given valid parameters', async () => {
            // Given
            const itemId = '1';
            const item = {
                title: 'Edited item',
                description: 'Edited description',
                location_id: 26
            };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .put(`/v1/items/${itemId}`)
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(200);
            const resFetch = await request(server).get(`/v1/items/${itemId}`);
            expect(resFetch.body.item.title).toEqual('Edited item');
            expect(resFetch.body.item.description).toEqual('Edited description');
            expect(resFetch.body.item.location_id).toEqual(26);
        });

        it('should return error if the given new title is too short', async () => {
            // Given
            const itemId = '1';
            const item = { title: 'A' };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .put(`/v1/items/${itemId}`)
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(5);
        });

        it('should return error if the given new title is too long', async () => {
            // Given
            let title = Array(102).join('A');
            const itemId = '1';
            const item = { title };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .put(`/v1/items/${itemId}`)
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(5);
        });

        it('should return error if the given new description is too short', async () => {
            // Given
            const itemId = '1';
            const item = { description: 'A' };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .put(`/v1/items/${itemId}`)
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(6);
        });

        it('should return error if the given new description is too long', async () => {
            // Given
            let description = Array(1002).join('A');
            const itemId = '1';
            const item = { description };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .put(`/v1/items/${itemId}`)
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(6);
        });

        it('should return error if the given new location_id is too low', async () => {
            // Given
            const itemId = '1';
            const item = { location_id: 0 };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .put(`/v1/items/${itemId}`)
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(19);
        });

        it('should return error if the given new location_id is too high', async () => {
            // Given
            const itemId = '1';
            const item = { location_id: 27 };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .put(`/v1/items/${itemId}`)
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(19);
        });

        it('should return error if the item is not owned by the logged in user', async () => {
            // Given
            const itemId = '1';
            const item = { title: 'Edited item' };
            let token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .put(`/v1/items/${itemId}`)
                .set('x-auth-token', token)
                .send(item);

            // Then
            expect(res.status).toBe(401);
            expect(res.body.code).toBe(4);
        });

        it('should return error with a given invalid id', async () => {
            // Given
            const invalidItemId = 'Hi there I am not valid :(';
            const item = { title: 'Edited item' };
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .put(`/v1/items/${invalidItemId}`)
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
                .put(`/v1/items/${itemId}`)
                .send(item);

            // Then
            expect(res.status).toBe(401);
            expect(res.body.code).toBe(3);
        });

        it('should return error if token is not valid', async () => {
            // Given
            const itemId = '1';
            const item = { title: 'Edited item' };
            const invalidToken = 'Hi there I am an invalid token';

            // When
            const res = await request(server)
                .put(`/v1/items/${itemId}`)
                .set('x-auth-token', invalidToken)
                .send(item);

            // Then
            expect(res.status).toBe(401);
            expect(res.body.code).toBe(4);
        });
    });
});
