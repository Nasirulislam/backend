'use strict';

const request = require('supertest');
const jwt = require('jsonwebtoken');

let server;
describe('/images/:identifier', () => {
    
    beforeEach(async () => {
        server = require('../../../app');
    });

    afterEach(() => {
        server.close();
    });
        
    it('should return error if user is not logged in', async () => {
        // When
        const res = await request(server)
            .post('/v1/images');

        // Then
        expect(res.status).toBe(401);
        expect(res.body.code).toBe(3);
    });

    it('should return the expected error then request misses image type', async () => {
        // Given
        let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);

        // When
        const res = await request(server)
            .post('/v1/images')
            .set('x-auth-token', token);

        // Then
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(20);
    });

    it('should return the expected error then request has a wrong image type', async () => {
        // Given
        let token = jwt.sign({ id: 2 }, process.env.JWT_SECRET);
        let imageType = 'Not valid image type';

        // When
        const res = await request(server)
            .post('/v1/images')
            .set('x-auth-token', token)
            .send({ type: imageType });

        // Then
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(20);
    });
});
