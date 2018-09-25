const request = require('supertest');
const knex = require('../../../db/knex');
const jwt = require('jsonwebtoken');

let server;
describe('/api/accounts/me', () => {
    
    beforeEach(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
        server = require('../../../app.js');
    });

    afterEach(() => {
        server.close();
    });

    describe('GET /', () => {
        it('should return the account info when logged in', async () => {
            // Given
            let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

            // When
            const res = await request(server)
                .get('/api/accounts/me')
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
        });

        it('should return error when not logged in', async () => {
            // Given

            // When
            const res = await request(server)
                .get('/api/accounts/me');

            // Then
            expect(res.status).toBe(401);
            expect(res.body.code).toBe(3);
        });

        it('should return error if token is not valid', async () => {
            // Given
            const invalidToken = 'Hi there I am an invalid token';

            // When
            const res = await request(server)
                .get('/api/accounts/me')
                .set('x-auth-token', invalidToken);

            // Then
            expect(res.status).toBe(401);
            expect(res.body.code).toBe(4);
        });
    });
});