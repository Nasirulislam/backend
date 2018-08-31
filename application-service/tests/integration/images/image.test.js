const request = require('supertest');

let server;
describe('/api/items', () => {
    
    beforeEach(async () => {
        server = require('../../../app');
    });

    afterEach(() => {
        server.close();
    });

    describe('GET /:id', () => {
        it('should return image with given valid id', async () => {
            // Given
            const invalidImageId = '1';

            // When
            const res = await request(server).get(`/api/images/${invalidImageId}`);

            // Then
            expect(res.status).toBe(302);
            expect(res.header['location']).toBe(process.env.IMAGES_BASE_URL + '1');
        });

        it('should return error with a given invalid id', async () => {
            // Given
            const invalidImageId = 'Hi there I am not valid :(';

            // When
            const res = await request(server).get(`/api/images/${invalidImageId}`);

            // Then
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(12);
        });
    });
});