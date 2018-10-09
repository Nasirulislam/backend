const request = require('supertest');
const knex = require('../../../db/knex');
const jwt = require('jsonwebtoken');

let server;
describe('/api/accounts/password', () => {
    
    beforeEach(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
        server = require('../../../app.js');
    });

    afterEach(() => {
        server.close();
    });

    describe('POST /', () => {
        it('should return error when not logged in', async () => {
            // When
            const res = await request(server)
                .post('/api/accounts/password');

            // Then
            expect(res.status).toBe(401);
            expect(res.body.code).toBe(3);
        });

        it('should return error when using wrong token', async () => {
            // Given
            let token = 'wrong token';

            // When
            const res = await request(server)
                .post('/api/accounts/password')
                .set('x-auth-token', token);

            // Then
            expect(res.status).toBe(401);
            expect(res.body.code).toBe(4);
        });

        it('should return error when given token corresponds to a non existing account', async () => {
            // Given
            const nonExistingAccountId = 666;
            let token = jwt.sign({ id: nonExistingAccountId }, process.env.JWT_SECRET);
            let parameters = { 
                old: 'valid',
                new: 'valid' };

            // When
            const res = await request(server)
                .post('/api/accounts/password').send(parameters)
                .set('x-auth-token', token);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(4);
        });

        it('should return error when given old password is not valid', async () => {
            // Given
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);
            let parameters = { 
                old: 12345,
                new: 'valid' };

            // When
            const res = await request(server)
                .post('/api/accounts/password').send(parameters)
                .set('x-auth-token', token);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(11);
        });

        it('should return error when given new password is not valid', async () => {
            // Given
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);
            let parameters = { 
                old: 'valid',
                new: 12345 };

            // When
            const res = await request(server)
                .post('/api/accounts/password').send(parameters)
                .set('x-auth-token', token);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(13);
        });

        it('should return error when given old password is not correct', async () => {
            // Given
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);
            let parameters = {
                old: 'incorrectPassword',
                new: 'valid' };

            // When
            const res = await request(server)
                .post('/api/accounts/password').send(parameters)
                .set('x-auth-token', token);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(1);
        });

        it('should update the password when given parameters are correct', async () => {
            // Given
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);
            let parameters = {
                old: 'test',
                new: 'newPassword' };

            // When
            const res = await request(server)
                .post('/api/accounts/password').send(parameters)
                .set('x-auth-token', token);

            // Then
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                account: {
                    id: 2,
                    username: 'test2',
                    email: 'test2@mail.com'
                }
            });

            // Assert that login works with the new password
            let account = {
                username: 'test2',
                password: 'newPassword'
            };

            const loginRes = await request(server).post('/api/accounts/login').send(account);

            expect(loginRes.status).toBe(200);
            expect(loginRes.body).toHaveProperty('token');
        });
    });
});
