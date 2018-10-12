const request = require('supertest');
const knex = require('../../../db/knex');

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

    it('should return error with a given invalid username', async () => {
        // Given
        let forgotPasswordRequest = { 
            username: 12345
        };

        // When
        const res = await request(server).post('/api/accounts/forgotpassword').send(forgotPasswordRequest);

        // Then
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(9);
    });
});