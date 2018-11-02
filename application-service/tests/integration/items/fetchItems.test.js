'use strict';

const request = require('supertest');
const knex = require('../../../db/knex');

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

    describe('GET /', () => {

        it('should return first page, when not receiving a page parameter', async () => {
            // When
            const res = await request(server).get('/v1/items');

            // Then
            expect(res.status).toBe(200);
            expect(res.body.items.length).toEqual(50);
            for (let i=0; i<50; i++) {
                expect(res.body.items[i].title).toEqual(`Dummy Ad #${i}`);
            }
        });

        it('should return appropiate page, when a page parameter is given', async () => {
            // Given
            const page = 2;

            // When
            const res = await request(server).get(`/v1/items?page=${page}`);

            // Then
            expect(res.status).toBe(200);
            expect(res.body.items.length).toEqual(50);
            for (let i=0; i<50; i++) {
                expect(res.body.items[i].title).toEqual(`Dummy Ad #${i+50}`);
            }
        });

        it('should return the expected error, when the given page parameter is invalid', async () => {
            // When
            const page = 'invalid page parameter';
            const res = await request(server).get(`/v1/items?page=${page}`);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(16);
        });

        it('should not return items when searching by term without coincidences', async () => {
            // Given
            const termWithoutResults = 'Hi there, there are no ads with this text :(';

            // When
            const res = await request(server).get(`/v1/items?term=${termWithoutResults}`);

            // Then
            expect(res.status).toBe(200);
            expect(res.body.items.length).toEqual(0);
        });

        it('should not return items when searching by a term with coincidences', async () => {
            // Given
            const termWithResults = 'Description of the dummy ad';

            // When
            const res = await request(server).get(`/v1/items?term=${termWithResults}`);

            // Then
            expect(res.status).toBe(200);
            expect(res.body.items.length).toEqual(50);
        });

        it('should return the expected error, when the given term parameter is invalid', async () => {
            // Given
            let invalidTerm = Array(1002).join('A');

            // When
            const res = await request(server).get(`/v1/items?term=${invalidTerm}`);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(18);
        });
    });
});