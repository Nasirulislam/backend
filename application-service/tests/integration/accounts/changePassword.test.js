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

        it('should return error when given old password is not valid', async () => {
            // Given
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);
            let parameters = { 
                old: 12345,
                password: 'valid' };

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
                password: 12345 };

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
                password: 'valid' };

            // When
            const res = await request(server)
                .post('/api/accounts/password').send(parameters)
                .set('x-auth-token', token);
            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(1);
        });
    });
});
