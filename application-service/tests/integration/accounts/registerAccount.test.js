'use strict';

const request = require('supertest');
const knex = require('../../../db/knex');

let server;
describe('/api/accounts', () => {
    
    beforeEach(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
        server = require('../../../app.js');
    });

    afterEach(() => {
        server.close();
    });

    describe('POST /', () => {
        it('should create account with the given valid parameters', async () => {
            // Given
            let account = { 
                username: 'test', 
                email: 'dummy@test.com',
                password: '12345' };

            // When
            const res = await request(server).post('/api/accounts').send(account);

            // Then
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                account: {
                    id: 3,
                    username: 'test', 
                    email: 'dummy@test.com'
                }
            });
            const resFetch = await knex.from('accounts').select();
            expect(resFetch.length).toEqual(3);
        });

        it('should return error when given an existing email', async () => {
            // Given
            let account = { 
                username: 'test999', 
                email: 'test1@mail.com',
                password: '12345' };

            // When
            const res = await request(server).post('/api/accounts').send(account);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(7);
        });

        it('should return error when given an existing username', async () => {
            // Given
            let account = { 
                username: 'test1', 
                email: 'any@mail.com',
                password: '12345' };

            // When
            const res = await request(server).post('/api/accounts').send(account);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(8);
        });

        it('should return error when given username is too short', async () => {
            // Given
            let account = { 
                username: 'A', 
                email: 'any@mail.com',
                password: '12345' };

            // When
            const res = await request(server).post('/api/accounts').send(account);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(9);
        });

        it('should return error when given username is too long', async () => {
            // Given
            let account = { 
                username: Array(1002).join('A'),
                email: 'any@mail.com',
                password: '12345' };

            // When
            const res = await request(server).post('/api/accounts').send(account);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(9);
        });

        it('should return error when given email is not valid', async () => {
            // Given
            let account = { 
                username: 'username', 
                email: 'invalid mail',
                password: '12345' };

            // When
            const res = await request(server).post('/api/accounts').send(account);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(10);
        });

        it('should return error when given password is too short', async () => {
            // Given
            let account = { 
                username: 'username', 
                email: 'any@mail.com',
                password: '123' };

            // When
            const res = await request(server).post('/api/accounts').send(account);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(11);
        });

        it('should return error when missing an email parameter', async () => {
            // Given
            let account = { 
                username: 'test999', 
                password: '12345' };

            // When
            const res = await request(server).post('/api/accounts').send(account);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(10);
        });

        it('should return error when missing an username parameter', async () => {
            // Given
            let account = { 
                email: 'any@mail.com', 
                password: '12345' };

            // When
            const res = await request(server).post('/api/accounts').send(account);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(9);
        });

        it('should return error when missing a password parameter', async () => {
            // Given
            let account = { 
                username: 'username',
                email: 'any@mail.com' 
            };

            // When
            const res = await request(server).post('/api/accounts').send(account);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(11);
        });
    });
});
