const nodemailerMock = require('nodemailer-mock');
const request = require('supertest');
const knex = require('../../../db/knex');

let server;
describe('/v1/contact/item/:identifier', () => {
    
    beforeAll(() => {
        jest.doMock('nodemailer', () => {
            return nodemailerMock;
        });
    });

    beforeEach(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
        server = require('../../../app.js');
    });

    afterEach(() => {
        nodemailerMock.mock.reset();
        server.close();
    });

    afterAll(() => {
        jest.dontMock('nodemailer');
    });

    it('should return error with a given invalid id', async () => {
        // Given
        const invalidItemId = 'Hi there I am not valid :(';

        // When
        const res = await request(server).post(`/v1/contact/item/${invalidItemId}`);

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
            .post('/v1/contact/item/1')
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
            .post('/v1/contact/item/1')
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
            .post('/v1/contact/item/1')
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
            .post('/v1/contact/item/1')
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
            .post(`/v1/contact/item/${notExistingItemId}`)
            .send(contactRequest);
        // Then
        expect(res.status).toBe(404);
        expect(res.body.code).toBe(2);
    });

    it('Should sent the mail when called with valid parameters', async () => {
        // Given
        const itemId = '2';
        let contactRequest = { 
            from: 'test2@mail.com',
            message: 'Dummy message'
        };

        // When
        const res = await request(server).post(`/v1/contact/item/${itemId}`).send(contactRequest);

        // Then
        expect(res.status).toBe(200);

        const sentMail = nodemailerMock.mock.sentMail();
        expect(sentMail.length).toBe(1);
        expect(sentMail[0].from).toBe(process.env.MAIL_FROM);
        expect(sentMail[0].to).toBe('test1@mail.com');
        expect(sentMail[0].replyTo).toBe('test2@mail.com');
        expect(sentMail[0].subject).toBe('A person might be interested in your item: Dummy Ad #2');
    });

    it('Should return the expected error when sending the mail fails', async () => {
        // Given
        nodemailerMock.mock.shouldFailOnce();
        const itemId = '1';
        let contactRequest = { 
            from: 'test2@mail.com',
            message: 'Dummy message'
        };

        // When
        const res = await request(server).post(`/v1/contact/item/${itemId}`).send(contactRequest);

        // Then
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(14);
    });
});
