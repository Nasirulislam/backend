'use strict';

const request = require('supertest');
const knex = require('../../db/knex');

let server;
describe('General routes', () => {
    
    beforeEach(async () => {
        await knex.migrate.latest(),
        server = require('../../app');
    });

    afterEach(() => {
        server.close();
    });

    it('should return 404', async function() {
        // Given
        const notFoundEndpoint = '/not/existing/endpoint';

        // When
        const res = await request(server).get(notFoundEndpoint);

        // Then
        expect(res.status).toBe(404);
    });
});