'use strict';

const request = require('supertest');
const knex = require('../../../db/knex');

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

    describe('GET /', () => {
        it('should return all items', async () => {
            // When
            const res = await request(server).get('/api/items');

            // Then
            expect(res.status).toBe(200);
            expect(res.body.items.length).toEqual(10);
            expect(res.body.items[0].title).toEqual('Dummy Ad #0');
            expect(res.body.items[1].title).toEqual('Dummy Ad #1');
        });
    });
});