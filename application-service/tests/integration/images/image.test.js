'use strict';

const request = require('supertest');

let server;
describe('/v1/items', () => {
    
    beforeEach(async () => {
        server = require('../../../app');
    });

    afterEach(() => {
        server.close();
    });

    describe('GET /:id', () => {
        it('should return image with given valid id', async () => {
            // Given
            const imageId = 'validImageId.png';

            // When
            const res = await request(server).get(`/v1/images/${imageId}`);

            // Then
            expect(res.status).toBe(302);
            expect(res.header['location']).toBe(process.env.IMAGES_BASE_URL + 'items/' + imageId);
        });

        it('should return error with a given invalid id', async () => {
            // Given
            const invalidImageId = 'invalid image id';

            // When
            const res = await request(server).get(`/v1/images/${invalidImageId}`);

            // Then
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(12);
        });
    });
});