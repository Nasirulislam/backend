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

        it('should return first page, when not receiving a page parameter', async () => {
            // When
            const res = await request(server).get('/api/items');

            // Then
            expect(res.status).toBe(200);
            expect(res.body.items.length).toEqual(10);
            for (let i=0; i<10; i++) {
                expect(res.body.items[i].title).toEqual(`Dummy Ad #${i}`);
            }
        });

        it('should return appropiate page, when a page parameter is given', async () => {
            // Given
            const page = 3;

            // When
            const res = await request(server).get(`/api/items?page=${page}`);

            // Then
            expect(res.status).toBe(200);
            expect(res.body.items.length).toEqual(10);
            for (let i=0; i<10; i++) {
                expect(res.body.items[i].title).toEqual(`Dummy Ad #${i+20}`);
            }
        });

        it('should return the expected error, when the given page parameter is invalid', async () => {
            // When
            const page = 'invalid page parameter';
            const res = await request(server).get(`/api/items?page=${page}`);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(16);
        });

        it('should not return items when searching by term without coincidences', async () => {
            // Given
            const termWithoutResults = 'Hi there, there are no ads with this text :(';

            // When
            const res = await request(server).get(`/api/items?term=${termWithoutResults}`);

            // Then
            expect(res.status).toBe(200);
            expect(res.body.items.length).toEqual(0);
        });

        it('should not return items when searching by a term with coincidences', async () => {
            // Given
            const termWithResults = 'Description of the dummy ad';

            // When
            const res = await request(server).get(`/api/items?term=${termWithResults}`);

            // Then
            expect(res.status).toBe(200);
            expect(res.body.items.length).toEqual(10);
        });

        it('should return the expected error, when the given term parameter is invalid', async () => {
            // When
            let invalidTerm = Array(1002).join('A');
            const res = await request(server).get(`/api/items?term=${invalidTerm}`);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(18);
        });
    });
});