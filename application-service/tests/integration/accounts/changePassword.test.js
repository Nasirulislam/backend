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
    });
});
