const request = require('supertest');
const knex = require('../../../db/knex');

let server;
describe('/api/contact/item/:identifier', () => {
    
    beforeEach(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
        server = require('../../../app.js');
    });

    afterEach(() => {
        server.close();
    });

    it('should return error with a given invalid id', async () => {
        // Given
        const invalidItemId = 'Hi there I am not valid :(';

        // When
        const res = await request(server).post(`/api/contact/item/${invalidItemId}`);

        // Then
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(2);
    });

    it('should return error with a given invalid from', async () => {
        // Given
        const contactRequest = {
            from: 'Hi there I am an invalid email'
        };

        // When
        const res = await request(server)
            .post('/api/contact/item/1')
            .send(contactRequest);

        // Then
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(10);
    });

    it('should return error with a missing from', async () => {
        // Given
        const contactRequest = {
            message: 'Hello world'
        };

        // When
        const res = await request(server)
            .post('/api/contact/item/1')
            .send(contactRequest);

        // Then
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(10);
    });

    it('should return error with a given invalid message', async () => {
        // Given
        const contactRequest = {
            from: 'dummy@mail.com',
            message: 12345
        };

        // When
        const res = await request(server)
            .post('/api/contact/item/1')
            .send(contactRequest);

        // Then
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(15);
    });

    it('should return error with a missing message', async () => {
        // Given
        const contactRequest = {
            from: 'dummy@mail.com'
        };

        // When
        const res = await request(server)
            .post('/api/contact/item/1')
            .send(contactRequest);

        // Then
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(15);
    });


    it('should return item not found with a given non existing id', async () => {
        // Given
        const notExistingItemId = '99999';
        const contactRequest = {
            from: 'dummy@mail.com',
            message: 'Dummy message'
        };

        // When
        const res = await request(server)
            .post(`/api/contact/item/${notExistingItemId}`)
            .send(contactRequest);
        // Then
        expect(res.status).toBe(404);
        expect(res.body.code).toBe(2);
    });
});
